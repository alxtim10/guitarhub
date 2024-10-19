<?php

namespace App\Http\Controllers;

use App\Models\LastSeenItem;
use Illuminate\Http\Request;

class LastSeenItemController extends Controller
{
    public function AddLastSeenItem(Request $request){
        $request->validate([
            'user_id' => 'required|integer',
            'product_id' => 'required|integer'
        ],  [
            'user_id.exists' => 'The selected user does not exist.',
            'product_id.exists' => 'The selected product does not exist.'
        ]);

        $last_seen_item = LastSeenItem::create([
            'user_id' => $request->cart_id,
            'product_id' => $request->product_id,
        ]);

        return response()->json([
            'status' => 'Success',
            'message' => 'Last Seen Item Added',
            'data' => [
                'id' => $last_seen_item->id,
                'user_id' => $last_seen_item->cart_id,
                'product_id' => $last_seen_item->product_id,
                'created_at' => $last_seen_item->created_at->toDateTimeString(),
                'updated_at' => $last_seen_item->updated_at
            ]
        ]);
    }
}
