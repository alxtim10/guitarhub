<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'domain', 'user_id', 'description', 'location', 'is_online', 'is_verified', 'last_seen', 'rating'];
}
