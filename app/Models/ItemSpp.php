<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ItemSpp extends Model
{
    protected $table = 'item_spp';
    protected $primaryKey = 'kd_spp';
    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps = true;
    protected $guarded = [];

    public function pembayaran(): HasMany
    {
        return $this->hasMany(Pembayaran::class, 'item_spp_kd_spp', 'kd_spp');
    }
}
