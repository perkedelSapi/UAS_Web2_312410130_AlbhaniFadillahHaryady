-- ============================================================
-- DATABASE: lab_ci4
-- Tema: E-Library (Sistem Informasi Rental Buku Digital)
-- Import file ini di phpMyAdmin -> selesai.
-- Login: admin@email.com / admin123
-- ============================================================

CREATE DATABASE IF NOT EXISTS `lab_ci4`
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `lab_ci4`;

-- ============================================================
-- TABEL: user (admin login)
-- ============================================================
DROP TABLE IF EXISTS `peminjaman`;
DROP TABLE IF EXISTS `buku`;
DROP TABLE IF EXISTS `kategori`;
DROP TABLE IF EXISTS `anggota`;
DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id`           INT AUTO_INCREMENT PRIMARY KEY,
  `username`     VARCHAR(100) NOT NULL,
  `useremail`    VARCHAR(100) NOT NULL UNIQUE,
  `userpassword` VARCHAR(255) NOT NULL,
  `token`        VARCHAR(255) DEFAULT NULL,
  `created_at`   DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at`   DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `user` (`username`, `useremail`, `userpassword`) VALUES
('admin', 'admin@email.com', '$2y$10$G/Nf4P2UIhc6Cry1xNMetervcvddEU//XRP.eCsemOzhEADIe1fH.');

-- ============================================================
-- TABEL: kategori
-- ============================================================
CREATE TABLE `kategori` (
  `id`            INT AUTO_INCREMENT PRIMARY KEY,
  `nama_kategori` VARCHAR(100) NOT NULL,
  `deskripsi`     TEXT,
  `created_at`    DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at`    DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `kategori` (`nama_kategori`, `deskripsi`) VALUES
('Novel', 'Karya fiksi panjang berbentuk prosa'),
('Komik', 'Cerita bergambar panel per panel'),
('Manga', 'Komik bergaya Jepang'),
('Non-Fiksi', 'Buku berdasarkan fakta dan kenyataan'),
('Sains Fiksi', 'Cerita bertemakan ilmu pengetahuan dan teknologi');

-- ============================================================
-- TABEL: buku
-- ============================================================
CREATE TABLE `buku` (
  `id`           INT AUTO_INCREMENT PRIMARY KEY,
  `judul`        VARCHAR(200) NOT NULL,
  `penulis`      VARCHAR(100) NOT NULL,
  `penerbit`     VARCHAR(100),
  `tahun_terbit` YEAR,
  `stok`         INT DEFAULT 1,
  `kategori_id`  INT NOT NULL,
  `cover_url`    VARCHAR(255) DEFAULT NULL,
  `created_at`   DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at`   DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`kategori_id`) REFERENCES `kategori`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `buku` (`judul`, `penulis`, `penerbit`, `tahun_terbit`, `stok`, `kategori_id`) VALUES
('Laskar Pelangi', 'Andrea Hirata', 'Bentang Pustaka', 2005, 3, 1),
('Bumi Manusia', 'Pramoedya Ananta Toer', 'Lentera Dipantara', 1980, 2, 1),
('One Piece Vol. 1', 'Eiichiro Oda', 'Elex Media', 1997, 5, 3),
('Naruto Vol. 1', 'Masashi Kishimoto', 'Elex Media', 1999, 4, 3),
('Sapiens', 'Yuval Noah Harari', 'KPG', 2011, 2, 4),
('Dune', 'Frank Herbert', 'Gramedia', 1965, 2, 5),
('Doraemon Vol. 1', 'Fujiko F. Fujio', 'Elex Media', 1969, 6, 2);

-- ============================================================
-- TABEL: anggota
-- ============================================================
CREATE TABLE `anggota` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `nama`       VARCHAR(100) NOT NULL,
  `email`      VARCHAR(100) NOT NULL UNIQUE,
  `telepon`    VARCHAR(20),
  `alamat`     TEXT,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `anggota` (`nama`, `email`, `telepon`, `alamat`) VALUES
('Budi Santoso', 'budi@gmail.com', '08123456789', 'Jl. Mawar No. 1, Jakarta'),
('Siti Rahayu', 'siti@gmail.com', '08234567890', 'Jl. Melati No. 2, Bandung'),
('Andi Pratama', 'andi@gmail.com', '08345678901', 'Jl. Kenanga No. 3, Surabaya');

-- ============================================================
-- TABEL: peminjaman
-- ============================================================
CREATE TABLE `peminjaman` (
  `id`              INT AUTO_INCREMENT PRIMARY KEY,
  `anggota_id`      INT NOT NULL,
  `buku_id`         INT NOT NULL,
  `tanggal_pinjam`  DATE NOT NULL,
  `tanggal_kembali` DATE,
  `status`          ENUM('dipinjam', 'dikembalikan') DEFAULT 'dipinjam',
  `created_at`      DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at`      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`anggota_id`) REFERENCES `anggota`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`buku_id`) REFERENCES `buku`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `peminjaman` (`anggota_id`, `buku_id`, `tanggal_pinjam`, `tanggal_kembali`, `status`) VALUES
(1, 1, '2025-06-01', NULL, 'dipinjam'),
(2, 3, '2025-06-05', '2025-06-12', 'dikembalikan'),
(3, 5, '2025-06-10', NULL, 'dipinjam');
