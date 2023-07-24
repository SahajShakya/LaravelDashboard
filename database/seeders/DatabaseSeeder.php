<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use http\Client\Curl\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        \App\Models\User::factory(50)->create();
//        $user = User::factory()->create([
//            'name'=>'Sahaj Shakya',
//            'email'=>'saz@sahaj.com'
//        ]);
//        User::factory(6)->create([
//            'user_id'=>$user->id
//        ]);
    }
}
