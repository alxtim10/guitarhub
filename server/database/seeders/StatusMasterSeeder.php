<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusMasterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('status_masters')->insert([
            [
                'name' => 'Awaiting Payment',
            ],
            [
                'name' => 'Pending',
            ],
            [
                'name' => 'Confirmed',
            ],
            [
                'name' => 'Processing',
            ],
            [
                'name' => 'Ready for Shipment',
            ],
            [
                'name' => 'Shipped',
            ],
            [
                'name' => 'In Transit',
            ],
            [
                'name' => 'Out for Delivery',
            ],
            [
                'name' => 'Delivered',
            ],
            [
                'name' => 'Failed Delivery',
            ],
            [
                'name' => 'Completed',
            ],
            [
                'name' => 'Returned',
            ],
            [
                'name' => 'Cancelled',
            ],
        ]);
    }
}
