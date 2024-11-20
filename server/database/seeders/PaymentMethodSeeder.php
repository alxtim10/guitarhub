<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('payment_methods')->insert([
            [
                'payment_method_category_id' => 1,
                'name' => 'Mandiri Virtual Account',
                'admin_fee' => 4000
            ],
            [
                'payment_method_category_id' => 2,
                'name' => 'GOPAY',
                'admin_fee' => 4000
            ],
        ]);
    }
}
