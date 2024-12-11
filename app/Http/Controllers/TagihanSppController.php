<?php

namespace App\Http\Controllers;

use App\Models\ItemSpp;
use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TagihanSppController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pembayaranUser = Pembayaran::query()->where('users_username', '=', Auth::user()['username'])->get();
        $itemSpp = ItemSpp::query()->where('status', true)->get();
        $totalBiaya = ItemSpp::where('status', true)->sum('biaya');
        $sudahBayar = Pembayaran::where('users_username', Auth::user()['username'])
            ->where('is_verified', true)
            ->sum('bayar');
        $sisaTagihan = $totalBiaya - $sudahBayar;
        $itemSppDetails = ItemSpp::where('status', 1)->with([
            'pembayaran' => function ($query) {
                $query->where('users_username', Auth::user()['username']);
            }
        ])->get();

        $pembayaranDetails = $itemSppDetails->map(function ($itemSpp) {
            return [
                'nama_item' => $itemSpp->nama_item,
                'biaya' => $itemSpp->biaya,
                'pembayaran' => $itemSpp->pembayaran->map(function ($pembayaran) {
                    return [
                        'biaya' => $pembayaran->biaya,
                        'bayar' => $pembayaran->bayar,
                        'sisa_bayar' => $pembayaran->sisa_bayar,
                        'bukti_bayar' => $pembayaran->bukti_bayar,
                        'status_pembayaran' => $pembayaran->status_pembayaran,
                        'is_verified' => $pembayaran->is_verified,
                        'created_at' => $pembayaran->created_at,
                    ];
                })
            ];
        });

        $riwayatPembayaranSaya = Pembayaran::join('item_spp', 'pembayaran.item_spp_kd_spp', '=', 'item_spp.kd_spp')
            ->select(
                'item_spp.nama_item',
                'pembayaran.biaya',
                'pembayaran.bayar',
                'pembayaran.bukti_bayar',
                'pembayaran.status_pembayaran',
                'pembayaran.created_at',
            )
            ->where('pembayaran.users_username', Auth::user()['username'])
            ->get();

        return Inertia::render('TagihanSpp', [
            'pembayaranUser' => $pembayaranUser,
            'itemSpp' => $itemSpp,
            'totalBiaya' => $totalBiaya,
            'sudahBayar' => $sudahBayar,
            'sisaTagihan' => $sisaTagihan,
            'pembayaranDetails' => $pembayaranDetails,
            'riwayatPembayaranSaya' => $riwayatPembayaranSaya,
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
        $request->validate([
            'username' => 'required|exists:users,username',
            'kd_spp' => 'required|exists:item_spp,kd_spp',
            'bayar' => 'required|numeric|min:1',
            'bukti_bayar' => 'required|image|mimes:jpeg,png,jpg|max:2048'
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
            $pembayaran->is_verified = 0;

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
