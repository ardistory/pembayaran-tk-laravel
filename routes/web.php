<?php

use App\Http\Controllers\ProfileController;
use App\Http\Requests\DataPenggunaAddRequest;
use App\Http\Requests\DataPenggunaRequest;
use App\Http\Requests\SiswaUpdateRequest;
use App\Models\ItemSpp;
use App\Models\Pembayaran;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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
    Route::get('/tagihan-spp', function () {
        $pembayaranUser = Pembayaran::query()->where('users_username', '=', Auth::user()['username'])->get();
        $itemSpp = ItemSpp::all();

        return Inertia::render('TagihanSpp', [
            'pembayaranUser' => $pembayaranUser,
            'itemSpp' => $itemSpp
        ]);
    })->name('tagihan-spp');
    Route::post('/tagihan-spp', function (Request $request) {
        $namaFoto = $request['username'] . "-" . $request['kd_spp'] . "-" . rand(0, 99999) . '.' . 'jpg';
        $photoPath = $request->file('bukti_bayar')->storePubliclyAs('pembayaran/img', $namaFoto, 'public');
        $photoUrl = Storage::url($photoPath);

        $itemSpp = ItemSpp::query()->where('kd_spp', '=', $request['kd_spp'])->first();
        $biaya = $itemSpp['biaya'];

        $sisaBayar = ($biaya - $request['bayar'] === 0) ? 0 : $biaya - $request['bayar'];

        Pembayaran::create([
            'users_username' => $request['username'],
            'item_spp_kd_spp' => $request['kd_spp'],
            'bayar' => $request['bayar'],
            'biaya' => $biaya,
            'sisa_bayar' => $sisaBayar,
            'bukti_bayar' => $photoUrl,
            'status_pembayaran' => ($sisaBayar === 0) ? 'lunas' : 'diangsur',
            'is_verified' => false,
        ]);
    })->name('tagihan-spp');
    Route::get('/data-pembayaran-siswa', function () {
        return Inertia::render('DataPembayaranSiswa');
    })->name('data-pembayaran-siswa');
    Route::get('/data-pengguna', function () {
        return Inertia::render('DataPengguna', [
            'dataPengguna' => User::all()
        ]);
    })->name('data-pengguna');
    Route::delete('/data-pengguna', function (Request $request) {
        User::query()->where('id', '=', $request['id'])->delete();
    })->name('data-pengguna');
    Route::patch('/data-pengguna', function (DataPenggunaAddRequest $request) {
        $dataValidated = $request->validated();

        User::create([
            'nis' => $dataValidated['nis'] ?? '',
            'name' => $dataValidated['name'],
            'username' => $dataValidated['username'],
            'password' => Hash::make($dataValidated['password']),
            'is_admin' => $dataValidated['is_admin'],
            'is_siswa' => !$dataValidated['is_admin'],
            'is_verified' => $dataValidated['is_admin'],
        ]);
    })->name('data-pengguna');
    Route::post('/data-pengguna', function (DataPenggunaRequest $request) {
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
            $user->is_verified = $dataValidated['is_verified'];
            $user->no_telepon = $dataValidated['no_telepon'];
            $user->tanggal_masuk = $dataValidated['tanggal_masuk'];
        } else {
            $user->nis = $dataValidated['nis'];
            $user->name = $dataValidated['name'];
            $user->tahun_ajaran = $dataValidated['tahun_ajaran'];
            $user->jenis_kelamin = $dataValidated['jenis_kelamin'];
            $user->kelas = $dataValidated['kelas'];
            $user->tanggal_lahir = $dataValidated['tanggal_lahir'];
            $user->alamat = $dataValidated['alamat'];
            $user->is_verified = $dataValidated['is_verified'];
            $user->no_telepon = $dataValidated['no_telepon'];
            $user->tanggal_masuk = $dataValidated['tanggal_masuk'];
        }

        $user->save();
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
            $user->tanggal_masuk = $dataValidated['tanggal_masuk'];
        } else {
            $user->nis = $dataValidated['nis'];
            $user->name = $dataValidated['name'];
            $user->tahun_ajaran = $dataValidated['tahun_ajaran'];
            $user->jenis_kelamin = $dataValidated['jenis_kelamin'];
            $user->kelas = $dataValidated['kelas'];
            $user->tanggal_lahir = $dataValidated['tanggal_lahir'];
            $user->alamat = $dataValidated['alamat'];
            $user->no_telepon = $dataValidated['no_telepon'];
            $user->tanggal_masuk = $dataValidated['tanggal_masuk'];
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
