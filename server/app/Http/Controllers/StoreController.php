<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function GetAllStore()
    {
        $stores = Store::paginate(5);

        $customResponse = [
            'status' => 'Success',
            'message' => 'All Store Retrieved',
            'total' => $stores->total(),
            'current_page' => $stores->currentPage(),
            'last_page' => $stores->lastPage(),
            'average_rating' => Store::avg('rating'),
            'total_verified_stores' => Store::where('is_verified', true)->count(),
            'data' => $stores->map(function ($store) {
                return [
                    'id' => $store->id,
                    'name' => $store->name,
                    'description' => $store->description,
                    'rating' => $store->rating,
                    'location' => $store->location,
                    'is_online' => $store->is_online,
                    'is_verified' => $store->is_verified,
                    'last_seen' => $store->last_seen,
                ];
            }),
            'metadata' => [
                'request_id' => uniqid(),
                'timestamp' => now()->toDateTimeString()
            ]
        ];

        return response()->json($customResponse, 200);
    }

    public function AddStore(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|min:0',
            'location' => 'required|string|min:0',
        ]);

        $store = Store::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'location' => $request->input('location'),
            'rating' => $request->input('rating'),
            'is_online' => $request->input('is_online'),
            'is_verified' => $request->input('is_verified'),
            'last_seen' => $request->input('last_seen'),
        ]);

        return response()->json([
            'status' => 'Success',
            'message' => 'Store Created Successfully',
            'data' => [
                'id' => $store->id,
                'name' => $store->name,
                'description' => $store->description,
                'location' => $store->location,
                'is_online' => $store->is_online,
                'is_verified' => $store->is_verified,
                'rating' => $store->rating,
                'last_seen' => $store->last_seen,
                'created_at' => $store->created_at->toDateTimeString()
            ]
        ]);
    }

    public function UpdateStore(Request $request)
    {
        $request->validate([
            'id' => 'required|integer|exists:products,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string|min:0',
        ]);

        $store = Store::find($request->input('id'));
        $store->name = $request->input('name');
        $store->description = $request->input('description');
        $store->location = $request->input('location');
        $store->location = $request->input('is_verified');
        $store->location = $request->input('last_seen');
        $store->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Store updated successfully',
            'data' => [
                'id' => $store->id,
                'name' => $store->name,
                'description' => $store->description,
                'location' => $store->location,
                'is_online' => $store->is_online,
                'rating' => $store->rating,
                'last_seen' => $store->last_seen,
                'updated_at' => $store->updated_at->toDateTimeString(),
            ]
        ], 200);
    }

    public function DeleteStore(Request $request)
    {
        $id = $request->query('id');

        $store = Store::find($id);
        $store->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Store deleted'
        ]);
    }
}
