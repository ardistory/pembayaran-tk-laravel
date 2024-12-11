<?php

namespace App\Http\Controllers;

use App\Http\Requests\SiswaUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DataSiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('DataSiswa', [
            'dataSiswa' => User::query()->where('is_siswa', '=', 1)->get()
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
    public function store(SiswaUpdateRequest $request)
    {
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
