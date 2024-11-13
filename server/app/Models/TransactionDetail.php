<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_id',
        'transaction_date',
        'shipping_id',
        'shipping_name',
        'payment_method_id',
        'payment_method_name',
        'product_price',
        'shipping_price',
        'product_id',
        'product_name',
        'product_variant_id',
        'product_variant_name',
        'admin_fee',
        'discount_price',
        'is_discount',
        'total_price',
        'shipping_address',
    ];
}
