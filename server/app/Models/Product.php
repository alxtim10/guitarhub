<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'rating',
        'category_id',
        'store_id',
        'stock_quantity',
        'discount_percentage',
        'discount_start_date',
        'discount_end_date',
        'total_purchases'
    ];
}
