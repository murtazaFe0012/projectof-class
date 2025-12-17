-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 17, 2025 at 08:58 AM
-- Server version: 8.4.7
-- PHP Version: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eventdb`

--
-- Dumping data for table `adresses`
--

INSERT INTO `adresses` (`id`, `street`, `city`, `postalCode`, `country`, `longitude`, `latitude`) VALUES
(1, '12 Rue de la Musique', 'La Rochelle', 17000, 'France', -1.1615, 46.1591),
(2, '5 Avenue des Technologies', 'La Rochelle', 17000, 'France', -1.155, 46.163),
(3, '20 Boulevard des Arts', 'La Rochelle', 17000, 'France', -1.1525, 46.1605),
(4, 'Parc du Marathon', 'La Rochelle', 17000, 'France', -1.164, 46.162),
(5, 'Centre Scientifique Jeunesse', 'La Rochelle', 17000, 'France', -1.158, 46.1615);

--
-- Dumping data for table `categorys`
--

INSERT INTO `categorys` (`id`, `name`) VALUES
(1, 'Musique'),
(2, 'Technologie'),
(3, 'Art et Vin'),
(4, 'Sport'),
(5, 'Science et Éducation');

--
-- Dumping data for table `organisators`
--

INSERT INTO `organisators` (`id`, `userID`, `name`, `siret`, `nbEvent`) VALUES
(1, 2, 'Tech Innovation SAS', 2147483647, 3),
(2, 3, 'Galerie Art & Vin', 2147483647, 2);

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'organisator'),
(2, 'admin'),
(3, 'guest');

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `Fname`, `Lname`, `mail`, `tel`, `password`, `birthday`, `pp`, `roleID`, `country`) VALUES
(1, 'Alice', 'Dupont', 'alice.dupont@example.com', '0601020304', 'password123', '1990-05-12', 'alice.jpg', 3, 'France'),
(2, 'Julien', 'Martin', 'julien.martin@example.com', '0602030405', 'password456', '1985-11-23', 'julien.jpg', 1, 'France'),
(3, 'Sophie', 'Lefebvre', 'sophie.lefebvre@example.com', '0603040506', 'password789', '1995-03-18', 'sophie.png', 1, 'France'),
(4, 'Lucas', 'Moreau', 'lucas.moreau@example.com', '0604050607', 'mypassword', '1988-08-05', 'lucas.jpg', 2, 'France'),
(5, 'Camille', 'Roux', 'camille.roux@example.com', '0605060708', 'securepass', '1992-12-30', 'camille.png', 3, 'France');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
