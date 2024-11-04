<?php

use App\Http\Controllers\ProfileController;
use App\Http\Requests\SiswaUpdateRequest;
use App\Models\ItemSpp;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
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
    Route::get('/data-pengguna', function () {
        return Inertia::render('DataPengguna');
    })->name('data-pengguna');
    Route::get('/data-siswa', function () {
        return Inertia::render('DataSiswa', [
            'dataSiswa' => User::query()->where('is_siswa', '=', 1)->get()
        ]);
    })->name('data-siswa');
    Route::post('/data-siswa', function (SiswaUpdateRequest $request) {
        $dataValidated = $request->validated();
        $namaFoto = $dataValidated['username'] . '.' . 'jpg';
        $user = User::where('username', $dataValidated['username'])->first();

        if ($request->hasFile('foto')) {
            $photoPath = $request->file('foto')->storePubliclyAs('assets/img', $namaFoto, 'public');
            $photoUrl = Storage::url($photoPath);

            $user->nis = $dataValidated['nis'];
            $user->name = $dataValidated['name'];
            $user->foto = $photoUrl ?? null;
            $user->tahun_ajaran = $dataValidated['tahun_ajaran'];
            $user->jenis_kelamin = $dataValidated['jenis_kelamin'];
            $user->kelas = $dataValidated['kelas'];
            $user->tanggal_lahir = $dataValidated['tanggal_lahir'];
            $user->alamat = $dataValidated['alamat'];
            $user->no_telepon = $dataValidated['no_telepon'];
            $user->created_at = Carbon::parse($dataValidated['created_at'])->addDay();
        } else {
            $user->nis = $dataValidated['nis'];
            $user->name = $dataValidated['name'];
            $user->tahun_ajaran = $dataValidated['tahun_ajaran'];
            $user->jenis_kelamin = $dataValidated['jenis_kelamin'];
            $user->kelas = $dataValidated['kelas'];
            $user->tanggal_lahir = $dataValidated['tanggal_lahir'];
            $user->alamat = $dataValidated['alamat'];
            $user->no_telepon = $dataValidated['no_telepon'];
            $user->created_at = Carbon::parse($dataValidated['created_at'])->addDay();
        }

        $user->save();
    })->name('data-siswa');
    Route::get('/data-item-spp', function () {
        return Inertia::render('DataItemSpp', [
            'itemSpp' => ItemSpp::all()
        ]);
    })->name('data-item-spp');
    Route::patch('/data-item-spp', function (Request $request) {
        $itemSpp = ItemSpp::find($request['kd_spp']);
        $itemSpp->tahun_ajaran = $request['tahun_ajaran'];
        $itemSpp->biaya = $request['biaya'];
        $itemSpp->status = $request['status'] == '1' ? 1 : 0;
        $itemSpp->save();
    })->name('data-item-spp');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
});

require __DIR__ . '/auth.php';
