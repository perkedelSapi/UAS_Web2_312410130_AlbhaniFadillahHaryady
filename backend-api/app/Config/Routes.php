<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

// ==========================================================
// DEFAULT - cek backend hidup
// ==========================================================
$routes->get('/', 'Home::index');

// ==========================================================
// API ROUTES - RESTful (Decoupled Architecture E-Library)
// Mengikuti pola Praktikum 10 (Resource Controller) dan
// Praktikum 14 (filter apiauth per method untuk proteksi token)
// ==========================================================

// Auth - tidak butuh token
$routes->post('api/login',  'Api\Auth::login');
$routes->post('api/logout', 'Api\Auth::logout');

// Statistik publik - tidak butuh token
$routes->get('api/statistik', 'Api\Statistik::index');

// --- Buku ---
$routes->get('api/buku',           'Api\Buku::index');
$routes->get('api/buku/(:segment)', 'Api\Buku::show/$1');
$routes->post('api/buku',          'Api\Buku::create', ['filter' => 'apiauth']);
$routes->put('api/buku/(:segment)', 'Api\Buku::update/$1', ['filter' => 'apiauth']);
$routes->delete('api/buku/(:segment)', 'Api\Buku::delete/$1', ['filter' => 'apiauth']);

// --- Kategori ---
$routes->get('api/kategori',           'Api\Kategori::index');
$routes->get('api/kategori/(:segment)', 'Api\Kategori::show/$1');
$routes->post('api/kategori',          'Api\Kategori::create', ['filter' => 'apiauth']);
$routes->put('api/kategori/(:segment)', 'Api\Kategori::update/$1', ['filter' => 'apiauth']);
$routes->delete('api/kategori/(:segment)', 'Api\Kategori::delete/$1', ['filter' => 'apiauth']);

// --- Anggota ---
$routes->get('api/anggota',           'Api\Anggota::index');
$routes->get('api/anggota/(:segment)', 'Api\Anggota::show/$1');
$routes->post('api/anggota',          'Api\Anggota::create', ['filter' => 'apiauth']);
$routes->put('api/anggota/(:segment)', 'Api\Anggota::update/$1', ['filter' => 'apiauth']);
$routes->delete('api/anggota/(:segment)', 'Api\Anggota::delete/$1', ['filter' => 'apiauth']);

// --- Peminjaman ---
$routes->get('api/peminjaman',           'Api\Peminjaman::index');
$routes->get('api/peminjaman/(:segment)', 'Api\Peminjaman::show/$1');
$routes->post('api/peminjaman',          'Api\Peminjaman::create', ['filter' => 'apiauth']);
$routes->put('api/peminjaman/(:segment)', 'Api\Peminjaman::update/$1', ['filter' => 'apiauth']);
$routes->delete('api/peminjaman/(:segment)', 'Api\Peminjaman::delete/$1', ['filter' => 'apiauth']);
