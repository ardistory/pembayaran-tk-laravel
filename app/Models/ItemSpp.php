<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ItemSpp extends Model
{
    protected $table = 'item_spp';
    protected $primaryKey = 'kd_spp';
    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps = true;
    protected $guarded = [];
}
