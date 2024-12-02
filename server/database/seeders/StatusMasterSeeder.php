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
                'category' => 'PAYMENT',
                'name' => 'Awaiting Payment',
            ],
            [
                'category' => 'PROCESS',
                'name' => 'Pending',
            ],
            [
                'category' => 'PROCESS',
                'name' => 'Confirmed',
            ],
            [
                'category' => 'PROCESS',
                'name' => 'Processing',
            ],
            [
                'category' => 'SHIPMENT',
                'name' => 'Ready for Shipment',
            ],
            [
                'category' => 'SHIPMENT',
                'name' => 'Shipped',
            ],
            [
                'category' => 'SHIPMENT',
                'name' => 'In Transit',
            ],
            [
                'category' => 'SHIPMENT',
                'name' => 'Out for Delivery',
            ],
            [
                'category' => 'SHIPMENT',
                'name' => 'Delivered',
            ],
            [
                'category' => 'SHIPMENT',
                'name' => 'Received',
            ],
            [
                'category' => 'DONE',
                'name' => 'Completed',
            ],
            [
                'category' => 'DONE',
                'name' => 'Returned',
            ],
            [
                'category' => 'DONE',
                'name' => 'Canceled',
            ],
        ]);
    }
}
