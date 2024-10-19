<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function AddCart(Request $request){
        $request->validate([
            'user_id' => 'required|integer'
        ],  [
            'user_id.exists' => 'The selected user does not exist.'
        ]);

        $cart = Cart::create([
            'user_id' => $request->transaction_id
        ]);

        return response()->json([
            'status' => 'Success',
            'message' => 'Cart Created Successfully',
            'data' => [
                'id' => $cart->id,
                'user_id' => $cart->user_id,
                'created_at' => $cart->created_at->toDateTimeString(),
                'updated_at' => $cart->updated_at
            ]
        ]);
    }
}
