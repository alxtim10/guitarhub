<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMethodCategory extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
    ];
}
