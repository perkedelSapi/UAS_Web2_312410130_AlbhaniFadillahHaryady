<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\KategoriModel;

class Kategori extends ResourceController
{
    use ResponseTrait;

    public function index()
    {
        $model = new KategoriModel();
        $data['kategori'] = $model->findAll();
        return $this->respond($data);
    }

    public function create()
    {
        $model = new KategoriModel();
        $json  = $this->request->getJSON(true) ?? [];
        $data = [
            'nama_kategori' => $json['nama_kategori'] ?? $this->request->getVar('nama_kategori'),
            'deskripsi'     => $json['deskripsi']     ?? $this->request->getVar('deskripsi'),
        ];
        $model->insert($data);
        $response = [
            'status'   => 201,
            'error'    => null,
            'messages' => ['success' => 'Data kategori berhasil ditambahkan.']
        ];
        return $this->respondCreated($response);
    }

    public function show($id = null)
    {
        $model = new KategoriModel();
        $data = $model->where('id', $id)->first();
        if ($data) {
            return $this->respond($data);
        } else {
            return $this->failNotFound('Data tidak ditemukan.');
        }
    }

    public function update($id = null)
    {
        $model = new KategoriModel();
        $json  = $this->request->getJSON(true) ?? [];
        $data = [
            'nama_kategori' => $json['nama_kategori'] ?? $this->request->getVar('nama_kategori'),
            'deskripsi'     => $json['deskripsi']     ?? $this->request->getVar('deskripsi'),
        ];
        $model->update($id, $data);
        $response = [
            'status'   => 200,
            'error'    => null,
            'messages' => ['success' => 'Data kategori berhasil diubah.']
        ];
        return $this->respond($response);
    }

    public function delete($id = null)
    {
        $model = new KategoriModel();
        $data = $model->where('id', $id)->first();
        if ($data) {
            $model->delete($id);
            $response = [
                'status'   => 200,
                'error'    => null,
                'messages' => ['success' => 'Data kategori berhasil dihapus.']
            ];
            return $this->respondDeleted($response);
        } else {
            return $this->failNotFound('Data tidak ditemukan.');
        }
    }
}
