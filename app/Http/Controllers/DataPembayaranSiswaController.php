<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataPembayaranSiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pembayaranDetails = Pembayaran::query()->join('item_spp', 'pembayaran.item_spp_kd_spp', '=', 'item_spp.kd_spp')
            ->join('users', 'pembayaran.users_username', '=', 'users.username')
            ->select(
                'item_spp.nama_item',
                'users.name as user_name',
                'users.tahun_ajaran',
                'users.nis',
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
        if (!$request['is_rejected']) {
            Pembayaran::query()->where('id', $request['pembayaran_id'])->update([
                'is_verified' => $request['is_verified']
            ]);
        } else {
            Pembayaran::query()->where('id', $request['pembayaran_id'])->update([
                'status_pembayaran' => 'ditolak'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
