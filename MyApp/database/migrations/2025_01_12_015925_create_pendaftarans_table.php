<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePendaftaransTable extends Migration
{
    public function up()
    {
        Schema::create('pendaftarans', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nama_lengkap');
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan']);
            $table->date('tanggal_lahir');
            $table->text('alamat');
            $table->string('nama_institusi');
            $table->unsignedBigInteger('lomba_id');
            $table->string('bukti_pembayaran')->nullable();
            $table->timestamps();

            $table->foreign('lomba_id')->references('id')->on('lombas')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('pendaftarans');
    }
}