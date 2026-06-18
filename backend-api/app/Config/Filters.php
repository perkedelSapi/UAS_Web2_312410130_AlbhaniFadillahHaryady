<?php

namespace Config;

use CodeIgniter\Config\Filters as BaseFilters;
use CodeIgniter\Filters\CSRF;
use CodeIgniter\Filters\DebugToolbar;
use CodeIgniter\Filters\ForceHTTPS;
use CodeIgniter\Filters\Honeypot;
use CodeIgniter\Filters\InvalidChars;
use CodeIgniter\Filters\PageCache;
use CodeIgniter\Filters\PerformanceMetrics;
use CodeIgniter\Filters\SecureHeaders;
use App\Filters\ApiAuthFilter;
use App\Filters\CorsFilter;

class Filters extends BaseFilters
{
    // Daftar semua filter yang tersedia (sesuai Praktikum 14, langkah 1.2)
    public array $aliases = [
        'csrf'          => CSRF::class,
        'toolbar'       => DebugToolbar::class,
        'honeypot'      => Honeypot::class,
        'invalidchars'  => InvalidChars::class,
        'secureheaders' => SecureHeaders::class,
        'forcehttps'    => ForceHTTPS::class,
        'pagecache'     => PageCache::class,
        'performance'   => PerformanceMetrics::class,
        // Filter API custom
        'apiauth'       => ApiAuthFilter::class,
        'cors'          => CorsFilter::class,
    ];

    public array $required = [
        'before' => [
            'pagecache',
        ],
        'after' => [
            'pagecache',
            'performance',
            'toolbar',
        ],
    ];

    // CORS dijalankan secara global di semua request
    public array $globals = [
        'before' => [
            'cors',
        ],
        'after' => [],
    ];

    public array $methods = [];

    // Filter diterapkan langsung pada masing-masing route di Routes.php
    // (sesuai Praktikum 14, langkah 1.3) bukan di sini secara global,
    // supaya endpoint GET tetap bisa diakses publik tanpa token.
    public array $filters = [];
}
