<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class, // Parent table first
            CartSeeder::class, // Parent table first
            PaymentMethodCategorySeeder::class, // Child table next
            PaymentMethodSeeder::class, // Child table next
            ShippingSeeder::class,
            ShippingVariantSeeder::class,
            StatusMasterSeeder::class
        ]);
    }
}
