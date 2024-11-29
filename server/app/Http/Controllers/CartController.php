<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use App\Models\Store;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
    public function GetAllCart()
    {
        $datas = Cart::paginate(5);

        $customResponse = [
            'status' => 'Success',
            'total' => $datas->total(),
            'current_page' => $datas->currentPage(),
            'last_page' => $datas->lastPage(),
            'data' => $datas->map(
                function ($data) {
                    return [
                        'id' => $data->id,
                        'user_id' => $data->user_id,
                        'total_price' => $data->total_price,
                    ];
                },
            ),
        ];

        return response()->json($customResponse, 200);
    }

    public function GetUserCart(Request $request)
    {
        $id = $request->query('id');

        $data = Cart::where('user_id', $id)->first();
        if (!$data) {
            return response()->json(['message' => 'Cart Not Found'], 404);
        }
        $items = CartItem::where('cart_id', $data->id)->get();

        $list_items = [];
        $list_store = $items->pluck('store_id')->unique()->values();

        foreach ($list_store as $store) {
            $filteredItems = $items->where('store_id', $store);
            $productIds = $filteredItems->pluck('product_id')->unique();
            $productVariantIds = $filteredItems->pluck('product_variant_id')->unique();

            $products = Product::whereIn('id', $productIds)->get()->keyBy('id');
            $productVariants = ProductVariant::whereIn('id', $productVariantIds)->get()->keyBy('id');
            $productImages = ProductImage::whereIn('product_id', $productIds)->get()->keyBy('product_id');
            $store_detail = Store::where('id', $store)->first();

            $productsData = [];
            $store_price = 0;
            foreach ($filteredItems as $item) {
                $product = $products[$item->product_id] ?? null;
                $product_variant = $productVariants[$item->product_variant_id] ?? null;
                $product_image = $productImages[$item->product_id] ?? null;

                if ($product && $product_variant) {
                    $productsData[] = [
                        'id' => $item->id,
                        'cart_id' => $item->cart_id,
                        'product_id' => $item->product_id,
                        'product_name' => $product->name,
                        'product_variant_id' => $item->product_variant_id,
                        'product_variant_name' => $product_variant->name,
                        'image_url' => $product_image->image_url,
                        'price' => $item->price,
                        'quantity' => $item->quantity,
                    ];
                }
                $store_price += $item->price;
            }
            $list_items[] = [
                'store_id' => $store,
                'store_name' => $store_detail->name,
                'price' => $store_price,
                'quantity' => count($productsData),
                'products' => $productsData
            ];
        }

        $customResponse = [
            'status' => 'Success',
            'data' => [
                'id' => $data->id,
                'user_id' => $data->user_id,
                'total_price' => $data->total_price,
                'items' => $list_items,
                'created_at' => $data->created_at,
                'updated_at' => $data->updated_at
            ]
        ];

        return response()->json($customResponse, 200);
    }

    public function AddCartItem(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'product_id' => 'required|integer',
            'store_id' => 'required|integer',
        ],  [
            'user_id.exists' => 'The selected user does not exist.',
            'product_id.exists' => 'The selected product does not exist.',
            'store_id.exists' => 'The selected store does not exist.'
        ]);

        $cart = Cart::where('user_id', $request->user_id)->first();
        if (!$cart) {
            return response()->json(['message' => 'Cart Not Found'], 404);
        }

        $store = Store::where('id', $request->store_id)->first();
        if (!$store) {
            return response()->json(['message' => 'Store Not Found'], 404);
        }

        $product = Product::where('id', $request->product_id)->first();
        if (!$product) {
            return response()->json(['message' => 'Product Not Found'], 404);
        }
        $product_variant = ProductVariant::where('id', $request->product_variant_id)->first();
        if (!$product_variant) {
            return response()->json(['message' => 'Product Variant Not Found'], 404);
        }

        $existing_cart_item = CartItem::where('product_id', $request->product_id)->where('product_variant_id', $request->product_variant_id)->first();
        DB::beginTransaction();

        try {
            if (!$existing_cart_item) {
                $cart_item = CartItem::create([
                    'cart_id' => $cart->id,
                    'product_id' => $request->product_id,
                    'store_id' => $request->store_id,
                    'product_variant_id' => $request->product_variant_id,
                    'price' => $product->price * $request->quantity,
                ]);

                $cart->total_price += $product->price * $request->quantity;
                $cart->save();

                DB::commit();

                return response()->json([
                    'status' => 'Success',
                    'data' => [
                        'id' => $cart_item->id,
                        'cart_id' => $cart_item->cart_id,
                        'store_id' => $cart_item->store_id,
                        'product_id' => $cart_item->product_id,
                        'product_variant_id' => $cart_item->product_variant_id,
                        'price' => $cart_item->price,
                    ]
                ]);
            } else {
                return response()->json(['message' => 'Product already in cart'], 404);
            }
        } catch (Exception $e) {
            DB::rollback();
        }
    }


    public function DeleteCartItem(Request $request)
    {
        $id = $request->input('id');
        $data = CartItem::find($id);
        $data->delete();

        $cart = Cart::where('id', $data->cart_id)->first();

        $cart->total_price -= $data->price;
        $cart->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Cart Item Deleted'
        ]);
    }
}
