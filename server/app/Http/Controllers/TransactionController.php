<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\PaymentMethod;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Shipping;
use App\Models\ShippingVariant;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use App\Models\TransactionItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function AddTransaction(Request $request)
    {

        $cart = Cart::where('user_id', $request->user_id)->first();

        $total_product_price = $cart->total_price;

        $shipping = Shipping::where('id', $request->shipping_id)->first();
        $shipping_variant = ShippingVariant::where('id', $request->shipping_variant_id)->first();
        $shipping_price = $shipping->price + $shipping_variant->price;

        $payment_method = PaymentMethod::where('id', $request->payment_method_id)->first();

        $total_price = $total_product_price + $shipping_price + $payment_method->admin_fee - $request->discount_price;

        $transaction = Transaction::create([
            'user_id' => $request->user_id,
            'status' => "confirmation",
            'total_price' => $total_price,
        ]);

        $transaction_detail = TransactionDetail::create([
            'transaction_id' => $transaction->id,
            'transaction_date' => now(),
            'shipping_id' => $request->shipping_id,
            'shipping_name' => $shipping_variant->name,
            'payment_method_id' => $request->payment_method_id,
            'payment_method_name' => $payment_method->name,
            'total_product_price' => $total_product_price,
            'base_shipping_price' => $shipping->price,
            'additional_shipping_price' => $shipping_variant->price,
            'admin_fee' => $payment_method->admin_fee,
            'discount_price' => $request->discount_price,
            'total_price' => $total_price,
            'is_discount' => $request->is_discount,
            'shipping_address' => $request->shipping_address
        ]);

        $cart_item = CartItem::where('cart_id', $cart->id)->get();
        $records = [];
        foreach ($cart_item as $record) {
            $records[] = [
                'transaction_id' => $transaction->id,
                'product_id' => $record['product_id'],
                'product_variant_id' => $record['product_variant_id'],
                'quantity' => $record['quantity'],
                'price' => $record['price'],
            ];
        }

        TransactionItem::insert($records);

        $cart->total_price = 0;
        $cart->save();
        CartItem::where('cart_id', $cart->id)->delete();

        return response()->json([
            'status' => 'Success',
            'data' => [
                'id' => $transaction->id,
                'user_id' => $transaction->user_id,
                'status' => $transaction->status,
                'transaction_detail' => $transaction_detail,
                'items' => $records,
                'total_product_price' => $total_product_price,
                'shipping_price' => $shipping_price,
                'admin_fee' => $payment_method->admin_fee,
                'discount_price' => $request->discount_price,
                'total_price' => $transaction->total_price,
                'created_at' => $transaction->created_at->toDateTimeString(),
                'updated_at' => $transaction->updated_at
            ]
        ]);
    }

    public function GetAllTransaction()
    {
        $transactions = Transaction::all();



        $customResponse = [
            'status' => 'Success',
            'message' => 'All Transaction Retrieved',
            'data' => $transactions->map(function ($transaction) {
                return [
                    'id' => $transaction->id,
                    'user_id' => $transaction->user_id,
                    'status' => $transaction->status,
                    'total_price' => $transaction->total_price,
                    'transaction_detail' => TransactionDetail::where('transaction_id', $transaction->id)->first()
                ];
            }),
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
            'metadata' => [
                'request_id' => uniqid(),
                "timestamp" => now()->toDateTimeString()
            ],
        ];
        return response()->json($customResponse, 200);
    }
}
