<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\UserModel;

class Auth extends ResourceController
{
    protected $format = 'json';

    // POST /api/login
    // Mengikuti pola Praktikum 13, disesuaikan untuk login berbasis email.
    // Catatan: frontend VueJS mengirim data sebagai JSON body (axios.post),
    // bukan form-urlencoded, sehingga getVar() perlu dibantu getJSON()
    // sebagai fallback agar data tetap terbaca dengan benar.
    public function login()
    {
        // 1. Menerima data input dari request body JSON
        $json = $this->request->getJSON(true);

        $email    = $json['email']    ?? $this->request->getVar('email');
        $password = $json['password'] ?? $this->request->getVar('password');

        // === DEBUG SEMENTARA - hapus setelah masalah selesai ===
        log_message('error', 'DEBUG LOGIN - raw body: ' . $this->request->getBody());
        log_message('error', 'DEBUG LOGIN - json decoded: ' . json_encode($json));
        log_message('error', 'DEBUG LOGIN - email: [' . $email . '] password: [' . $password . ']');
        // === END DEBUG ===

        $model = new UserModel();

        // 2. Cari user berdasarkan email di database
        $user = $model->where('useremail', $email)->first();

        if ($user) {
            // 3. Verifikasi password menggunakan password_verify
            if (password_verify($password, $user['userpassword'])) {

                // Jika sukses, kirim status data dan token respon
                return $this->respond([
                    'status'   => 200,
                    'error'    => null,
                    'messages' => 'Login Berhasil',
                    'data'     => [
                        'id'       => $user['id'],
                        'username' => $user['username'],
                        'email'    => $user['useremail'],
                        // Token sederhana berbasis base64 (sesuai Praktikum 13)
                        'token'    => base64_encode('TOKEN-SECRET-' . $user['username'] . '-' . $user['id']),
                    ],
                ], 200);
            }
        }

        // 4. Jika gagal, kirim status error 401 (Unauthorized)
        return $this->failUnauthorized('Email atau Password yang Anda masukkan salah.');
    }

    // POST /api/logout
    public function logout()
    {
        // Karena token bersifat stateless (tidak disimpan di DB),
        // proses logout cukup dilakukan di sisi client dengan menghapus
        // localStorage. Endpoint ini disediakan agar frontend tetap bisa
        // memanggil API logout secara konsisten.
        return $this->respond([
            'status'   => 200,
            'error'    => null,
            'messages' => 'Logout Berhasil',
        ]);
    }
}
