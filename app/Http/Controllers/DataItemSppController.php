<?php

namespace App\Http\Controllers;

use App\Models\ItemSpp;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataItemSppController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('DataItemSpp', [
            'itemSpp' => ItemSpp::all()
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
    public function edit(Request $request)
    {
        $itemSpp = ItemSpp::find($request['kd_spp']);
        $itemSpp->tahun_ajaran = $request['tahun_ajaran'];
        $itemSpp->biaya = $request['biaya'];
        $itemSpp->status = $request['status'] == '1' ? 1 : 0;
        $itemSpp->save();
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
