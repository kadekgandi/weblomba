<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('lombas', function (Blueprint $table) {
        $table->bigIncrements('id');
        $table->string('poster_lomba'); // Menyimpan URL atau path gambar
        $table->string('nama_lomba');  // Nama lomba
        $table->string('institusi');   // Nama institusi penyelenggara
        $table->string('akreditasi');  // Akreditasi institusi
        $table->string('jenis_institusi'); // Negeri atau swasta
        $table->string('lokasi');      // Lokasi pelaksanaan
        $table->string('metode');      // Metode (Hybrid, Offline, Online)
        $table->date('tanggal_mulai_pendaftaran'); // Tanggal mulai pendaftaran
        $table->date('tanggal_selesai_pendaftaran'); // Tanggal selesai pendaftaran
        $table->string('status_pendaftaran'); // Status pendaftaran (Dibuka/Ditutup)
        $table->string('jumlah_orang_tim'); // Jumlah anggota tim
        $table->bigInteger('total_hadiah'); // Total hadiah
        $table->text('deskripsi');    // Deskripsi lomba
        $table->timestamps();         // Timestamps untuk created_at dan updated_at
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lombas');
    }
};
