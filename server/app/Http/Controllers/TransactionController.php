<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\TransactionItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function AddTransaction(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'items' => 'required|array',
        ],  [
            'user_id.exists' => 'The selected user does not exist.',
        ]);

        $transaction = Transaction::create([
            'user_id' => $request->user_id,
            'status' => $request->status,
            'total_price' => $request->total_price,
        ]);

        $records = array_map(function ($record) use ($transaction) {
            $record['transaction_id'] = $transaction->id;
            return $record;
        }, $validated['items']);

        $transaction_items = TransactionItem::insert($records);

        return response()->json([
            'status' => 'Success',
            'data' => [
                'id' => $transaction->id,
                'user_id' => $transaction->user_id,
                'status' => $transaction->status,
                'total_price' => $transaction->total_price,
                'items' => $records,
                'created_at' => $transaction->created_at->toDateTimeString(),
                'updated_at' => $transaction->updated_at
            ]
        ]);
    }

    public function AddTransactionItems(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id'
        ],  [
            'user_id.exists' => 'The selected user does not exist.',
        ]);

        $transaction = Transaction::create([
            'user_id' => $request->user_id,
            'status' => $request->status,
            'total_price' => $request->total_price,
        ]);

        return response()->json([
            'status' => 'Success',
            'message' => 'Transaction Created',
            'data' => [
                'id' => $transaction->id,
                'user_id' => $transaction->user_id,
                'status' => $transaction->status,
                'total_price' => $transaction->total_price,
                'created_at' => $transaction->created_at->toDateTimeString(),
                'updated_at' => $transaction->updated_at
            ]
        ]);
    }

    public function GetAllTransaction()
    {
        $transactions = Transaction::all();

        $customResponse = [
            'status' => 'Success',
            'message' => 'All Transaction Retrieved',
            'data' => $transactions->map(function ($transaction) {
                return [
                    'id' => $transaction->id,
                    'user_id' => $transaction->user_id,
                    'status' => $transaction->status,
                    'total_price' => $transaction->total_price,
                ];
            }),
        ];

        return response()->json($customResponse, 200);
    }

    public function GetTransactionByUserId(Request $request)
    {
        $user_id = $request->query('user_id');
        $transactions = Transaction::where('user_id', '==', $user_id)->get();
        if (!$transactions) {
            return response()->json(['message' => 'Transactions Not Found'], 404);
        }

        $customResponse = [
            'status' => 'Success',
            'message' => 'Transactions Found',
            'data' => $transactions->map(function ($transaction) {
                return [
                    'id' => $transaction->id,
                    'user_id' => $transaction->user_id,
                    'transaction_date' => $transaction->transaction_date,
                    'status' => $transaction->status,
                    'total_amount' => $transaction->total_amount,
                    'shipping_address' => $transaction->shipping_address,
                    'created_at' => $transaction->created_at,
                    'updated_at' => $transaction->updated_at
                ];
            }),
            'metadata' => [
                'request_id' => uniqid(),
                "timestamp" => now()->toDateTimeString()
            ],
        ];
        return response()->json($customResponse, 200);
    }
}
