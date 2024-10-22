<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
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
Route::patch('/UpdateProduct', [ProductController::class, 'UpdateProduct']);
Route::delete('/DeleteProduct', [ProductController::class, 'DeleteProduct']);

//Transaction
Route::get('/GetTransactionByUserId', [TransactionController::class, 'GetTransactionByUserId']);
Route::get('/GetAllTransaction', [TransactionController::class, 'GetAllTransaction']);
Route::post('/AddTransaction', [TransactionController::class, 'AddTransaction']);

//User

Route::post('/SignUp', [UserController::class, 'SignUp']);
Route::get('/GetAllUser', [UserController::class, 'GetAllUser']);