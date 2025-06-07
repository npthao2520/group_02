-- Tạo database nếu chưa có
CREATE DATABASE IF NOT EXISTS `btl` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- Dùng CSDL đó
USE `btl`;

-- Cấu hình chuẩn
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET COLLATION_CONNECTION = 'utf8mb4_general_ci';

-- Xoá bảng cũ (đúng thứ tự do liên kết khóa ngoại)
DROP TABLE IF EXISTS `trac_nghiem`;
DROP TABLE IF EXISTS `tu_vung`;
DROP TABLE IF EXISTS `bo_tu_vung`;
DROP TABLE IF EXISTS `user`;

-- Tạo bảng user
CREATE TABLE `user` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(128) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tạo bảng bo_tu_vung
CREATE TABLE `bo_tu_vung` (
  `id_btv` INT NOT NULL AUTO_INCREMENT,
  `name_btv` VARCHAR(255) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id_btv`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tạo bảng tu_vung
CREATE TABLE `tu_vung` (
  `id_tv` INT NOT NULL AUTO_INCREMENT,
  `tu_TA` VARCHAR(255) NOT NULL,
  `nghia_TV` VARCHAR(255) NOT NULL,
  `id_btv` INT NOT NULL,
  PRIMARY KEY (`id_tv`),
  FOREIGN KEY (`id_btv`) REFERENCES `bo_tu_vung`(`id_btv`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tạo bảng trac_nghiem
CREATE TABLE `trac_nghiem` (
  `id_btn` INT NOT NULL AUTO_INCREMENT,
  `id_btv` INT NOT NULL,
  `user_id` INT NOT NULL,
  `ket_qua` INT NOT NULL,
  PRIMARY KEY (`id_btn`),
  FOREIGN KEY (`id_btv`) REFERENCES `bo_tu_vung`(`id_btv`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Thêm user mẫu với password đã mã hóa (bcrypt)
INSERT INTO `user` (`username`, `password`)
VALUES ('demo', '$2b$10$exampleHashedPasswordHere');

-- Thêm các bộ từ vựng mẫu
INSERT INTO `bo_tu_vung` (`name_btv`, `user_id`) VALUES
('Gia đình', 1),
('Thức ăn', 1),
('Địa lý', 1),
('Du lịch', 1);

-- Thêm từ vựng cho "Gia đình" (id_btv = 1)
INSERT INTO `tu_vung` (`tu_TA`, `nghia_TV`, `id_btv`) VALUES
('father', 'bố', 1),
('mother', 'mẹ', 1),
('brother', 'anh trai', 1),
('sister', 'chị gái', 1),
('grandfather', 'ông', 1),
('grandmother', 'bà', 1),
('uncle', 'chú', 1),
('aunt', 'cô', 1),
('cousin', 'anh chị em họ', 1);

-- Thêm từ vựng cho "Thức ăn" (id_btv = 2)
INSERT INTO `tu_vung` (`tu_TA`, `nghia_TV`, `id_btv`) VALUES
('apple', 'quả táo', 2),
('banana', 'chuối', 2),
('mango', 'xoài', 2),
('watermelon', 'dưa hấu', 2),
('grape', 'nho', 2);

-- Trắc nghiệm mẫu cho user 1 với bộ 2
INSERT INTO `trac_nghiem` (`id_btv`, `user_id`, `ket_qua`) VALUES
(2, 1, 100),
(2, 1, 80),
(2, 1, 90);

COMMIT;
