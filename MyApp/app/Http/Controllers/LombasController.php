<?php

namespace App\Http\Controllers;

use App\Models\Lomba;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class LombasController extends Controller
{
    // GET: Menampilkan semua data lomba
    public function index()
    {
        $lombas = Lomba::all();

        $lombas->transform(function ($lomba) {
            $lomba->poster_lomba = url('storage/lomba_images/' . basename($lomba->poster_lomba));
            return $lomba;
        });

        return response()->json([
            'success' => true,
            'data' => $lombas,
        ], 200);
    }

    // GET: Statistik Pendaftaran Per Lomba
    public function statistik()
    {
        // Mengambil statistik jumlah pendaftar per lomba
        $statistik = Lomba::withCount('pendaftarans') // Menghitung relasi 'pendaftarans'
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

    // POST: Menambahkan data lomba baru
    public function store(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'poster_lomba' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'nama_lomba' => 'required|string|max:255',
            'institusi' => 'required|string|max:255',
            'akreditasi' => 'required|string|max:50',
            'jenis_institusi' => 'required|string|max:50',
            'lokasi' => 'required|string|max:100',
            'metode' => 'required|string|max:50',
            'tanggal_mulai_pendaftaran' => 'required|date',
            'tanggal_selesai_pendaftaran' => 'required|date',
            'status_pendaftaran' => 'required|string|max:50',
            'jumlah_orang_tim' => 'required|string|max:50',
            'total_hadiah' => 'required|numeric',
            'deskripsi' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi Gagal!',
                'errors' => $validator->errors()
            ], 422);
        }

        // Simpan gambar ke storage
        $imagePath = $request->file('poster_lomba')->store('lomba_images', 'public');

        // Buat data lomba baru
        $lomba = Lomba::create(array_merge(
            $request->except('poster_lomba'),
            ['poster_lomba' => $imagePath]
        ));

        $lomba->poster_lomba = url('storage/' . $lomba->poster_lomba);

        return response()->json([
            'success' => true,
            'message' => 'Lomba Berhasil Disimpan!',
            'data' => $lomba
        ], 201);
    }

    // GET: Menampilkan detail lomba berdasarkan ID
    public function show($id)
    {
        $lomba = Lomba::find($id);

        if (!$lomba) {
            return response()->json([
                'success' => false,
                'message' => 'Lomba Tidak Ditemukan!'
            ], 404);
        }

        $lomba->poster_lomba = url('storage/' . $lomba->poster_lomba);

        return response()->json([
            'success' => true,
            'message' => 'Detail Lomba!',
            'data' => $lomba
        ], 200);
    }

    // PUT: Mengupdate data lomba berdasarkan ID
    public function update(Request $request, $id)
    {
        $lomba = Lomba::find($id);

        if (!$lomba) {
            return response()->json([
                'success' => false,
                'message' => 'Lomba Tidak Ditemukan!'
            ], 404);
        }

        // Validasi input
        $validator = Validator::make($request->all(), [
            'poster_lomba' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'nama_lomba' => 'required|string|max:255',
            'institusi' => 'required|string|max:255',
            'akreditasi' => 'required|string|max:50',
            'jenis_institusi' => 'required|string|max:50',
            'lokasi' => 'required|string|max:100',
            'metode' => 'required|string|max:50',
            'tanggal_mulai_pendaftaran' => 'required|date',
            'tanggal_selesai_pendaftaran' => 'required|date',
            'status_pendaftaran' => 'required|string|max:50',
            'jumlah_orang_tim' => 'required|string|max:50',
            'total_hadiah' => 'required|numeric',
            'deskripsi' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi Gagal!',
                'errors' => $validator->errors()
            ], 422);
        }

        // Update gambar jika ada
        if ($request->hasFile('poster_lomba')) {
            // Hapus gambar lama
            Storage::disk('public')->delete($lomba->poster_lomba);

            // Simpan gambar baru
            $imagePath = $request->file('poster_lomba')->store('lomba_images', 'public');
            $lomba->poster_lomba = $imagePath;
        }

        // Update data lomba
        $lomba->update($request->except('poster_lomba'));

        $lomba->poster_lomba = url('storage/' . $lomba->poster_lomba);

        return response()->json([
            'success' => true,
            'message' => 'Lomba Berhasil Diupdate!',
            'data' => $lomba
        ], 200);
    }

    // DELETE: Menghapus data lomba berdasarkan ID
    public function destroy($id)
    {
        $lomba = Lomba::find($id);

        if (!$lomba) {
            return response()->json([
                'success' => false,
                'message' => 'Lomba Tidak Ditemukan!'
            ], 404);
        }

        // Hapus gambar terkait
        Storage::disk('public')->delete($lomba->poster_lomba);

        $lomba->delete();

        return response()->json([
            'success' => true,
            'message' => 'Lomba Berhasil Dihapus!'
        ], 200);
    }
}
