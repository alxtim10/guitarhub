<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function GetAllCategory()
    {
        $categories = Category::paginate(5);

        $customResponse = [
            'status' => 'Success',
            'message' => 'All Category Retrieved',
            'total' => $categories->total(),
            'current_page' => $categories->currentPage(),
            'last_page' => $categories->lastPage(),
            'data' => $categories->map(
                function ($category) {
                    return [
                        'id' => $category->id,
                        'name' => $category->name,
                        'description' => $category->description,
                    ];
                },
            ),
            'metadata' => [
                'request_id' => uniqid(),
                'timestamp' => now()->toDateTimeString()
            ]
        ];

        return response()->json($customResponse, 200);
    }

    public function AddCategory(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|min:0',
        ]);

        $category = Category::create([
            'name' => $request->input('name'),
            'description' => $request->input('description')
        ]);

        return response()->json([
            'status' => 'Success',
            'message' => 'Category Created Successfully',
            'data' => [
                'id' => $category->id,
                'name' => $category->name,
                'description' => $category->description,
                'created_at' => $category->created_at->toDateTimeString()
            ]
        ]);
    }

    public function GetCategoryById(Request $request)
    {
        $id = $request->query('id');
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Category Not Found'], 404);
        }

        $customResponse = [
            'status' => 'Success',
            'message' => 'Category Found',
            'data' => [
                'id' => $category->id,
                'name' => $category->name,
                'description' => $category->description,
                'created_at' => $category->created_at,
                'updated_at' => $category->updated_at
            ],
            'metadata' => [
                'request_id' => uniqid(),
                "timestamp" => now()->toDateTimeString()
            ],
        ];
        return response()->json($customResponse, 200);
    }

    public function UpdateCategory(Request $request)
    {
        $request->validate([
            'id' => 'required|integer|exists:products,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string|min:0',
        ]);

        $category = Category::find($request->input('id'));
        $category->name = $request->input('name');
        $category->description = $request->input('description');
        $category->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Category updated successfully',
            'data' => [
                'id' => $category->id,
                'name' => $category->name,
                'description' => $category->description,
                'updated_at' => $category->updated_at->toDateTimeString(),
            ]
        ], 200);
    }

    public function DeleteCategory(Request $request)
    {
        $id = $request->query('id');

        $category = Category::find($id);
        $category->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Category deleted'
        ]);
    }
}
