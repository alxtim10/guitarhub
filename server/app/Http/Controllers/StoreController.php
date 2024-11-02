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
                    'user_id' => $data->user_id,
                    'name' => $data->name,
                    'domain' => $data->domain,
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

    public function GetStoreDetailByUserId(Request $request)
    {
        $id = $request->query('id');
        $data = Store::where('user_id', $id);
        if (!$data) {
            return response()->json(['message' => 'Store Not Found'], 404);
        }

        $customResponse = [
            'status' => 'Success',
            'data' => [
                'id' => $data->id,
                'user_id' => $data->user_id,
                'name' => $data->name,
                'domain' => $data->domain,
                'description' => $data->description,
                'rating' => $data->rating,
                'location' => $data->location,
                'is_online' => $data->is_online,
                'is_verified' => $data->is_verified,
                'last_seen' => $data->last_seen,
                'created_at' => $data->created_at,
                'updated_at' => $data->updated_at
            ],
        ];
        return response()->json($customResponse, 200);
    }

    public function AddStore(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|min:0',
            'location' => 'required|string|min:0',
            'domain' => 'required|string|min:0',
            'user_id' => 'required|exists:users,id'
        ], [
            'user_id.exists' => 'The selected user does not exist.',
        ]);

        $store = Store::create([
            'name' => $request->input('name'),
            'domain' => $request->input('domain'),
            'description' => $request->input('description'),
            'user_id' => $request->input('user_id'),
            'location' => $request->input('location'),
            'rating' => 0,
            'is_online' => false,
            'is_verified' => false,
            'last_seen' => now(),
        ]);

        return response()->json([
            'status' => 'Success',
            'message' => 'Store Created Successfully',
            'data' => [
                'id' => $store->id,
                'user_id' => $store->user_id,
                'name' => $store->name,
                'domain' => $store->domain,
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
        $data->domain = $request->input('domain');
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
                'user_id' => $data->user_id,
                'name' => $data->name,
                'domain' => $data->domain,
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
