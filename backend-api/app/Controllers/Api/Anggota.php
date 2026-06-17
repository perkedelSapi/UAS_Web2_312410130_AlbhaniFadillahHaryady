<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\AnggotaModel;

class Anggota extends ResourceController
{
    use ResponseTrait;

    public function index()
    {
        $model = new AnggotaModel();
        $data['anggota'] = $model->findAll();
        return $this->respond($data);
    }

    public function create()
    {
        $model = new AnggotaModel();
        $json  = $this->request->getJSON(true) ?? [];
        $data = [
            'nama'    => $json['nama']    ?? $this->request->getVar('nama'),
            'email'   => $json['email']   ?? $this->request->getVar('email'),
            'telepon' => $json['telepon'] ?? $this->request->getVar('telepon'),
            'alamat'  => $json['alamat']  ?? $this->request->getVar('alamat'),
        ];
        $model->insert($data);
        $response = [
            'status'   => 201,
            'error'    => null,
            'messages' => ['success' => 'Data anggota berhasil ditambahkan.']
        ];
        return $this->respondCreated($response);
    }

    public function show($id = null)
    {
        $model = new AnggotaModel();
        $data = $model->where('id', $id)->first();
        if ($data) {
            return $this->respond($data);
        } else {
            return $this->failNotFound('Data tidak ditemukan.');
        }
    }

    public function update($id = null)
    {
        $model = new AnggotaModel();
        $json  = $this->request->getJSON(true) ?? [];
        $data = [
            'nama'    => $json['nama']    ?? $this->request->getVar('nama'),
            'email'   => $json['email']   ?? $this->request->getVar('email'),
            'telepon' => $json['telepon'] ?? $this->request->getVar('telepon'),
            'alamat'  => $json['alamat']  ?? $this->request->getVar('alamat'),
        ];
        $model->update($id, $data);
        $response = [
            'status'   => 200,
            'error'    => null,
            'messages' => ['success' => 'Data anggota berhasil diubah.']
        ];
        return $this->respond($response);
    }

    public function delete($id = null)
    {
        $model = new AnggotaModel();
        $data = $model->where('id', $id)->first();
        if ($data) {
            $model->delete($id);
            $response = [
                'status'   => 200,
                'error'    => null,
                'messages' => ['success' => 'Data anggota berhasil dihapus.']
            ];
            return $this->respondDeleted($response);
        } else {
            return $this->failNotFound('Data tidak ditemukan.');
        }
    }
}
