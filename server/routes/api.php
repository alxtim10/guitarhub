<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ShippingController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Shipping
Route::get('/GetAllShipping', [ShippingController::class, 'GetAllShipping']);
Route::get('/GetAllShippingVariant', [ShippingController::class, 'GetAllShippingVariant']);
Route::post('/AddShipping', [ShippingController::class, 'AddShipping']);
Route::post('/AddShippingVariant', [ShippingController::class, 'AddShippingVariant']);
Route::get('/GetShippingById', [ShippingController::class, 'GetShippingById']);
Route::delete('/DeleteShipping', [ShippingController::class, 'DeleteShipping']);
Route::delete('/DeleteShippingVariant', [ShippingController::class, 'DeleteShippingVariant']);
//Payment Method
Route::get('/GetAllPaymentMethod', [PaymentMethodController::class, 'GetAllPaymentMethod']);
Route::get('/GetAllPaymentMethodCategory', [PaymentMethodController::class, 'GetAllPaymentMethodCategory']);
Route::post('/AddPaymentMethodCategory', [PaymentMethodController::class, 'AddPaymentMethodCategory']);
Route::post('/AddPaymentMethod', [PaymentMethodController::class, 'AddPaymentMethod']);
Route::get('/GetPaymentMethodCategoryById', [PaymentMethodController::class, 'GetPaymentMethodCategoryById']);
Route::delete('/DeletePaymentMethod', [PaymentMethodController::class, 'DeletePaymentMethod']);
Route::delete('/DeletePaymentMethodCategory', [PaymentMethodController::class, 'DeletePaymentMethodCategory']);

//Store
Route::get('/GetAllStore', [StoreController::class, 'GetAllStore']);
Route::post('/AddStore', [StoreController::class, 'AddStore']);
Route::patch('/UpdateStore', [StoreController::class, 'UpdateStore']);
Route::delete('/DeleteStore', [StoreController::class, 'DeleteStore']);

//Category
Route::get('/GetAllCategory', [CategoryController::class, 'GetAllCategory']);
Route::get('/GetCategoryById', [CategoryController::class, 'GetCategoryById']);
Route::post('/AddCategory', [CategoryController::class, 'AddCategory']);
Route::patch('/EditCategory', [CategoryController::class, 'EditCategory']);
Route::post('/DeleteCategory', [CategoryController::class, 'DeleteCategory']);

//Product
Route::get('/GetAllProduct', [ProductController::class, 'GetAllProduct']);
Route::get('/GetProductById', [ProductController::class, 'GetProductById']);
Route::get('/GetProductByName', [ProductController::class, 'GetProductByName']);
Route::post('/AddProduct', [ProductController::class, 'AddProduct']);
Route::post('/AddProductVariant', [ProductController::class, 'AddProductVariant']);
Route::get('/GetAllProductVariant', [ProductController::class, 'GetAllProductVariant']);
Route::patch('/EditProduct', [ProductController::class, 'EditProduct']);
Route::delete('/DeleteProduct', [ProductController::class, 'DeleteProduct']);

//Transaction
Route::get('/GetTransactionByUserId', [TransactionController::class, 'GetTransactionByUserId']);
Route::get('/GetAllTransaction', [TransactionController::class, 'GetAllTransaction']);
Route::post('/AddTransaction', [TransactionController::class, 'AddTransaction']);

//User
Route::get('/GetAllUser', [UserController::class, 'GetAllUser']);
Route::post('/Register', [UserController::class, 'Register']);
Route::post('/Login', [UserController::class, 'Login']);
Route::post('/Logout', [UserController::class, 'Logout']);

//Cart
Route::get('/GetAllCart', [CartController::class, 'GetAllCart']);
Route::get('/GetUserCart', [CartController::class, 'GetUserCart']);
Route::post('/AddCartItem', [CartController::class, 'AddCartItem']);
Route::patch('/EditProduct', [ProductController::class, 'EditProduct']);
Route::delete('/DeleteProduct', [ProductController::class, 'DeleteProduct']);
