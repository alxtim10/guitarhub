<?php

namespace App\Http\Controllers;

use App\Models\Shipping;
use App\Models\ShippingVariant;
use Illuminate\Http\Request;

class ShippingController extends Controller
{
    public function GetAllShipping()
    {
        $datas = Shipping::paginate(5);

        $customResponse = [
            'total' => $datas->total(),
            'current_page' => $datas->currentPage(),
            'last_page' => $datas->lastPage(),
            'data' => $datas->map(
                function ($data) {
                    return [
                        'id' => $data->id,
                        'name' => $data->name,
                        'variant' => ShippingVariant::where('shipping_id', $data->id)->get(),
                    ];
                },
            ),
        ];

        return response()->json($customResponse, 200);
    }

    public function GetAllShippingVariant()
    {
        $variants = ShippingVariant::paginate(5);

        $customResponse = [
            'total' => $variants->total(),
            'current_page' => $variants->currentPage(),
            'last_page' => $variants->lastPage(),
            'data' => $variants->map(
                function ($variant) {
                    return [
                        'id' => $variant->id,
                        'shipping_id' => $variant->shipping_id,
                        'name' => $variant->name,
                        'price' => $variant->price,
                    ];
                },
            ),
        ];

        return response()->json($customResponse, 200);
    }

    public function AddShipping(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $shipping = Shipping::create([
            'name' => $request->input('name'),
        ]);

        return response()->json([
            'status' => 'Success',
            'data' => [
                'id' => $shipping->id,
                'name' => $shipping->name,
                'created_at' => $shipping->created_at->toDateTimeString()
            ]
        ]);
    }

    public function AddShippingVariant(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|integer',
        ],  [
            'shipping_id.exists' => 'The selected shipping does not exist.',
        ]);

        $data = ShippingVariant::create([
            'name' => $request->input('name'),
            'shipping_id' => $request->input('shipping_id'),
            'price' => $request->input('price')
        ]);

        return response()->json([
            'status' => 'Success',
            'data' => [
                'id' => $data->id,
                'shipping_id' => $data->shipping_id,
                'price' => $data->price,
                'created_at' => $data->created_at->toDateTimeString()
            ]
        ]);
    }

    public function GetShippingById(Request $request)
    {
        $id = $request->query('id');
        $data = Shipping::find($id);
        if (!$data) {
            return response()->json(['message' => 'Product Not Found'], 404);
        }

        $variants = ShippingVariant::where('shipping_id', $id)->get();

        $customResponse = [
            'status' => 'Success',
            'data' => [
                'id' => $data->id,
                'name' => $data->name,
                'variants' => $variants,
                'created_at' => $data->created_at,
                'updated_at' => $data->updated_at
            ],
        ];
        return response()->json($customResponse, 200);
    }

    public function DeleteShipping(Request $request)
    {
        $id = $request->query('id');

        $data = Shipping::find($id);
        $data->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Product deleted'
        ]);
    }

    public function DeleteShippingVariant(Request $request)
    {
        $id = $request->query('id');

        $data = ShippingVariant::find($id);
        $data->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Product deleted'
        ]);
    }
}
