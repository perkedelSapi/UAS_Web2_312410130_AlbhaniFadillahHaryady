# DAFTAR PERUBAHAN — E-LIBRARY (SESUAI POLA MODUL PRAKTIKUM)

Project ini dibangun ulang dari kerangka lab11_ci.rar, dengan kode disesuaikan mengikuti pola dan gaya yang diajarkan di seluruh 14 modul praktikum Pemrograman Web 2 (bukan gaya OOP custom buatan sendiri). Tujuannya supaya kode terlihat konsisten dengan apa yang sudah dipelajari di kelas dan mudah dipertanggungjawabkan saat presentasi.

---

## Pola yang diikuti dari setiap praktikum

| Praktikum | Pola yang diterapkan ke E-Library |
|---|---|
| Praktikum 2 (CRUD) | Model sederhana: `$table`, `$primaryKey`, `$allowedFields` saja, tanpa method custom berlebihan |
| Praktikum 6 (Relasi & Query Builder) | Method `getBukuDenganKategori()` dan `getPeminjamanDenganRelasi()` memakai `$this->db->table()->select()->join()->get()->getResultArray()`, sama seperti `getArtikelDenganKategori()` |
| Praktikum 4 (Login) | `UserSeeder.php` memakai `password_hash()` dengan format insert yang sama persis |
| Praktikum 10 (API) | Semua Controller API meng-extend `ResourceController`, pakai `use ResponseTrait`, response memakai `respond()`, `respondCreated()`, `respondDeleted()`, `failNotFound()` |
| Praktikum 13 (Autentikasi SPA) | `Api/Auth.php` ditempatkan di sub-namespace `App\Controllers\Api`, method `login()` mengambil `getVar('email')` dan `getVar('password')`, mengembalikan token base64 sederhana |
| Praktikum 14 (Token & Interceptor) | `ApiAuthFilter.php` mengecek `getServer('HTTP_AUTHORIZATION')` dengan `preg_match('/Bearer\s(\S+)/')`, filter diterapkan langsung per-route di `Routes.php` (bukan global) sesuai langkah 1.3 modul |

---

## Struktur Controller API (folder app/Controllers/Api/)

Mengikuti pola Praktikum 13 yang menempatkan Auth di `App\Controllers\Api`, seluruh controller API E-Library ditempatkan di sub-namespace yang sama:

- `Api/Auth.php` — login (mengembalikan token) dan logout
- `Api/Buku.php` — CRUD buku, index memakai join ke kategori
- `Api/Kategori.php` — CRUD kategori
- `Api/Anggota.php` — CRUD anggota
- `Api/Peminjaman.php` — CRUD peminjaman, otomatis mengubah stok buku saat create/update
- `Api/Statistik.php` — endpoint publik untuk landing page

Setiap controller method create/update/delete mengikuti format response yang sama dengan `Post.php` di Praktikum 10:
```php
$response = [
    'status'   => 201,
    'error'    => null,
    'messages' => ['success' => '...']
];
```

---

## Token & Keamanan (mengikuti Praktikum 13 + 14)

Token tidak disimpan ke database (stateless), mengikuti contoh persis di Praktikum 13:
```php
'token' => base64_encode('TOKEN-SECRET-' . $user['username'] . '-' . $user['id'])
```

`ApiAuthFilter.php` memvalidasi format Bearer Token di header, sesuai Praktikum 14. Filter diterapkan langsung di setiap route POST/PUT/DELETE pada `Routes.php`, bukan didaftarkan global di `Config/Filters.php`, supaya endpoint GET tetap bisa diakses publik tanpa token (sesuai ketentuan soal UAS bagian User Matrix).

Kolom `token` pada tabel `user` di database masih ada tapi tidak dipakai lagi (sengaja dibiarkan supaya tidak perlu re-import database).

---

## Models (folder app/Models/)

Semua model dibuat sesederhana mungkin sesuai Praktikum 2 dan 4, hanya `UserModel`, `KategoriModel`, `AnggotaModel` yang benar-benar polos. `BukuModel` dan `PeminjamanModel` punya satu method tambahan untuk join, sama seperti contoh `getArtikelDenganKategori()` di Praktikum 6.

---

## Routes (Config/Routes.php)

Setiap endpoint didaftarkan satu per satu secara manual (bukan `$routes->resource()`), supaya filter `apiauth` bisa diterapkan spesifik hanya di method POST, PUT, DELETE — endpoint GET tetap terbuka untuk publik. Ini mengikuti contoh persis di Praktikum 14 langkah 1.3:
```php
$routes->post('post', 'Api\Post::create', ['filter' => 'apiauth']);
$routes->put('post/(:segment)', 'Api\Post::update/$1', ['filter' => 'apiauth']);
$routes->delete('post/(:segment)', 'Api\Post::delete/$1', ['filter' => 'apiauth']);
```

---

## CORS

Modul praktikum tidak membahas CORS secara eksplisit, tapi soal UAS mewajibkannya. CORS ditangani di `Config/Events.php` pada event `pre_system` (dijalankan paling awal sebelum routing), plus `CorsFilter.php` sebagai cadangan. Ini hasil penyesuaian dari masalah teknis yang ditemukan saat testing (preflight OPTIONS perlu direspons sebelum proses routing CI4 berjalan).

---

## Frontend (folder frontend-spa/)

Struktur komponen, Vue Router, dan Axios Interceptor tetap mengikuti pola Praktikum 11, 12, 13, 14 (Home.js, Login.js, komponen modular, `router.beforeEach()`, `meta: { requiresAuth: true }`, axios interceptors). Field response disesuaikan dengan struktur JSON baru dari controller (`messages`, dan key data sesuai nama tabel seperti `buku`, `kategori`, `anggota`, `peminjaman` bukan `data` generik).

---

## Login default

Email: `admin@email.com`
Password: `admin123`

(Sama seperti Praktikum 4, tidak berubah)
