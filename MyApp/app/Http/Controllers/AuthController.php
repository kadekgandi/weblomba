<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validasi manual menggunakan Validator
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role' => 'required|in:user,admin,guru', // Validasi role
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Menetapkan nilai role, jika tidak dikirimkan oleh pengguna, akan default ke 'user'
        $role = $request->role ?: 'user';

        // Membuat user dengan role yang diberikan
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $role, // Menyimpan role yang dikirim
        ]);

        // Generate JWT token
        $token = JWTAuth::fromUser($user);

        return response()->json(compact('user', 'token'));
    }

    public function login(Request $request)
{
    $credentials = $request->only('email', 'password');
    
    // Verifikasi email dan password
    $user = User::where('email', $credentials['email'])->first();
    
    if ($user && Hash::check($credentials['password'], $user->password)) {
        // Jika password benar, generate token JWT
        $token = JWTAuth::fromUser($user);
        return response()->json(compact('user', 'token'));
    }

    return response()->json(['error' => 'Unauthorized'], 401);
}


public function logout(Request $request)
{
    try {
        // Ambil token dari header Authorization
        $token = $request->header('Authorization');
        
        // Pastikan token dalam format 'Bearer <token>'
        if (strpos($token, 'Bearer ') === false) {
            return response()->json(['error' => 'Token is invalid'], 401);
        }

        // Hapus 'Bearer ' dari token
        $token = str_replace('Bearer ', '', $token);

        // Invalidate token JWT
        JWTAuth::invalidate($token);

        return response()->json(['message' => 'Successfully logged out']);
    } catch (\Exception $e) {
        // Tangani error
        return response()->json(['error' => 'Failed to logout, please try again'], 500);
    }
}


}
