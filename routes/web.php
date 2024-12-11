<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DataItemSppController;
use App\Http\Controllers\DataPembayaranSiswaController;
use App\Http\Controllers\DataPenggunaController;
use App\Http\Controllers\DataSiswaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TagihanSppController;
use App\Http\Middleware\OnlyAdminMiddleware;
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
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/tagihan-spp', [TagihanSppController::class, 'index'])->name('tagihan-spp');
    Route::post('/tagihan-spp', [TagihanSppController::class, 'store'])->name('tagihan-spp');
});

Route::middleware(['auth', 'verified', OnlyAdminMiddleware::class])->group(function () {
    Route::get('/data-pembayaran-siswa', [DataPembayaranSiswaController::class, 'index'])->name('data-pembayaran-siswa');
    Route::patch('/data-pembayaran-siswa', [DataPembayaranSiswaController::class, 'update'])->name('data-pembayaran-siswa');
    Route::get('/data-pengguna', [DataPenggunaController::class, 'index'])->name('data-pengguna');
    Route::delete('/data-pengguna', [DataPenggunaController::class, 'destroy'])->name('data-pengguna');
    Route::patch('/data-pengguna', [DataPenggunaController::class, 'edit'])->name('data-pengguna');
    Route::post('/data-pengguna', [DataPenggunaController::class, 'store'])->name('data-pengguna');
    Route::get('/data-siswa', [DataSiswaController::class, 'index'])->name('data-siswa');
    Route::post('/data-siswa', [DataSiswaController::class, 'store'])->name('data-siswa');
    Route::get('/data-item-spp', [DataItemSppController::class, 'index'])->name('data-item-spp');
    Route::patch('/data-item-spp', [DataItemSppController::class, 'edit'])->name('data-item-spp');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
});

require __DIR__ . '/auth.php';
