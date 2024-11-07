<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('item_spp', function (Blueprint $table) {
            $table->string('kd_spp')->primary();
            $table->string('nama_item')->index();
            $table->string('tahun_ajaran');
            $table->bigInteger('biaya');
            $table->boolean('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('item_spp');
    }
};
