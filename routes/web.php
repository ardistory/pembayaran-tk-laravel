<?php

use App\Http\Controllers\ProfileController;
use App\Models\ItemSpp;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Beranda', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('beranda');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::get('/tagihan-ppdb', function () {
        return Inertia::render('TagihanPpdb');
    })->name('tagihan-ppdb');
    Route::get('/tagihan-spp', function () {
        return Inertia::render('TagihanSpp');
    })->name('tagihan-spp');
    Route::get('/data-pembayaran-siswa', function () {
        return Inertia::render('DataPembayaranSiswa');
    })->name('data-pembayaran-siswa');
    Route::get('/data-item-spp', function () {
        return Inertia::render('DataItemSpp', [
            'itemSpp' => ItemSpp::all()
        ]);
    })->name('data-item-spp');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
});

require __DIR__ . '/auth.php';
