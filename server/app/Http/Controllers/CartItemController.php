<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;

class CartItemController extends Controller
{
    public function AddCartItem(Request $request){
        $request->validate([
            'cart_id' => 'required|integer',
            'product_id' => 'required|integer'
        ],  [
            'cart_id.exists' => 'The selected user does not exist.',
            'product_id.exists' => 'The selected user does not exist.'
        ]);

        $cart_item = CartItem::create([
            'cart_id' => $request->cart_id,
            'product_id' => $request->product_id,
            'price' => $request->price,
            'quantity' => $request->quantity
        ]);

        return response()->json([
            'status' => 'Success',
            'message' => 'Cart Item Added to Cart',
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
