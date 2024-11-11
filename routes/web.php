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
        $totalBiaya = ItemSpp::sum('biaya');
        $sudahBayar = Pembayaran::where('users_username', Auth::user()['username'])
            ->where('is_verified', true)
            ->sum('bayar');
        $sisaTagihan = $totalBiaya - $sudahBayar;

        return Inertia::render('Dashboard', [
            'totalBiaya' => $totalBiaya,
            'sudahBayar' => $sudahBayar,
            'sisaTagihan' => $sisaTagihan
        ]);
    })->name('dashboard');
    Route::get('/tagihan-spp', function () {
        $pembayaranUser = Pembayaran::query()->where('users_username', '=', Auth::user()['username'])->get();
        $itemSpp = ItemSpp::all();
        $totalBiaya = ItemSpp::sum('biaya');
        $sudahBayar = Pembayaran::where('users_username', Auth::user()['username'])
            ->where('is_verified', true)
            ->sum('bayar');
        $sisaTagihan = $totalBiaya - $sudahBayar;

        return Inertia::render('TagihanSpp', [
            'pembayaranUser' => $pembayaranUser,
            'itemSpp' => $itemSpp,
            'totalBiaya' => $totalBiaya,
            'sudahBayar' => $sudahBayar,
            'sisaTagihan' => $sisaTagihan,
        ]);
    })->name('tagihan-spp');
    Route::post('/tagihan-spp', function (Request $request) {
        $request->validate([
            'username' => 'required|exists:users,username',
            'kd_spp' => 'required|exists:item_spp,kd_spp',
            'bayar' => 'required|numeric|min:1',
            'bukti_bayar' => 'required|image|mimes:jpeg,png,jpg|max:2048' // validasi file bukti bayar
        ]);

        $username = $request->input('username');
        $kd_spp = $request->input('kd_spp');
        $bayar = $request->input('bayar');
        $bukti_bayar = $request->file('bukti_bayar');

        $namaFoto = $username . "-" . $kd_spp . "-" . rand(0, 99999) . '.' . 'jpg';
        $photoPath = $bukti_bayar->storePubliclyAs('pembayaran/img', $namaFoto, 'public');
        $photoUrl = Storage::url($photoPath);

        $itemSpp = ItemSpp::where('kd_spp', $kd_spp)->first();
        if (!$itemSpp) {
            return response(status: 404);
        }

        $pembayaran = Pembayaran::where('users_username', $username)
            ->where('item_spp_kd_spp', $kd_spp)
            ->first();

        $pembayaran ? $totalBayar = $pembayaran->bayar + $bayar : $totalBayar = $bayar;

        if ($totalBayar > $itemSpp->biaya) {
            return 0;
        }

        if ($pembayaran) {
            $pembayaran->bayar += $bayar;
            $pembayaran->sisa_bayar = $itemSpp->biaya - $pembayaran->bayar;
            $pembayaran->bukti_bayar = $photoUrl;

            if ($pembayaran->sisa_bayar <= 0) {
                $pembayaran->sisa_bayar = 0;
                $pembayaran->status_pembayaran = 'lunas';
            } else {
                $pembayaran->status_pembayaran = 'diangsur';
            }

            $pembayaran->save();
        } else {
            $sisa_bayar = $itemSpp->biaya - $bayar;
            $status_pembayaran = $sisa_bayar <= 0 ? 'lunas' : 'diangsur';

            Pembayaran::create([
                'users_username' => $username,
                'item_spp_kd_spp' => $kd_spp,
                'bayar' => $bayar,
                'biaya' => $itemSpp->biaya,
                'sisa_bayar' => $sisa_bayar,
                'bukti_bayar' => $photoUrl,
                'status_pembayaran' => $status_pembayaran,
                'is_verified' => false,
            ]);
        }

        return response(status: 200);
    })->name('tagihan-spp');
    Route::get('/data-pembayaran-siswa', function () {
        $pembayaranDetails = Pembayaran::query()->join('item_spp', 'pembayaran.item_spp_kd_spp', '=', 'item_spp.kd_spp')
            ->join('users', 'pembayaran.users_username', '=', 'users.username')
            ->select(
                'item_spp.nama_item',
                'users.name as user_name',
                'users.tahun_ajaran',
                'pembayaran.id as pembayaran_id',
                'pembayaran.biaya',
                'pembayaran.bayar',
                'pembayaran.sisa_bayar',
                'pembayaran.bukti_bayar',
                'pembayaran.status_pembayaran',
                'pembayaran.is_verified',
                'pembayaran.created_at'
            )
            ->get();
        return Inertia::render('DataPembayaranSiswa', [
            'pembayaranDetails' => $pembayaranDetails
        ]);
    })->name('data-pembayaran-siswa');
    Route::patch('/data-pembayaran-siswa', function (Request $request) {
        Pembayaran::query()->where('id', $request['pembayaran_id'])->update([
            'is_verified' => $request['is_verified']
        ]);
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
