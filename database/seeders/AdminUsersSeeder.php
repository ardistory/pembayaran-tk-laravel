<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'nis' => 'admin',
            'name' => 'Administrator',
            'username' => 'admin',
            'is_verified' => true,
            'is_admin' => true,
            'password' => Hash::make('123'),
        ]);
    }
}
