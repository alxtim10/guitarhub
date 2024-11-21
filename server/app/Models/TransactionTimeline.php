<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionTimeline extends Model
{
    use HasFactory;

    protected $fillable = ['transaction_id', 'event_date', 'message'];
}
