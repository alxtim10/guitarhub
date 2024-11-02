<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingVariant extends Model
{
    use HasFactory;

    protected $fillable = [
        'shipping_id',
        'name',
        'price',
    ];
}
