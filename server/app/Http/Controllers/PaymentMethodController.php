<?php

namespace App\Http\Controllers;

use App\Models\PaymentMethod;
use App\Models\PaymentMethodCategory;
use Illuminate\Http\Request;

class PaymentMethodController extends Controller
{
    public function GetAllPaymentMethod()
    {
        $datas = PaymentMethodCategory::paginate(5);

        $customResponse = [
            'total' => $datas->total(),
            'current_page' => $datas->currentPage(),
            'last_page' => $datas->lastPage(),
            'data' => $datas->map(
                function ($data) {

                    $variants = PaymentMethod::where('payment_method_category_id', $data->id)->get();

                    return [
                        'id' => $data->id,
                        'name' => $data->name,
                        'variant' => $variants,
                    ];
                },
            ),
        ];

        return response()->json($customResponse, 200);
    }

    public function GetAllPaymentMethodCategory()
    {
        $datas = PaymentMethodCategory::paginate(5);

        $customResponse = [
            'total' => $datas->total(),
            'current_page' => $datas->currentPage(),
            'last_page' => $datas->lastPage(),
            'data' => $datas->map(
                function ($data) {
                    return [
                        'id' => $data->id,
                        'name' => $data->name,
                    ];
                },
            ),
        ];

        return response()->json($customResponse, 200);
    }

    public function AddPaymentMethodCategory(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $data = PaymentMethodCategory::create([
            'name' => $request->input('name'),
        ]);

        return response()->json([
            'status' => 'Success',
            'data' => [
                'id' => $data->id,
                'name' => $data->name,
                'created_at' => $data->created_at->toDateTimeString()
            ]
        ]);
    }

    public function AddPaymentMethod(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'admin_fee' => 'required|integer',
        ],  [
            'payment_method_category_id.exists' => 'The selected category does not exist.',
        ]);

        $data = PaymentMethod::create([
            'name' => $request->input('name'),
            'payment_method_category_id' => $request->input('payment_method_category_id'),
            'admin_fee' => $request->input('admin_fee')
        ]);

        return response()->json([
            'status' => 'Success',
            'data' => [
                'id' => $data->id,
                'payment_method_category_id' => $data->payment_method_category_id,
                'admin_fee' => $data->admin_fee,
                'created_at' => $data->created_at->toDateTimeString()
            ]
        ]);
    }

    public function GetPaymentMethodCategoryById(Request $request)
    {
        $id = $request->query('id');
        $data = PaymentMethodCategory::find($id);
        if (!$data) {
            return response()->json(['message' => 'Product Not Found'], 404);
        }

        $variants = PaymentMethod::where('payment_method_category_id', $id)->get();

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

    public function DeletePaymentMethod(Request $request)
    {
        $id = $request->query('id');

        $data = PaymentMethod::find($id);
        $data->delete();
        return response()->json([
            'status' => 'success',
        ]);
    }

    public function DeletePaymentMethodCategory(Request $request)
    {
        $id = $request->query('id');

        $data = PaymentMethodCategory::find($id);
        $data->delete();
        return response()->json([
            'status' => 'success',
        ]);
    }
}
