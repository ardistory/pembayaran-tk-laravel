<?php

namespace App\Http\Controllers;

use App\Models\ItemSpp;
use App\Models\Pembayaran;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $totalBiaya = ItemSpp::where('status', true)->sum('biaya');
        $sudahBayar = Pembayaran::where('users_username', Auth::user()['username'])
            ->where('is_verified', true)
            ->sum('bayar');
        $sisaTagihan = $totalBiaya - $sudahBayar;
        $totalSiswaAktif = User::query()->where('is_siswa', true)->get();
        $pembayaranDiValidasi = Pembayaran::query()->where('is_verified', true)->get();
        $pembayaranLunas = Pembayaran::query()->where('status_pembayaran', 'lunas')->get();
        $pembayaranMenunggak = Pembayaran::query()->where('status_pembayaran', 'diangsur')->get();
        $siswaLunas = Pembayaran::query()->select('users_username', DB::raw('COUNT(*) as total_lunas'))
            ->where('status_pembayaran', 'lunas')
            ->groupBy('users_username')
            ->get();
        $siswaMenunggak = Pembayaran::query()->select('users_username', DB::raw('COUNT(*) as total_menunggak'))
            ->where('status_pembayaran', '=', 'diangsur')
            ->groupBy('users_username')
            ->get();

        return Inertia::render('Dashboard', [
            'totalBiaya' => $totalBiaya,
            'sudahBayar' => $sudahBayar,
            'sisaTagihan' => $sisaTagihan,
            'totalSiswaAktif' => count($totalSiswaAktif),
            'pembayaranDiValidasi' => count($pembayaranDiValidasi),
            'pembayaranLunas' => count($pembayaranLunas),
            'pembayaranMenunggak' => count($pembayaranMenunggak),
            'siswaLunas' => count($siswaLunas),
            'siswaMenunggak' => count($siswaMenunggak),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
