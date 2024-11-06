<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DataPenggunaRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'nis' => ['string', 'max:255'],
            'name' => ['string', 'max:255'],
            'username' => ['string'],
            'foto' => ['nullable'],
            'tahun_ajaran' => ['string', 'nullable'],
            'jenis_kelamin' => ['string', 'nullable'],
            'kelas' => ['string', 'nullable'],
            'tanggal_lahir' => ['string', 'nullable'],
            'alamat' => ['string', 'nullable'],
            'is_verified' => ['boolean'],
            'no_telepon' => ['string', 'max:255', 'nullable'],
            'created_at' => ['date', 'nullable'],
        ];
    }
}