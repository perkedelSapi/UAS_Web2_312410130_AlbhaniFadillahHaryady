<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\PeminjamanModel;
use App\Models\BukuModel;

class Peminjaman extends ResourceController
{
    use ResponseTrait;

    public function index()
    {
        $model = new PeminjamanModel();
        $data['peminjaman'] = $model->getPeminjamanDenganRelasi();
        return $this->respond($data);
    }

    // tambah data peminjaman, otomatis mengurangi stok buku terkait
    public function create()
    {
        $model     = new PeminjamanModel();
        $bukuModel = new BukuModel();
        $json      = $this->request->getJSON(true) ?? [];

        $buku_id = $json['buku_id'] ?? $this->request->getVar('buku_id');
        $buku    = $bukuModel->where('id', $buku_id)->first();

        if (!$buku || $buku['stok'] < 1) {
            $response = [
                'status'   => 400,
                'error'    => 400,
                'messages' => ['error' => 'Stok buku habis atau buku tidak ditemukan.']
            ];
            return $this->fail($response, 400);
        }

        // kurangi stok buku
        $bukuModel->update($buku_id, ['stok' => $buku['stok'] - 1]);

        $data = [
            'anggota_id'     => $json['anggota_id']     ?? $this->request->getVar('anggota_id'),
            'buku_id'        => $buku_id,
            'tanggal_pinjam' => $json['tanggal_pinjam'] ?? $this->request->getVar('tanggal_pinjam'),
            'status'         => 'dipinjam',
        ];
        $model->insert($data);

        $response = [
            'status'   => 201,
            'error'    => null,
            'messages' => ['success' => 'Data peminjaman berhasil ditambahkan.']
        ];
        return $this->respondCreated($response);
    }

    public function show($id = null)
    {
        $model = new PeminjamanModel();
        $data = $model->where('id', $id)->first();
        if ($data) {
            return $this->respond($data);
        } else {
            return $this->failNotFound('Data tidak ditemukan.');
        }
    }

    // ubah status peminjaman, jika dikembalikan otomatis menambah stok buku
    public function update($id = null)
    {
        $model     = new PeminjamanModel();
        $bukuModel = new BukuModel();
        $json      = $this->request->getJSON(true) ?? [];

        $peminjaman = $model->where('id', $id)->first();
        if (!$peminjaman) {
            return $this->failNotFound('Data tidak ditemukan.');
        }

        $statusBaru = $json['status'] ?? $this->request->getVar('status');

        // jika status berubah jadi dikembalikan, tambahkan kembali stok buku
        if ($statusBaru === 'dikembalikan' && $peminjaman['status'] === 'dipinjam') {
            $buku = $bukuModel->where('id', $peminjaman['buku_id'])->first();
            $bukuModel->update($peminjaman['buku_id'], ['stok' => $buku['stok'] + 1]);
        }

        $data = [
            'status'          => $statusBaru,
            'tanggal_kembali' => $json['tanggal_kembali'] ?? $this->request->getVar('tanggal_kembali'),
        ];
        $model->update($id, $data);

        $response = [
            'status'   => 200,
            'error'    => null,
            'messages' => ['success' => 'Data peminjaman berhasil diubah.']
        ];
        return $this->respond($response);
    }

    public function delete($id = null)
    {
        $model = new PeminjamanModel();
        $data = $model->where('id', $id)->first();
        if ($data) {
            $model->delete($id);
            $response = [
                'status'   => 200,
                'error'    => null,
                'messages' => ['success' => 'Data peminjaman berhasil dihapus.']
            ];
            return $this->respondDeleted($response);
        } else {
            return $this->failNotFound('Data tidak ditemukan.');
        }
    }
}
