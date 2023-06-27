-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 27, 2023 at 09:07 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reservation`
--

-- --------------------------------------------------------

--
-- Table structure for table `reservation_system`
--

CREATE TABLE `reservation_system` (
  `ticket_number` int(10) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Destination` varchar(255) NOT NULL DEFAULT 'chicago',
  `seat_number` int(36) NOT NULL,
  `date_time` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservation_system`
--

INSERT INTO `reservation_system` (`ticket_number`, `Name`, `Destination`, `seat_number`, `date_time`) VALUES
(1, 'Mounika', 'Bloominton', 2, '2023-06-28'),
(3, 'Raja', 'Chicago', 3, '2023-06-28'),
(8, 'Medarametla', 'newyork', 6, '2023-06-29'),
(9, 'Sathvik', 'peoria', 7, '2023-06-29'),
(10, 'mouni', 'chicago', 11, '2023-06-29'),
(11, 'Sathvik', 'peoria', 12, '2023-07-05'),
(12, 'Medarametla', 'peoria', 13, '2023-07-07'),
(13, 'Sathvik', 'peoria', 13, '2023-06-30'),
(14, 'Medarametla', 'peoria', 14, '2023-06-29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reservation_system`
--
ALTER TABLE `reservation_system`
  ADD PRIMARY KEY (`ticket_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reservation_system`
--
ALTER TABLE `reservation_system`
  MODIFY `ticket_number` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
