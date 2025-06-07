-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th6 07, 2025 lúc 05:25 PM
-- Phiên bản máy phục vụ: 8.0.31
-- Phiên bản PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `btl`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bo_tu_vung`
--

DROP TABLE IF EXISTS `bo_tu_vung`;
CREATE TABLE IF NOT EXISTS `bo_tu_vung` (
  `id_btv` int NOT NULL AUTO_INCREMENT,
  `name_btv` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id_btv`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `bo_tu_vung`
--

INSERT INTO `bo_tu_vung` (`id_btv`, `name_btv`, `user_id`) VALUES
(1, 'Gia đình', 1),
(2, 'Thức ăn', 1),
(3, 'Địa lý', 1),
(4, 'Du lịch', 1),
(5, 'Giao tiếp', 1),
(7, 'Thời tiết', 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `trac_nghiem`
--

DROP TABLE IF EXISTS `trac_nghiem`;
CREATE TABLE IF NOT EXISTS `trac_nghiem` (
  `id_btn` int NOT NULL AUTO_INCREMENT,
  `id_btv` int NOT NULL,
  `user_id` int NOT NULL,
  `ket_qua` int NOT NULL,
  PRIMARY KEY (`id_btn`),
  KEY `id_btv` (`id_btv`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `trac_nghiem`
--

INSERT INTO `trac_nghiem` (`id_btn`, `id_btv`, `user_id`, `ket_qua`) VALUES
(1, 2, 1, 100),
(2, 2, 1, 80),
(3, 2, 1, 90),
(8, 5, 1, 100),
(9, 1, 1, 100),
(10, 1, 1, 0),
(11, 1, 1, 100),
(12, 1, 1, 100),
(13, 1, 1, 100),
(14, 1, 1, 100),
(15, 1, 1, 100),
(16, 1, 1, 100),
(17, 1, 1, 100),
(18, 1, 1, 100),
(19, 1, 1, 100),
(20, 1, 1, 100),
(21, 1, 1, 100),
(22, 5, 1, 100),
(23, 1, 1, 100),
(24, 1, 1, 100),
(25, 2, 1, 100),
(26, 1, 1, 100),
(27, 2, 1, 100),
(28, 2, 2, 100),
(29, 5, 2, 100),
(30, 1, 2, 100),
(31, 1, 2, 100),
(32, 1, 2, 0),
(33, 5, 2, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tu_vung`
--

DROP TABLE IF EXISTS `tu_vung`;
CREATE TABLE IF NOT EXISTS `tu_vung` (
  `id_tv` int NOT NULL AUTO_INCREMENT,
  `tu_TA` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `nghia_TV` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `id_btv` int NOT NULL,
  PRIMARY KEY (`id_tv`),
  KEY `id_btv` (`id_btv`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tu_vung`
--

INSERT INTO `tu_vung` (`id_tv`, `tu_TA`, `nghia_TV`, `id_btv`) VALUES
(1, 'father', 'bố', 1),
(2, 'mother', 'mẹ', 1),
(3, 'brother', 'anh trai', 1),
(4, 'sister', 'chị gái', 1),
(5, 'grandfather', 'ông', 1),
(6, 'grandmother', 'bà', 1),
(7, 'uncle', 'chú', 1),
(8, 'aunt', 'cô', 1),
(9, 'cousin', 'anh chị em họ', 1),
(10, 'apple', 'quả táo', 2),
(11, 'banana', 'chuối', 2),
(12, 'mango', 'xoài', 2),
(13, 'watermelon', 'dưa hấu', 2),
(14, 'grape', 'nho', 2),
(17, 'Hi', 'Chào', 5),
(18, 'Hello', 'Xin chào', 5),
(19, 'Fine', 'Khỏe', 5),
(31, 'sunny', 'nắng', 7),
(32, 'rainy', 'mưa', 7);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `username`, `password`) VALUES
(1, 'demo', '$2b$10$F7CPilIfkkn9L7bRKRarhOG4SF.Ucmbu96Bo6DeC6pLN6qnj30e/.'),
(2, '20231632', '$2b$10$F7CPilIfkkn9L7bRKRarhOG4SF.Ucmbu96Bo6DeC6pLN6qnj30e/.');

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `bo_tu_vung`
--
ALTER TABLE `bo_tu_vung`
  ADD CONSTRAINT `bo_tu_vung_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `trac_nghiem`
--
ALTER TABLE `trac_nghiem`
  ADD CONSTRAINT `trac_nghiem_ibfk_1` FOREIGN KEY (`id_btv`) REFERENCES `bo_tu_vung` (`id_btv`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `trac_nghiem_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `tu_vung`
--
ALTER TABLE `tu_vung`
  ADD CONSTRAINT `tu_vung_ibfk_1` FOREIGN KEY (`id_btv`) REFERENCES `bo_tu_vung` (`id_btv`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
