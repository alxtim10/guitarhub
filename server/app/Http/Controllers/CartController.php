<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

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

        $customResponse = [
            'status' => 'Success',
            'data' => [
                'id' => $data->id,
                'user_id' => $data->user_id,
                'total_price' => $data->total_price,
                'items' => $items,
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
            'product_id' => 'required|integer'
        ],  [
            'user_id.exists' => 'The selected user does not exist.',
            'product_id.exists' => 'The selected product does not exist.'
        ]);

        $cart = Cart::where('user_id', $request->user_id)->first();
        if (!$cart) {
            return response()->json(['message' => 'Cart Not Found'], 404);
        }
        $product = Product::where('id', $request->product_id)->first();
        if (!$product) {
            return response()->json(['message' => 'Product Not Found'], 404);
        }

        $cart_item = CartItem::create([
            'cart_id' => $cart->id,
            'product_id' => $request->product_id,
            'price' => $product->price,
            'quantity' => $request->quantity
        ]);

        return response()->json([
            'status' => 'Success',
            'data' => [
                'id' => $cart_item->id,
                'cart_id' => $cart_item->cart_id,
                'product_id' => $cart_item->product_id,
                'price' => $cart_item->price,
                'quantity' => $cart_item->quantity,
                'created_at' => $cart_item->created_at->toDateTimeString(),
                'updated_at' => $cart_item->updated_at
            ]
        ]);
    }
}
