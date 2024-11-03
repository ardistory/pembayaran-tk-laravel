<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $dataValidated = $request->validated();
        $namaFoto = $dataValidated['username'] . '.' . 'jpg';

        if ($request->hasFile('foto')) {
            $photoPath = $request->file('foto')->storePubliclyAs('assets/img', $namaFoto, 'public');
            $photoUrl = Storage::url($photoPath);

            $request->user()->fill([
                'nis' => $dataValidated['nis'],
                'username' => $dataValidated['username'],
                'no_telepon' => $dataValidated['no_telepon'],
                'foto' => $photoUrl ?? null
            ]);
        } else {
            $request->user()->fill([
                'nis' => $dataValidated['nis'],
                'username' => $dataValidated['username'],
                'no_telepon' => $dataValidated['no_telepon'],
            ]);
        }

        $request->user()->save();

        return Redirect::route('dashboard');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
