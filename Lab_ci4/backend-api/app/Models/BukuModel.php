<?php

namespace App\Models;

use CodeIgniter\Model;

class BukuModel extends Model
{
    protected $table            = 'buku';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $allowedFields    = ['judul', 'penulis', 'penerbit', 'tahun_terbit', 'stok', 'kategori_id'];

    // Mengambil data buku beserta nama kategorinya menggunakan join
    // (mengikuti pola getArtikelDenganKategori() pada Praktikum 6)
    public function getBukuDenganKategori()
    {
        return $this->db->table('buku')
                    ->select('buku.*, kategori.nama_kategori')
                    ->join('kategori', 'kategori.id = buku.kategori_id')
                    ->get()
                    ->getResultArray();
    }
}
