<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Store;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function GetAllCategory()
    {
        $datas = Category::paginate(5);

        $customResponse = [
            'status' => 'Success',
            'total' => $datas->total(),
            'current_page' => $datas->currentPage(),
            'last_page' => $datas->lastPage(),
            'data' => $datas->map(
                function ($data) {
                    return [
                        'id' => $data->id,
                        'name' => $data->name,
                        'description' => $data->description,
                        'store_id' => $data->store_id,
                    ];
                },
            ),
        ];

        return response()->json($customResponse, 200);
    }

    public function GetAllCategoryByStoreId(Request $request)
    {
        $id = $request->query('id');
        $data = Category::where('store_id', $id)->get();

        $customResponse = [
            'status' => 'Success',
            'data' => $data
        ];

        return response()->json($customResponse, 200);
    }

    public function AddCategory(Request $request)
    {
        $store = Store::where('user_id', $request->user_id)->first();

        $data = Category::create([
            'store_id' => $store->id,
            'name' => $request->input('name'),
            'description' => $request->input('description')
        ]);

        return response()->json([
            'status' => 'Success',
            'message' => 'Category Created Successfully',
            'data' => [
                'id' => $data->id,
                'store_id' => $data->store_id,
                'name' => $data->name,
                'description' => $data->description,
                'created_at' => $data->created_at->toDateTimeString()
            ]
        ]);
    }

    public function GetCategoryById(Request $request)
    {
        $id = $request->query('id');
        $data = Category::find($id);
        if (!$data) {
            return response()->json(['message' => 'Category Not Found'], 404);
        }

        $customResponse = [
            'status' => 'Success',
            'message' => 'Category Found',
            'data' => [
                'id' => $data->id,
                'name' => $data->name,
                'description' => $data->description,
                'created_at' => $data->created_at,
                'updated_at' => $data->updated_at
            ],
        ];
        return response()->json($customResponse, 200);
    }

    public function EditCategory(Request $request)
    {
        $request->validate([
            'id' => 'required|integer|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string|min:0',
        ]);

        $data = Category::find($request->input('id'));
        $data->name = $request->input('name');
        $data->description = $request->input('description');
        $data->save();

        return response()->json([
            'status' => 'success',
            'data' => [
                'id' => $data->id,
                'name' => $data->name,
                'description' => $data->description,
                'updated_at' => $data->updated_at->toDateTimeString(),
            ]
        ], 200);
    }

    public function DeleteCategory(Request $request)
    {
        $id = $request->input('id');

        $category = Category::find($id);
        $category->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Category deleted'
        ]);
    }
}
