<?php

namespace App\Http\Controllers;

use App\Models\TransactionItem;
use Illuminate\Http\Request;

class TransactionItemController extends Controller
{
    public function GetTransactionItemsByTransactionId(Request $request)
    {
        $transaction_id = $request->query('transaction_id');
        $transactions = TransactionItem::where('transaction_id', '==', $transaction_id)->get();
        if (!$transactions) {
            return response()->json(['message' => 'Transaction Not Found'], 404);
        }

        $customResponse = [
            'status' => 'Success',
            'message' => 'Transactions Found',
            'data' => $transactions->map(function ($transaction) {
                return [
                    'id' => $transaction->id,
                    'transaction_id' => $transaction->transaction_id,
                    'product_id' => $transaction->product_id,
                    'quantity' => $transaction->quantity,
                    'price' => $transaction->price,
                ];
            }),
            'metadata' => [
                'request_id' => uniqid(),
                "timestamp" => now()->toDateTimeString()
            ],
        ];
        return response()->json($customResponse, 200);
    }

    public function AddTransactionItems(Request $request){
        $request->validate([
            'transaction_id' => 'required|integer',
            'product_id' => 'required|integer',
            'price' => 'required|numeric|min:0',
        ],  [
            'transaction_id.exists' => 'The selected category does not exist.',
            'product_id.exists' => 'The selected store does not exist.',
        ]);

        $transactionItem = TransactionItem::create([
            'transaction_id' => $request->transaction_id,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'price' => $request->price,
        ]);

        return response()->json([
            'status' => 'Success',
            'message' => 'Product Created Successfully',
            'data' => [
                'id' => $transactionItem->id,
                'transaction_id' => $transactionItem->transaction_id,
                'product_id' => $transactionItem->product_id,
                'quantity' => $transactionItem->quantity,
                'price' => $transactionItem->price,
                'created_at' => $transactionItem->created_at->toDateTimeString(),
                'updated_at' => $transactionItem->updated_at
            ]
        ]);
    }
}
