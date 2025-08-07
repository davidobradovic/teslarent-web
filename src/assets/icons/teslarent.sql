-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 24, 2024 at 04:49 PM
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
-- Database: `teslarent`
--

-- --------------------------------------------------------

--
-- Table structure for table `Payments`
--

CREATE TABLE `Payments` (
  `id` bigint(20) NOT NULL,
  `reservation_id` bigint(20) NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` enum('Stripe','Apple Pay') DEFAULT NULL,
  `payment_date` datetime DEFAULT NULL,
  `payment_status` enum('Success','Failed') DEFAULT 'Success'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Reservations`
--

CREATE TABLE `Reservations` (
  `id` bigint(20) NOT NULL,
  `vehicle_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `duration` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `status` enum('success','failed','waiting') DEFAULT 'waiting',
  `reservation_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Reservations`
--

INSERT INTO `Reservations` (`id`, `vehicle_id`, `user_id`, `duration`, `price`, `start_time`, `end_time`, `status`, `reservation_image`) VALUES
(51278, 1, 1, 6, 36000.00, '2024-12-14 18:07:16', '2024-12-20 17:59:25', 'waiting', ''),
(51279, 1, 2, 7, 42000.00, '2024-12-14 18:17:58', '2024-12-21 18:17:58', 'success', '/images/1734297339106-816582931.png'),
(51289, 1, 2, 26, 156000.00, '2024-12-15 21:46:44', '2025-01-10 21:46:44', 'waiting', NULL),
(51290, 1, 2, 26, 156000.00, '2024-12-15 21:46:44', '2025-01-10 21:46:44', 'success', '/images/1734390035198-130627467.jpg'),
(51291, 1, 2, 26, 156000.00, '2024-12-15 21:46:44', '2025-01-10 21:46:44', 'waiting', NULL),
(51292, 1, 2, 26, 156000.00, '2024-12-15 21:46:44', '2025-01-10 21:46:44', 'waiting', NULL),
(51293, 1, 2, 6, 36000.00, '2025-01-19 07:00:00', '2025-01-25 07:00:00', 'waiting', NULL),
(51295, 1, 2, 5, 30000.00, '2025-03-28 07:00:00', '2025-04-02 06:00:00', 'waiting', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` bigint(20) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_front_image` varchar(255) DEFAULT NULL,
  `id_back_image` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT 'user',
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `full_name`, `email`, `phone`, `password`, `id_front_image`, `id_back_image`, `role`, `created_at`) VALUES
(1, 'John Doe', 'johndoe@example.com', '+1234567890', 'hashed_password_123', 'path/to/front_image.jpg', 'path/to/back_image.jpg', 'user', '2024-12-09 16:17:51'),
(2, 'David Obradovic', 'davidobr003@gmail.com', '+38766415295', '$2b$10$svMMI6RKlijD0IpG5ExVyu9H1Xy3bdD9haFfqj5UsLE3bUwh1x8hO', NULL, NULL, 'administrator', '2024-12-14 11:55:13');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` bigint(20) NOT NULL,
  `vehicle_name` varchar(255) NOT NULL,
  `banner_image` varchar(255) DEFAULT NULL,
  `price_per_day` decimal(10,2) NOT NULL,
  `tesla_code` varchar(255) NOT NULL,
  `battery_capacity_kwh` int(11) DEFAULT NULL,
  `range_km` int(11) DEFAULT NULL,
  `acceleration_0_100` decimal(5,2) DEFAULT NULL,
  `top_speed_kmh` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `vehicle_name`, `banner_image`, `price_per_day`, `tesla_code`, `battery_capacity_kwh`, `range_km`, `acceleration_0_100`, `top_speed_kmh`, `description`, `created_at`) VALUES
(1, 'Tesla Model 3', 'https://res.cloudinary.com/dxo3z5off/image/upload/f_auto,q_auto/v1/teslarent/sucf1er9ybnmr4yuqzwj', 6000.00, 'TESLA123', 100, 600, 2.50, 250, 'Tesla Model S is a luxury electric sedan.', '2024-12-09 16:18:00');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_images`
--

CREATE TABLE `vehicle_images` (
  `id` bigint(20) NOT NULL,
  `vehicle_id` bigint(20) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `text` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Payments`
--
ALTER TABLE `Payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `transaction_id` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_2` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_3` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_4` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_5` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_6` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_7` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_8` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_9` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_10` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_11` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_12` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_13` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_14` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_15` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_16` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_17` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_18` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_19` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_20` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_21` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_22` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_23` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_24` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_25` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_26` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_27` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_28` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_29` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_30` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_31` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_32` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_33` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_34` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_35` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_36` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_37` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_38` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_39` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_40` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_41` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_42` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_43` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_44` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_45` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_46` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_47` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_48` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_49` (`transaction_id`),
  ADD UNIQUE KEY `transaction_id_50` (`transaction_id`),
  ADD KEY `reservation_id` (`reservation_id`);

--
-- Indexes for table `Reservations`
--
ALTER TABLE `Reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicle_id` (`vehicle_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `phone_2` (`phone`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `phone_3` (`phone`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `phone_4` (`phone`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `phone_5` (`phone`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `phone_6` (`phone`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `phone_7` (`phone`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `phone_8` (`phone`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `phone_9` (`phone`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `phone_10` (`phone`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `phone_11` (`phone`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `phone_12` (`phone`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `phone_13` (`phone`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `phone_14` (`phone`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `phone_15` (`phone`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `phone_16` (`phone`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `phone_17` (`phone`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `phone_18` (`phone`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `phone_19` (`phone`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `phone_20` (`phone`),
  ADD UNIQUE KEY `email_32` (`email`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `phone_21` (`phone`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `phone_22` (`phone`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `phone_23` (`phone`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `phone_24` (`phone`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `phone_25` (`phone`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `phone_26` (`phone`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `phone_27` (`phone`),
  ADD UNIQUE KEY `email_28` (`email`),
  ADD UNIQUE KEY `phone_28` (`phone`),
  ADD UNIQUE KEY `email_29` (`email`),
  ADD UNIQUE KEY `phone_29` (`phone`),
  ADD UNIQUE KEY `email_30` (`email`),
  ADD UNIQUE KEY `phone_30` (`phone`),
  ADD UNIQUE KEY `email_31` (`email`),
  ADD UNIQUE KEY `phone_31` (`phone`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tesla_code` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_2` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_3` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_4` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_5` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_6` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_7` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_8` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_9` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_10` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_11` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_12` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_13` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_14` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_15` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_16` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_17` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_18` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_19` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_20` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_21` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_22` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_23` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_24` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_25` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_26` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_27` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_28` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_29` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_30` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_31` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_32` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_33` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_34` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_35` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_36` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_37` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_38` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_39` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_40` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_41` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_42` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_43` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_44` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_45` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_46` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_47` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_48` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_49` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_50` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_51` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_52` (`tesla_code`),
  ADD UNIQUE KEY `tesla_code_53` (`tesla_code`);

--
-- Indexes for table `vehicle_images`
--
ALTER TABLE `vehicle_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicle_id` (`vehicle_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Payments`
--
ALTER TABLE `Payments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Reservations`
--
ALTER TABLE `Reservations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51296;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `vehicle_images`
--
ALTER TABLE `vehicle_images`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Payments`
--
ALTER TABLE `Payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`reservation_id`) REFERENCES `Reservations` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `Reservations`
--
ALTER TABLE `Reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservations_ibfk_61` FOREIGN KEY (`vehicle_id`) REFERENCES `Vehicles` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `reservations_ibfk_62` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `vehicle_images`
--
ALTER TABLE `vehicle_images`
  ADD CONSTRAINT `vehicle_images_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
