<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function SignUp(Request $request)
    {

        $user = User::create([
            'username' => $request->username,
            'password' => Hash::make($request['password']),
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'phone' => $request->phone,
            'email' => $request->email,
            'address' => $request->adress,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 'Success',
            'message' => 'User Created',
            'data' => [
                'id' => $user->id,
                'username' => $user->username,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'phone' => $user->phone,
                'email' => $user->email,
                'address' => $user->address,
                'created_at' => $user->created_at->toDateTimeString(),
                'updated_at' => $user->updated_at
            ],
            'token' => $token
        ], 201);
    }

    public function GetAllUser(){
        $users = User::all();
        return response()->json($users);
    }
}
