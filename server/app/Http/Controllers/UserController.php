<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function Register(Request $request)
    {
        $validatedData = $request->validate([
            'fullname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string',
        ]);

        $user = User::create([
            'fullname' => $validatedData['fullname'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        $cart = Cart::create([
            'user_id' => $user->id,
            'total_price' => 0
        ]);

        return response()->json([
            'fullname' => $user->fullname,
            'email' => $user->email,
            'cart_id' => $cart->id
        ]);
    }

    public function Login(Request $request)
    {
        $user = User::where('email',  $request->email)->first();
        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => ['Username or password incorrect'],
            ], 401);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'User logged in successfully',
            'fullname' => $user->fullname,
            'id' => $user->id
        ]);
    }

    public function Logout(Request $request)
    {
        return response()->json(
            [
                'status' => 'success',
                'message' => 'User logged out successfully'
            ]
        );
    }

    public function GetAllUser()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function GetUserById(Request $request)
    {
        $id = $request->query('id');
        $data = User::where('id', $id)->first();

        $customResponse = [
            'status' => 'Success',
            'data' => [
                'id' => $data->id,
                'fullname' => $data->fullname,
                'phone' => $data->phone,
                'email' => $data->email,
                'address' => $data->address,
            ]
        ];

        return response()->json($customResponse, 200);

        return response()->json($user);
    }
}
