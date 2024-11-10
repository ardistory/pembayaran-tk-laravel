<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SiswaUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'nis' => ['nullable'],
            'name' => ['string', 'max:255'],
            'username' => ['string'],
            'foto' => ['nullable'],
            'tahun_ajaran' => ['string', 'nullable'],
            'jenis_kelamin' => ['string', 'nullable'],
            'kelas' => ['string', 'nullable'],
            'tanggal_lahir' => ['string', 'nullable'],
            'alamat' => ['string', 'nullable'],
            'no_telepon' => ['string', 'max:255', 'nullable'],
            'tanggal_masuk' => ['string', 'nullable'],
        ];
    }
}
