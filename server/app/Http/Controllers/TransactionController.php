<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\PaymentMethod;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\ShippingVariant;
use App\Models\StatusMaster;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use App\Models\TransactionTimeline;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function AddTransaction(Request $request)
    {
        $cart = Cart::where('user_id', $request->user_id)->first();
        $cart_item = CartItem::where('cart_id', $cart->id)->first();
        $product = Product::where('id', $cart_item->product_id)->first();
        $product_variant = ProductVariant::where('id', $cart_item->product_variant_id)->first();
        $shipping_variant = ShippingVariant::where('id', $request->shipping_variant_id)->first();
        $payment_method = PaymentMethod::where('id', $request->payment_method_id)->first();

        $total_price = $product->price + $shipping_variant->price + $payment_method->admin_fee - $request->discount_price;

        DB::beginTransaction();
        try {
            $transaction = Transaction::create([
                'user_id' => $request->user_id,
                'status_master_id' => 1,
                'status_name' => StatusMaster::where('id', 1)->first()->value('name'),
                'total_price' => $total_price,
            ]);
            $transaction_detail = TransactionDetail::create([
                'transaction_id' => $transaction->id,
                'transaction_date' => now(),
                'shipping_id' => $request->shipping_id,
                'shipping_name' => $shipping_variant->name,
                'payment_method_id' => $request->payment_method_id,
                'payment_method_name' => $payment_method->name,
                'product_price' => $product->price,
                'product_id' => $product->id,
                'product_name' => $product->name,
                'product_variant_id' => $product_variant->id,
                'product_variant_name' => $product_variant->name,
                'shipping_price' => $shipping_variant->price,
                'admin_fee' => $payment_method->admin_fee,
                'discount_price' => $request->discount_price,
                'total_price' => $total_price,
                'is_discount' => $request->is_discount,
                'shipping_address' => $request->shipping_address
            ]);
            TransactionTimeline::create([
                'transaction_id' => $transaction->id,
                'event_date' => now(),
                'message' => 'Transaction made. Awaiting Payment.'
            ]);
            $cart->total_price = 0;
            $cart->save();
            CartItem::where('cart_id', $cart->id)->delete();

            DB::commit();

            return response()->json([
                'status' => 'Success',
                'data' => [
                    'id' => $transaction->id,
                    'user_id' => $transaction->user_id,
                    'status' => StatusMaster::where('id', $transaction->status_master_id)->first()->value('name'),
                    'transaction_detail' => $transaction_detail,
                    'items' => $product,
                    'product_price' => $product->price,
                    'shipping_price' => $shipping_variant->price,
                    'admin_fee' => $payment_method->admin_fee,
                    'discount_price' => $request->discount_price,
                    'total_price' => $transaction->total_price,
                    'created_at' => $transaction->created_at->toDateTimeString(),
                    'updated_at' => $transaction->updated_at
                ]
            ]);
        } catch (Exception $e) {
            DB::rollback();
        }
    }

    public function GetAllTransaction()
    {
        $transactions = Transaction::all();

        $customResponse = [
            'status' => 'Success',
            'message' => 'All Transaction Retrieved',
            'data' => $transactions->map(function ($transaction) {
                $transaction_detail = TransactionDetail::where('transaction_id', $transaction->id)->first();
                return [
                    'id' => $transaction->id,
                    'user_id' => $transaction->user_id,
                    'status' => StatusMaster::where('id', $transaction->status_master_id)->get()->value('name'),
                    'total_price' => $transaction->total_price,
                    'transaction_detail' => $transaction_detail,
                    'product' => Product::where('id', $transaction_detail->product_id)->first()
                ];
            }),
        ];

        return response()->json($customResponse, 200);
    }

    public function GetTransactionDetail(Request $request)
    {
        $id = $request->query('id');
        $transaction = Transaction::where('id', $id)->first();
        $user = User::where('id', $transaction->user_id)->first();
        $transaction_detail = TransactionDetail::where('transaction_id', $transaction->id)->first();

        $customResponse = [
            'status' => 'Success',
            'data' => [
                'id' => $id,
                'user' => $user,
                'transaction' => $transaction,
                'transaction_detail' => $transaction_detail
            ]
        ];

        return response()->json($customResponse, 200);
    }

    public function GetTransactionByUserId(Request $request)
    {
        $user_id = $request->query('user_id');
        $transactions = Transaction::where('user_id', '==', $user_id)->get();
        if (!$transactions) {
            return response()->json(['message' => 'Transactions Not Found'], 404);
        }

        $customResponse = [
            'status' => 'Success',
            'message' => 'Transactions Found',
            'data' => $transactions->map(function ($transaction) {
                return [
                    'id' => $transaction->id,
                    'user_id' => $transaction->user_id,
                    'transaction_date' => $transaction->transaction_date,
                    'status' => $transaction->status,
                    'total_amount' => $transaction->total_amount,
                    'shipping_address' => $transaction->shipping_address,
                    'created_at' => $transaction->created_at,
                    'updated_at' => $transaction->updated_at
                ];
            }),
        ];
        return response()->json($customResponse, 200);
    }

    public function SetTransactionStatus(Request $request)
    {
        $id = $request->input('id');
        $status_master_id = $request->input('status_master_id');
        $transaction = Transaction::find($id);
        $status = StatusMaster::where('id', $status_master_id)->first();

        $transaction->status_master_id = $status_master_id;
        $transaction->status_name = $status->name;
        $transaction->save();

        if ($status_master_id == 1) {
            TransactionTimeline::create([
                'transaction_id' => $transaction->id,
                'event_date' => now(),
                'message' => 'Transaction made. Awaiting Payment.'
            ]);
        } else if ($status_master_id == 2) {
            TransactionTimeline::create([
                'transaction_id' => $transaction->id,
                'event_date' => now(),
                'message' => 'Waiting seller confirmation.'
            ]);
        } else if ($status_master_id == 3) {
            TransactionTimeline::create([
                'transaction_id' => $transaction->id,
                'event_date' => now(),
                'message' => 'Order confirmed.'
            ]);
        } else if ($status_master_id == 4) {
            TransactionTimeline::create([
                'transaction_id' => $transaction->id,
                'event_date' => now(),
                'message' => 'Seller processing the order.'
            ]);
        } else if ($status_master_id == 5) {
            TransactionTimeline::create([
                'transaction_id' => $transaction->id,
                'event_date' => now(),
                'message' => 'Requesting shipping.'
            ]);
        } else if ($status_master_id == 6) {
            TransactionTimeline::create([
                'transaction_id' => $transaction->id,
                'event_date' => now(),
                'message' => 'Package ready for pick up.'
            ]);
        } else if ($status_master_id == 7) {
            TransactionTimeline::create([
                'transaction_id' => $transaction->id,
                'event_date' => now(),
                'message' => 'Package shipped to Central Distribution.'
            ]);
        } else if ($status_master_id == 8) {
            TransactionTimeline::create([
                'transaction_id' => $transaction->id,
                'event_date' => now(),
                'message' => 'Package out for delivery.'
            ]);
        } else if ($status_master_id == 9) {
            TransactionTimeline::create([
                'transaction_id' => $transaction->id,
                'event_date' => now(),
                'message' => 'Package delivered.'
            ]);
        } else if ($status_master_id == 10) {
            TransactionTimeline::create([
                'transaction_id' => $transaction->id,
                'event_date' => now(),
                'message' => 'Delivery failed.'
            ]);
        } else if ($status_master_id == 11) {
            TransactionTimeline::create([
                'transaction_id' => $transaction->id,
                'event_date' => now(),
                'message' => 'Order completed.'
            ]);
        } else if ($status_master_id == 12) {
            TransactionTimeline::create([
                'transaction_id' => $transaction->id,
                'event_date' => now(),
                'message' => 'Package returned.'
            ]);
        } else if ($status_master_id == 13) {
            TransactionTimeline::create([
                'transaction_id' => $transaction->id,
                'event_date' => now(),
                'message' => 'Order cancelled.'
            ]);
        }

        $customResponse = [
            'status' => 'Success',
        ];
        return response()->json($customResponse, 200);
    }

    public function GetAllTransactionTimeline(Request $request)
    {
        $id = $request->query('id');
        $data = TransactionTimeline::where('transaction_id', $id)->get();

        $customResponse = [
            'status' => 'Success',
            'data' => $data
        ];
        return response()->json($customResponse, 200);
    }
}
