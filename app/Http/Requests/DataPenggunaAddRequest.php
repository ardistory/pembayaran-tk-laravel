<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DataPenggunaAddRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nis' => ['nullable'],
            'name' => ['string'],
            'username' => ['string'],
            'password' => ['string'],
            'is_admin' => ['boolean'],
        ];
    }
}
