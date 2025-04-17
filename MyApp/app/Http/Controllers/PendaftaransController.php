<?php

namespace App\Http\Controllers;

use App\Models\Pendaftaran;
use App\Models\Lomba;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class PendaftaransController extends Controller
{
    public function index()
    {
        $pendaftaran = Pendaftaran::with('lomba')->get();

        return response()->json([
            'success' => true,
            'data' => $pendaftaran
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_lengkap' => 'required|string|max:255',
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required|string',
            'nama_institusi' => 'required|string|max:255',
            'lomba_id' => 'required|exists:lombas,id',
            'bukti_pembayaran' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $buktiPath = $request->file('bukti_pembayaran') ? $request->file('bukti_pembayaran')->store('bukti_pembayaran', 'public') : null;

        $pendaftaran = Pendaftaran::create(array_merge(
            $request->except('bukti_pembayaran'),
            ['bukti_pembayaran' => $buktiPath]
        ));

        return response()->json([
            'success' => true,
            'data' => $pendaftaran
        ], 201);
    }

    public function show($id)
    {
        $pendaftaran = Pendaftaran::with('lomba')->find($id);

        if (!$pendaftaran) {
            return response()->json([
                'success' => false,
                'message' => 'Pendaftaran Tidak Ditemukan!'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $pendaftaran
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $pendaftaran = Pendaftaran::find($id);

        if (!$pendaftaran) {
            return response()->json([
                'success' => false,
                'message' => 'Pendaftaran Tidak Ditemukan!'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'nama_lengkap' => 'required|string|max:255',
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required|string',
            'nama_institusi' => 'required|string|max:255',
            'lomba_id' => 'required|exists:lombas,id',
            'bukti_pembayaran' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        if ($request->hasFile('bukti_pembayaran')) {
            // Hapus bukti pembayaran lama jika ada
            if ($pendaftaran->bukti_pembayaran) {
                Storage::disk('public')->delete($pendaftaran->bukti_pembayaran);
            }
            $buktiPath = $request->file('bukti_pembayaran')->store('bukti_pembayaran', 'public');
            $pendaftaran->bukti_pembayaran = $buktiPath;
        }

        $pendaftaran->update($request->except('bukti_pembayaran'));

        return response()->json([
            'success' => true,
            'data' => $pendaftaran
        ], 200);
    }

    public function destroy($id)
    {
        $pendaftaran = Pendaftaran::find($id);

        if (!$pendaftaran) {
            return response()->json([
                'success' => false,
                'message' => 'Pendaftaran Tidak Ditemukan!'
            ], 404);
        }

        // Hapus bukti pembayaran jika ada
        if ($pendaftaran->bukti_pembayaran) {
            Storage::disk('public')->delete($pendaftaran->bukti_pembayaran);
        }
        $pendaftaran->delete();

        return response()->json([
            'success' => true,
            'message' => 'Pendaftaran Berhasil Dihapus!'
        ], 200);
    }

    public function statistik()
    {
        // Ambil statistik jumlah pendaftar berdasarkan lomba
        $statistik = Lomba::withCount('pendaftarans') // Menggunakan relasi 'pendaftarans'
            ->get()
            ->map(function ($lomba) {
                return [
                    'id_lomba' => $lomba->id,
                    'nama_lomba' => $lomba->nama_lomba,
                    'total_pendaftar' => $lomba->pendaftarans_count,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $statistik,
        ], 200);
    }
}