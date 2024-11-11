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
        Schema::create('pembayaran', function (Blueprint $table) {
            $table->id();
            $table->string('users_username');
            $table->string('item_spp_kd_spp');
            $table->bigInteger('biaya');
            $table->bigInteger('bayar');
            $table->bigInteger('sisa_bayar');
            $table->string('bukti_bayar');
            $table->string('status_pembayaran');
            $table->boolean('is_verified');
            $table->timestamps();

            $table->foreign('users_username')->on('users')->references('username')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembayaran');
    }
};
