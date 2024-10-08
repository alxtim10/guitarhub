<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use PHPUnit\Framework\Constraint\IsEmpty;

class ProductController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function add(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|min:0',
            'price' => 'required|numeric|min:0',
        ]);
        
        $product = Product::create([
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'description' => $request->input('description')
        ]);

        return response()->json([
            'status' => 'Success',
            'message' => 'Product Created Successfully',
            'data' => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'created_at' => $product->created_at->toDateTimeString()
            ]
        ]);
    }

    public function get(Request $request)
    {
        if ($request->has('id')) {
            return $this->getProductById($request);
        }
        else if ($request->has('name')) {
            return $this->getProductByName($request);
        }
        else {
            return $this->getAllProducts();
        }
    }

    public function getAllProducts()
    {
        $products = Product::all();

        $customResponse = [
            'status' => 'Success',
            'message' => 'All Product Retrieved',
            'data' => $products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'price' => $product->price,
                ];
            }),
            'metadata' => [
                'request_id' => uniqid(),
                'timestamp' => now()->toDateTimeString()
            ]
        ];

        return response()->json($customResponse, 200);
    }

    /**
     * Display the specified resource.
     */
    public function getProductById(Request $request)
    {
        $id = $request->query('id');
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product Not Found'], 404);
        }

        $customResponse = [
            'status' => 'Success',
            'message' => 'Product Found',
            'data' => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'created_at' => $product->created_at->toDateTimeString(),
                'updated_at' => $product->updated_at->toDateTimeString()
            ],
            'metadata' => [
                'request_id' => uniqid(),
                "timestamp" => now()->toDateTimeString()
            ],
        ];
        return response()->json($customResponse, 200);
    }

    public function getProductByName(Request $request)
    {
        $paramsName = $request->query('name');

        if (!$paramsName) {
            return response()->json([
                'status' => 'error',
                'message' => 'Parameter Name is Required',
                'data' => null
            ], 400);
        }

        $products = Product::where('name', 'like', '%' . $paramsName . '%')->get();
        if ($products->isEmpty()) {
            return response()->json([
                'status' => 'Success',
                'message' => 'No products found',
                'data' => null
            ], 200);
        }

        $customResponse = [
            'status' => 'Success',
            'message' => 'Products found',
            'data' => $products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'price' => $product->price,
                    'created_at' => $product->created_at->toDateTimeString(),
                    'updated_at' => $product->updated_at->toDateTimeString()
                ];
            }),
            'metadata' => [
                'count' => $products->count(),
                'timestamp' => now()->toDateTimeString()
            ]
        ];

        return response()->json($customResponse, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required|integer|exists:products,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string|min:0',
            'price' => 'required|numeric|min:0',
        ]);

        $product = Product::find($request->input('id'));
        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->price = $request->input('price');
        $product->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Product name updated successfully',
            'data' => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'updated_at' => $product->updated_at->toDateTimeString(),
            ]
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(Request $request)
    {
        $id = $request->query('id');

        $product = Product::find($id);
        $product->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Product deleted'
        ]);
    }
}
