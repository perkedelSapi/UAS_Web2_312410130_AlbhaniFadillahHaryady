<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\BukuModel;

class Buku extends ResourceController
{
    use ResponseTrait;

    // semua data buku beserta kategorinya
    public function index()
    {
        $model = new BukuModel();
        $data['buku'] = $model->getBukuDenganKategori();
        return $this->respond($data);
    }

    // tambah data buku
    // catatan: frontend mengirim data sebagai JSON body (axios.post),
    // sehingga perlu getJSON() sebagai sumber data utama
    public function create()
    {
        $model = new BukuModel();
        $json  = $this->request->getJSON(true) ?? [];
        $data = [
            'judul'        => $json['judul']        ?? $this->request->getVar('judul'),
            'penulis'      => $json['penulis']      ?? $this->request->getVar('penulis'),
            'penerbit'     => $json['penerbit']     ?? $this->request->getVar('penerbit'),
            'tahun_terbit' => $json['tahun_terbit'] ?? $this->request->getVar('tahun_terbit'),
            'stok'         => $json['stok']         ?? $this->request->getVar('stok'),
            'kategori_id'  => $json['kategori_id']  ?? $this->request->getVar('kategori_id'),
        ];
        $model->insert($data);
        $response = [
            'status'   => 201,
            'error'    => null,
            'messages' => [
                'success' => 'Data buku berhasil ditambahkan.'
            ]
        ];
        return $this->respondCreated($response);
    }

    // satu data buku spesifik
    public function show($id = null)
    {
        $model = new BukuModel();
        $data = $model->where('id', $id)->first();
        if ($data) {
            return $this->respond($data);
        } else {
            return $this->failNotFound('Data tidak ditemukan.');
        }
    }

    // ubah data buku
    public function update($id = null)
    {
        $model = new BukuModel();
        $json  = $this->request->getJSON(true) ?? [];
        $data = [
            'judul'        => $json['judul']        ?? $this->request->getVar('judul'),
            'penulis'      => $json['penulis']      ?? $this->request->getVar('penulis'),
            'penerbit'     => $json['penerbit']     ?? $this->request->getVar('penerbit'),
            'tahun_terbit' => $json['tahun_terbit'] ?? $this->request->getVar('tahun_terbit'),
            'stok'         => $json['stok']         ?? $this->request->getVar('stok'),
            'kategori_id'  => $json['kategori_id']  ?? $this->request->getVar('kategori_id'),
        ];
        $model->update($id, $data);
        $response = [
            'status'   => 200,
            'error'    => null,
            'messages' => [
                'success' => 'Data buku berhasil diubah.'
            ]
        ];
        return $this->respond($response);
    }

    // hapus data buku
    public function delete($id = null)
    {
        $model = new BukuModel();
        $data = $model->where('id', $id)->first();
        if ($data) {
            $model->delete($id);
            $response = [
                'status'   => 200,
                'error'    => null,
                'messages' => [
                    'success' => 'Data buku berhasil dihapus.'
                ]
            ];
            return $this->respondDeleted($response);
        } else {
            return $this->failNotFound('Data tidak ditemukan.');
        }
    }
}
