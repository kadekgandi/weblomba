<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pendaftaran extends Model
{
    protected $table = 'pendaftarans';

    protected $fillable = [
        'nama_lengkap',
        'jenis_kelamin',
        'tanggal_lahir',
        'alamat',
        'nama_institusi',
        'lomba_id',
        'bukti_pembayaran',
    ];

    public function lomba()
    {
        return $this->belongsTo(Lomba::class);
    }
}
