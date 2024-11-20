<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShippingVariantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('shipping_variants')->insert([
            [
                'name' => 'GOJEK Instant',
                'shipping_id' => 1,
                'price' => 20000
            ],
            [
                'name' => 'JNE Reguler',
                'shipping_id' => 2,
                'price' => 25000
            ],
        ]);
    }
}
