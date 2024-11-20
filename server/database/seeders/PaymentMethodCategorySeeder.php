<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaymentMethodCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('payment_method_categories')->insert([
            [
                'name' => 'Virtual Account',
            ],
            [
                'name' => 'E-Wallet',
            ],
        ]);
    }
}
