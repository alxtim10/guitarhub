<?php

namespace App\Http\Controllers;

use App\Models\StatusMaster;
use Illuminate\Http\Request;

class StatusMasterController extends Controller
{
    public function AddStatus(Request $request)
    {
        $status = StatusMaster::create([
            'name' => $request->name,
        ]);

        return response()->json([
            'status' => 'Success',
            'data' => $status
        ]);
    }

    public function GetAllStatus()
    {
        $datas = StatusMaster::all();

        $customResponse = [
            'status' => 'Success',
            'data' => $datas
        ];

        return response()->json($customResponse, 200);
    }
}
