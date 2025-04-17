<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lomba extends Model
{
    // Nama tabel di database
    protected $table = 'lombas';

    // Kolom yang bisa diisi (mass assignment)
    protected $fillable = [
        'poster_lomba', 
        'nama_lomba', 
        'institusi', 
        'akreditasi', 
        'jenis_institusi', 
        'lokasi', 
        'metode', 
        'tanggal_mulai_pendaftaran', 
        'tanggal_selesai_pendaftaran', 
        'status_pendaftaran', 
        'jumlah_orang_tim', 
        'total_hadiah', 
        'deskripsi'
    ];

    // Kolom yang didefinisikan sebagai tanggal
    protected $dates = [
        'tanggal_mulai_pendaftaran', 
        'tanggal_selesai_pendaftaran',
        'created_at', 
        'updated_at'
    ];

    public function pendaftarans()
{
    return $this->hasMany(Pendaftaran::class, 'lomba_id');
}

}
