<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function GetAllStore()
    {
        $datas = Store::paginate(5);

        $customResponse = [
            'status' => 'Success',
            'message' => 'All Store Retrieved',
            'total' => $datas->total(),
            'current_page' => $datas->currentPage(),
            'last_page' => $datas->lastPage(),
            'average_rating' => Store::avg('rating'),
            'total_verified_stores' => Store::where('is_verified', true)->count(),
            'data' => $datas->map(function ($data) {
                return [
                    'id' => $data->id,
                    'name' => $data->name,
                    'description' => $data->description,
                    'rating' => $data->rating,
                    'location' => $data->location,
                    'is_online' => $data->is_online,
                    'is_verified' => $data->is_verified,
                    'last_seen' => $data->last_seen,
                ];
            }),
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
            'id' => 'required|integer|exists:stores,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string|min:0',
        ]);

        $data = Store::find($request->input('id'));
        $data->name = $request->input('name');
        $data->description = $request->input('description');
        $data->location = $request->input('location');
        $data->rating = $request->input('rating');
        $data->is_verified = $request->input('is_verified');
        $data->is_online = $request->input('is_online');
        $data->last_seen = $request->input('last_seen');
        $data->save();

        return response()->json([
            'status' => 'success',
            'data' => [
                'id' => $data->id,
                'name' => $data->name,
                'description' => $data->description,
                'location' => $data->location,
                'is_online' => $data->is_online,
                'rating' => $data->rating,
                'last_seen' => $data->last_seen,
                'updated_at' => $data->updated_at->toDateTimeString(),
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
