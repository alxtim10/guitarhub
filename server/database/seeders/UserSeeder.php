<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'fullname' => 'Jaden Brooke',
                'email' => 'alxtim@gmail.com',
                'password' => Hash::make('123'),
                'phone' => '08111520628',
                'address' => 'Kuningan, Jakarta Selatan',
            ],
            [
                'fullname' => 'Dale Cooper',
                'email' => 'dale@gmail.com',
                'password' => Hash::make('123'),
                'phone' => '08111520628',
                'address' => 'Cipete, Jakarta Selatan',
            ],
        ]);
    }
}
