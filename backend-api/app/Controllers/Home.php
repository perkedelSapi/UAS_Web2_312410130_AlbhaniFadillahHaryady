<?php

namespace App\Controllers;

/**
 * Home Controller
 * Halaman default. Karena ini Decoupled Architecture (backend API only),
 * halaman ini cuma penanda kalau backend sudah jalan.
 * Frontend asli ada di folder frontend-spa/ (VueJS SPA).
 */
class Home extends BaseController
{
    public function index()
    {
        return $this->response->setJSON([
            'status'  => 200,
            'message' => 'E-Library Backend API aktif.',
            'info'    => 'Buka folder frontend-spa/index.html untuk mengakses aplikasi.',
        ]);
    }
}
