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
        'total_product_price',
        'base_shipping_price',
        'additional_shipping_price',
        'admin_fee',
        'discount_price',
        'is_discount',
        'total_price',
        'shipping_address',
    ];
}
