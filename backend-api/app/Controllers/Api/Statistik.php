<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\BukuModel;
use App\Models\KategoriModel;
use App\Models\AnggotaModel;
use App\Models\PeminjamanModel;

class Statistik extends ResourceController
{
    use ResponseTrait;

    // endpoint publik untuk ringkasan data pada halaman beranda
    public function index()
    {
        $bukuModel       = new BukuModel();
        $kategoriModel   = new KategoriModel();
        $anggotaModel    = new AnggotaModel();
        $peminjamanModel = new PeminjamanModel();

        $data = [
            'total_buku'         => count($bukuModel->findAll()),
            'total_anggota'      => count($anggotaModel->findAll()),
            'total_kategori'     => count($kategoriModel->findAll()),
            'sedang_dipinjam'    => count($peminjamanModel->where('status', 'dipinjam')->findAll()),
            'sudah_dikembalikan' => count($peminjamanModel->where('status', 'dikembalikan')->findAll()),
        ];

        return $this->respond($data);
    }
}
