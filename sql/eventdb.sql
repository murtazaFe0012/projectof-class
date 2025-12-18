-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 16, 2025 at 03:55 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `adresses`
--

DROP TABLE IF EXISTS `adresses`;
CREATE TABLE IF NOT EXISTS `adresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `street` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postalCode` int DEFAULT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `adresses`
--

INSERT INTO `adresses` (`id`, `street`, `city`, `postalCode`, `country`, `longitude`, `latitude`) VALUES
(1, '12 Rue de la Musique', 'La Rochelle', 17000, 'France', -1.1615, 46.1591),
(2, '5 Avenue des Technologies', 'La Rochelle', 17000, 'France', -1.155, 46.163),
(3, '20 Boulevard des Arts', 'La Rochelle', 17000, 'France', -1.1525, 46.1605),
(4, 'Parc du Marathon', 'La Rochelle', 17000, 'France', -1.164, 46.162),
(5, 'Centre Scientifique Jeunesse', 'La Rochelle', 17000, 'France', -1.158, 46.1615);

-- --------------------------------------------------------

--
-- Table structure for table `categorys`
--

DROP TABLE IF EXISTS `categorys`;
CREATE TABLE IF NOT EXISTS `categorys` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categorys`
--

INSERT INTO `categorys` (`id`, `name`) VALUES
(1, 'Musique'),
(2, 'Technologie'),
(3, 'Art et Culture'),
(4, 'Sport'),
(5, 'Science et Éducation'),
(6, 'Théâtre'),
(7, 'Conférence'),
(8, 'Cuisine'),
(9, 'Atelier'),
(10, 'Autre');


-- --------------------------------------------------------

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `dateStart` datetime DEFAULT NULL,
  `dateEnd` datetime DEFAULT NULL,
  `adresseID` int DEFAULT NULL,
  `orgranisatorID` int DEFAULT NULL,
  `categoryID` int DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `prix` float NOT NULL DEFAULT '0',
  `availablePlaces` int DEFAULT NULL,
  `maxPlaces` int DEFAULT NULL,
  `image` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `validation` tinyint(1) NOT NULL DEFAULT '0',
  `slug` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `events_adresse` (`adresseID`),
  KEY `events_category` (`categoryID`),
  KEY `events_organisator` (`orgranisatorID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `updateAt`, `dateStart`, `dateEnd`, `adresseID`, `orgranisatorID`, `categoryID`, `description`, `prix`, `availablePlaces`, `maxPlaces`, `image`, `validation`, `slug`) VALUES
(1, 'Festival de musique d’été', '2025-12-16 16:55:23', '2025-07-10 18:00:00', '2025-07-10 23:30:00', 1, 2, 3, 'Un festival en plein air avec des artistes locaux et internationaux dans une ambiance festive.', 25, 150, 200, 'festival_ete.jpg', 1, 'festival-musique-ete'),
(2, 'Conférence technologie et innovation', '2025-12-16 16:55:23', '2025-09-15 09:00:00', '2025-09-17 17:00:00', 2, 1, 1, 'Une conférence dédiée au développement web, à l’intelligence artificielle et aux nouvelles technologies.', 120, 80, 100, 'conference_tech.png', 1, 'conference-technologie-innovation'),
(3, 'Exposition art et dégustation de vins', '2025-12-16 16:55:23', '2025-06-20 14:00:00', '2025-06-20 22:00:00', 3, 3, 4, 'Découvrez des œuvres d’art contemporain tout en dégustant des vins locaux de la région.', 15, 40, 50, 'expo_art_vin.jpg', 0, 'exposition-art-vin'),
(4, 'Marathon de La Rochelle', '2025-12-16 16:55:23', '2025-10-05 07:00:00', '2025-10-05 14:00:00', 4, 4, 2, 'Le marathon annuel de la ville, ouvert aux coureurs amateurs et professionnels.', 30, 300, 500, 'marathon_larochelle.jpg', 1, 'marathon-la-rochelle'),
(5, 'Atelier scientifique pour enfants', '2025-12-16 16:55:23', '2025-05-12 10:00:00', '2025-05-12 13:00:00', 5, 2, 5, 'Des activités scientifiques ludiques et éducatives pour les enfants de 6 à 12 ans.', 10, 18, 20, 'atelier_science_enfants.png', 0, 'atelier-scientifique-enfants');

-- --------------------------------------------------------

--
-- Table structure for table `organisators`
--

DROP TABLE IF EXISTS `organisators`;
CREATE TABLE IF NOT EXISTS `organisators` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `siret` int DEFAULT NULL,
  `nbEvent` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `organisators_users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `organisators`
--

INSERT INTO `organisators` (`id`, `userID`, `name`, `siret`, `nbEvent`) VALUES
(1, 2, 'Tech Innovation SAS', 2147483647, 3),
(2, 3, 'Galerie Art & Vin', 2147483647, 2);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'organisator'),
(2, 'admin'),
(3, 'guest');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Fname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Lname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `pp` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `roleID` int DEFAULT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_roles` (`roleID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `Fname`, `Lname`, `mail`, `tel`, `password`, `birthday`, `pp`, `roleID`, `country`) VALUES
(1, 'Alice', 'Dupont', 'alice.dupont@example.com', '0601020304', 'password123', '1990-05-12', 'alice.jpg', 3, 'France'),
(2, 'Julien', 'Martin', 'julien.martin@example.com', '0602030405', 'password456', '1985-11-23', 'julien.jpg', 1, 'France'),
(3, 'Sophie', 'Lefebvre', 'sophie.lefebvre@example.com', '0603040506', 'password789', '1995-03-18', 'sophie.png', 1, 'France'),
(4, 'Lucas', 'Moreau', 'lucas.moreau@example.com', '0604050607', 'mypassword', '1988-08-05', 'lucas.jpg', 2, 'France'),
(5, 'Camille', 'Roux', 'camille.roux@example.com', '0605060708', 'securepass', '1992-12-30', 'camille.png', 3, 'France');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_adresse` FOREIGN KEY (`adresseID`) REFERENCES `adresses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `events_category` FOREIGN KEY (`categoryID`) REFERENCES `categorys` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `events_organisator` FOREIGN KEY (`orgranisatorID`) REFERENCES `organisators` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `organisators`
--
ALTER TABLE `organisators`
  ADD CONSTRAINT `organisators_users` FOREIGN KEY (`userID`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_roles` FOREIGN KEY (`roleID`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
