<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Store;
use Illuminate\Http\Request;
use PHPUnit\Framework\Constraint\IsEmpty;

class ProductController extends Controller
{
    public function GetAllProduct()
    {
        $datas = Product::paginate(5);

        $customResponse = [
            'status' => 'Success',
            'message' => 'All Product Retrieved',
            'total' => $datas->total(),
            'current_page' => $datas->currentPage(),
            'last_page' => $datas->lastPage(),
            'sold_products' => Product::sum('total_purchases'),
            'data' => $datas->map(function ($data) {
                return [
                    'id' => $data->id,
                    'name' => $data->name,
                    'description' => $data->description,
                    'price' => $data->price,
                    'rating' => $data->rating,
                    'category' => strval($data->category_id) . ' - ' . Category::where('id', $data->category_id)->value('name'),
                    'store' => strval($data->store_id) . ' - ' . Store::where('id', $data->store_id)->value('name'),
                    'variant' => ProductVariant::where('product_id', $data->id)->get(),
                    'stock_quantity' => $data->stock_quantity,
                    'discount_percentage' => $data->discount_percentage,
                    'discount_start_date' => $data->discount_start_date,
                    'discount_end_date' => $data->discount_end_date,
                    'total_purchases' => $data->total_purchases,
                    'created_at' => $data->created_at,
                    'updated_at' => $data->updated_at
                ];
            }),
        ];

        return response()->json($customResponse, 200);
    }

    public function GetProductById(Request $request)
    {
        $id = $request->query('id');
        $data = Product::find($id);
        if (!$data) {
            return response()->json(['message' => 'Product Not Found'], 404);
        }

        $customResponse = [
            'status' => 'Success',
            'message' => 'Product Found',
            'data' => [
                'id' => $data->id,
                'name' => $data->name,
                'description' => $data->description,
                'price' => $data->price,
                'category_id' => $data->category_id,
                'store_id' => $data->store_id,
                'stock_quantity' => $data->stock_quantity,
                'discount_percentage' => $data->discount_percentage,
                'discount_start_date' => $data->discount_start_date,
                'discount_end_date' => $data->discount_end_date,
                'total_purchases' => $data->total_purchases,
                'variant' => ProductVariant::where('product_id', $data->id)->get(),
                'created_at' => $data->created_at,
                'updated_at' => $data->updated_at
            ],
        ];
        return response()->json($customResponse, 200);
    }

    public function GetProductByName(Request $request)
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
                    'category_id' => $product->category_id,
                    'store_id' => $product->store_id,
                    'stock_quantity' => $product->stock_quantity,
                    'discount_percentage' => $product->discount_percentage,
                    'discount_start_date' => $product->discount_start_date,
                    'discount_end_date' => $product->discount_end_date,
                    'total_purchases' => $product->total_purchases,
                    'created_at' => $product->created_at,
                    'updated_at' => $product->updated_at
                ];
            }),
            'metadata' => [
                'count' => $products->count(),
                'timestamp' => now()->toDateTimeString()
            ]
        ];

        return response()->json($customResponse, 200);
    }

    public function AddProduct(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'store_id' => 'required|exists:stores,id'
        ],  [
            'category_id.exists' => 'The selected category does not exist.',
            'store_id.exists' => 'The selected store does not exist.',
        ]);

        $data = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'rating' => $request->rating,
            'stock_quantity' => $request->stock_quantity,
            'category_id' => $request->category_id,
            'store_id' => $request->store_id,
            'discount_percentage' => 0,
            'discount_start_date' => null,
            'discount_end_date' => null,
            'total_purchases' => 0
        ]);

        $variants = array_map(function ($variant) use ($data) {
            $variant['product_id'] = $data->id;
            return $variant;
        }, $request['variant']);

        ProductVariant::insert($variants);

        return response()->json([
            'status' => 'Success',
            'data' => [
                'id' => $data->id,
                'name' => $data->name,
                'description' => $data->description,
                'price' => $data->price,
                'rating' => $data->rating,
                'category' => Category::where('id', $data->category_id)->value('name'),
                'store' => Store::where('id', $data->store_id)->value('name'),
                'stock_quantity' => $data->stock_quantity,
                'variant' => $variants,
                'discount_percentage' => $data->discount_percentage,
                'discount_start_date' => $data->discount_start_date,
                'discount_end_date' => $data->discount_end_date,
                'total_purchases' => $data->total_purchases,
                'created_at' => $data->created_at->toDateTimeString(),
                'updated_at' => $data->updated_at
            ]
        ]);
    }

    public function AddProductVariant(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'product_id' => 'required|exists:products,id',
            'stock_quantity' => 'required|integer|min:0',
        ],  [
            'product_id.exists' => 'The selected product does not exist.',
        ]);

        $data = ProductVariant::create([
            'name' => $request->name,
            'product_id' => $request->product_id,
            'stock_quantity' => $request->stock_quantity,
        ]);

        return response()->json([
            'status' => 'Success',
            'data' => [
                'id' => $data->id,
                'name' => $data->name,
                'product' => Product::where('id', $data->product_id)->value('name'),
                'stock_quantity' => $data->stock_quantity,
                'created_at' => $data->created_at->toDateTimeString(),
                'updated_at' => $data->updated_at
            ]
        ]);
    }

    public function GetAllProductVariant(Request $request)
    {
        $datas = ProductVariant::paginate(5);

        $customResponse = [
            'status' => 'Success',
            'total' => $datas->total(),
            'current_page' => $datas->currentPage(),
            'last_page' => $datas->lastPage(),
            'sold_products' => Product::sum('total_purchases'),
            'data' => $datas->map(function ($data) {
                return [
                    'id' => $data->id,
                    'name' => $data->name,
                    'description' => $data->description,
                    'product_id' => $data->product_id,
                    'created_at' => $data->created_at,
                    'updated_at' => $data->updated_at
                ];
            }),
        ];

        return response()->json($customResponse, 200);
    }

    public function EditProduct(Request $request)
    {
        $request->validate([
            'id' => 'required|integer|exists:products,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string|min:0',
            'price' => 'required|numeric|min:0',
        ]);

        $data = Product::find($request->input('id'));
        $data->name = $request->input('name');
        $data->description = $request->input('description');
        $data->price = $request->input('price');
        $data->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Product name updated successfully',
            'data' => [
                'id' => $data->id,
                'name' => $data->name,
                'description' => $data->description,
                'price' => $data->price,
                'category_id' => $data->category_id,
                'store_id' => $data->store_id,
                'stock_quantity' => $data->stock_quantity,
                'discount_percentage' => $data->discount_percentage,
                'discount_start_date' => $data->discount_start_date,
                'discount_end_date' => $data->discount_end_date,
                'total_purchases' => $data->total_purchases,
                'created_at' => $data->created_at,
                'updated_at' => $data->updated_at->toDateTimeString(),
            ]
        ], 200);
    }

    public function DeleteProduct(Request $request)
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
