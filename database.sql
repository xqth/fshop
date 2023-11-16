SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `total_price` double DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `total_price`, `created_at`, `updated_at`) VALUES
(1, 1, 0, '2023-11-16 00:05:33', '2023-11-16 01:11:38'),
(2, 2, 0, '2023-11-16 00:59:59', '2023-11-16 02:38:24'),
(3, 3, 0, '2023-11-16 01:32:49', '2023-11-16 01:43:03'),
(4, 4, 0, '2023-11-16 03:23:06', '2023-11-16 03:31:27');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int NOT NULL,
  `cart_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `title`, `slug`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Phones', 'phones', 'Stay connected with the latest smartphones and accessories.', '2023-11-08 21:38:04', '2023-11-09 01:53:58'),
(2, 'Computers', 'computers', 'Powerful desktop computers for home and office use.', '2023-11-08 22:06:24', '2023-11-09 01:54:07'),
(3, 'Laptops', 'laptops', 'Portable laptops for work and entertainment.', '2023-11-08 22:07:13', '2023-11-09 01:54:14'),
(4, 'Headphones', 'headphones', 'Enjoy high-quality audio with headphones.', '2023-11-09 01:55:01', '2023-11-09 01:55:01'),
(5, 'Camera & Photo', 'camera-and-photo', 'Capture memories with digital cameras and accessories.', '2023-11-09 01:55:22', '2023-11-09 01:55:22'),
(6, 'Accessories', 'accessories', 'Discover a wide range of cutting-edge accessories designed to complement and optimize your electric devices for a seamless and enhanced user experience.', '2023-11-09 01:56:55', '2023-11-09 01:56:55');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `total_price` double DEFAULT '0',
  `status` enum('pending','processing','completed','cancelled') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `paypal_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total_price`, `status`, `paypal_id`, `created_at`, `updated_at`) VALUES
(15, 2, 5843, 'completed', NULL, '2023-11-16 01:08:35', '2023-11-16 03:48:32'),
(16, 1, 5500, 'pending', NULL, '2023-11-16 01:11:38', '2023-11-16 01:11:38'),
(17, 3, 3079, 'pending', NULL, '2023-11-16 01:43:03', '2023-11-16 01:43:03'),
(18, 2, 2969, 'completed', 'PAYID-MVKYBIA90X6209430891273T', '2023-11-16 02:38:24', '2023-11-16 02:42:48'),
(19, 4, 1197, 'pending', NULL, '2023-11-16 03:31:04', '2023-11-16 03:31:04'),
(20, 4, 480, 'processing', 'PAYID-MVKY2DY5N048231FT801452C', '2023-11-16 03:31:27', '2023-11-16 03:34:14');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `created_at`, `updated_at`) VALUES
(15, 15, 4, 5, '2023-11-16 01:08:35', '2023-11-16 01:08:35'),
(16, 15, 5, 1, '2023-11-16 01:08:35', '2023-11-16 01:08:35'),
(17, 15, 3, 1, '2023-11-16 01:08:35', '2023-11-16 01:08:35'),
(18, 15, 2, 1, '2023-11-16 01:08:35', '2023-11-16 01:08:35'),
(19, 16, 1, 5, '2023-11-16 01:11:38', '2023-11-16 01:11:38'),
(20, 17, 4, 1, '2023-11-16 01:43:03', '2023-11-16 01:43:03'),
(21, 17, 3, 2, '2023-11-16 01:43:03', '2023-11-16 01:43:03'),
(22, 18, 3, 1, '2023-11-16 02:38:24', '2023-11-16 02:38:24'),
(23, 18, 2, 1, '2023-11-16 02:38:24', '2023-11-16 02:38:24'),
(24, 19, 10, 5, '2023-11-16 03:31:04', '2023-11-16 03:31:04'),
(25, 19, 7, 1, '2023-11-16 03:31:04', '2023-11-16 03:31:04'),
(26, 19, 8, 1, '2023-11-16 03:31:04', '2023-11-16 03:31:04'),
(27, 20, 10, 3, '2023-11-16 03:31:27', '2023-11-16 03:31:27');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `method` enum('cash','paypal') COLLATE utf8mb4_unicode_ci DEFAULT 'cash',
  `status` enum('unpaid','paid') COLLATE utf8mb4_unicode_ci DEFAULT 'unpaid',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `order_id`, `amount`, `method`, `status`, `created_at`, `updated_at`) VALUES
(15, 15, 5843, 'cash', 'unpaid', '2023-11-16 01:08:35', '2023-11-16 01:08:35'),
(16, 16, 5500, 'cash', 'unpaid', '2023-11-16 01:11:38', '2023-11-16 01:11:38'),
(17, 17, 3079, 'cash', 'unpaid', '2023-11-16 01:43:03', '2023-11-16 01:43:03'),
(18, 18, 2969, 'paypal', 'paid', '2023-11-16 02:38:24', '2023-11-16 02:42:00'),
(19, 19, 1197, 'cash', 'unpaid', '2023-11-16 03:31:04', '2023-11-16 03:31:04'),
(20, 20, 480, 'paypal', 'paid', '2023-11-16 03:31:27', '2023-11-16 03:34:14');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `brand` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(10,2) DEFAULT '0.00',
  `stock` int DEFAULT '0',
  `thumb` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `images` json DEFAULT NULL,
  `views` int DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `slug`, `category_id`, `description`, `brand`, `price`, `stock`, `thumb`, `images`, `views`, `created_at`, `updated_at`) VALUES
(1, 'iPhone 13 Mini, 512GB, Midnight', 'iphone-13-mini-512gb-midnight', 1, 'The iPhone 13 Mini is the smallest and lightest iPhone of the 13 series, but it\'s still packed with powerful features. It has a bright and durable Super Retina XDR display, a fast A15 Bionic chip, and a long-lasting battery. The 512GB storage capacity gives you plenty of room for photos, videos, apps, and games.', 'Apple', 1100.00, 1000, 'https://m.media-amazon.com/images/I/51nGxi-shlL._AC_SL1000_.jpg', '[\"https://m.media-amazon.com/images/I/41ObWQAe7-L._AC_SX679_.jpg\", \"https://m.media-amazon.com/images/I/51gSz-nvQKL._AC_SX679_.jpg\", \"https://m.media-amazon.com/images/I/617NQYpnBaL._AC_SX679_.jpg\"]', 43, '2023-11-08 22:28:26', '2023-11-16 02:15:54'),
(2, 'SAMSUNG Galaxy Z Fold 5, 512GB, Big 7.6” Screen', 'samsung-galaxy-z-fold-5-512gb-big-76-screen', 1, 'The Samsung Galaxy Z Fold 5 is the latest and greatest foldable smartphone from Samsung. It features a large 7.6-inch main display and a 6.2-inch cover display, both of which are AMOLED displays with 120Hz refresh rates. The phone is powered by the latest Snapdragon 8 Gen 2 processor and has 512GB of storage. It also has a triple-lens rear camera system with a 50MP main sensor, a 12MP ultrawide sensor, and a 10MP telephoto sensor. The front-facing camera is a 10MP sensor. The phone has a 4400mAh battery and supports 25W fast charging.', 'Samsung', 1669.00, 1000, 'https://m.media-amazon.com/images/I/61LyIe34PVL._AC_SL1500_.jpg', '[\"https://m.media-amazon.com/images/I/61dfQM7lwaL._AC_SL1500_.jpg\", \"https://m.media-amazon.com/images/I/61SfpB+BUWL._AC_SL1500_.jpg\", \"https://m.media-amazon.com/images/I/611jqZH8kzL._AC_SL1500_.jpg\"]', 9, '2023-11-09 02:37:11', '2023-11-15 19:22:15'),
(3, 'Apple 2023 MacBook Air Laptop with M2 chip: 15.3-inch Liquid Retina Display, 8GB Unified Memory, 256GB SSD', 'apple-2023-macbook-air-laptop-with-m2-chip-153-inch-liquid-retina-display-8gb-unified-memory-256gb-ssd', 3, 'The Apple 2023 MacBook Air is the latest and greatest ultraportable laptop from Apple. It features a new design, a powerful M2 chip, and a stunning Liquid Retina display. The new design of the MacBook Air is more streamlined and modern than the previous model. It has a thinner and lighter chassis, and it features a new Magic Keyboard with larger keys and a backlit keyboard. The M2 chip is the latest and greatest chip from Apple. It is based on the same 5nm architecture as the M1 chip, but it has a more powerful CPU and GPU. The M2 chip also features a new Neural Engine and Media Engine.', 'Apple', 1300.00, 1000, 'https://m.media-amazon.com/images/I/81UFHe-hH5L._AC_SL1500_.jpg', '[\"https://m.media-amazon.com/images/I/819oTthOTBL._AC_SL1500_.jpg\", \"https://m.media-amazon.com/images/I/91CoIWiGA6L._AC_SL1500_.jpg\"]', 11, '2023-11-09 04:38:15', '2023-11-15 19:58:15'),
(4, 'Canon EOS Rebel T7 DSLR Camera with 18-55mm Lens | Built-in Wi-Fi | 24.1 MP CMOS Sensor | DIGIC 4+ Image', 'canon-eos-rebel-t7-dslr-camera-with-18-55mm-lens-built-in-wi-fi-241-mp-cmos-sensor-digic-4-image', 5, 'The Canon EOS Rebel T7 is a great entry-level DSLR camera for beginners and hobbyists. It features a 24.1MP CMOS sensor, a DIGIC 4+ image processor, and a built-in Wi-Fi module. The T7 also comes with a standard 18-55mm lens, which is a good all-around lens for most types of photography. ', 'Sony', 479.00, 1000, 'https://m.media-amazon.com/images/I/71EWRyqzw0L._AC_SL1500_.jpg', '[\"https://m.media-amazon.com/images/I/717xSjyDRzL._AC_SL1500_.jpg\", \"https://m.media-amazon.com/images/I/713ShDiciHL._AC_SL1500_.jpg\"]', 62, '2023-11-09 06:38:23', '2023-11-16 01:09:58'),
(5, 'ASUS Vivobook 15X OLED Laptop, 15.6” FHD OLED Display, AMD Ryzen™ 7 7730U CPU, 16GB RAM, 1TB SSD', 'asus-vivobook-15x-oled-laptop-156-fhd-oled-display-amd-ryzentm-7-7730u-cpu-16gb-ram-1tb-ssd', 3, 'The ASUS Vivobook 15X OLED is a great all-around laptop for work, school, and entertainment. It features a stunning 15.6-inch OLED display with a high refresh rate, a powerful AMD Ryzen™ 7 7730U CPU, 16GB of RAM, and a 1TB SSD. The laptop also has a long battery life, so you can use it all day without having to worry about running out of power.', 'Asus', 479.00, 1000, 'https://m.media-amazon.com/images/I/71K65txwNfL._AC_SL1500_.jpg', '[\"https://m.media-amazon.com/images/I/51etn9ILnNL._AC_SL1500_.jpg\", \"https://m.media-amazon.com/images/I/71LBzB6NlyL._AC_SL1500_.jpg\"]', 10, '2023-11-09 06:40:48', '2023-11-16 01:09:07'),
(7, ' Sony WH-CH720N Noise Canceling Wireless Headphones Bluetooth Over The Ear Headset with Microphone and Alexa Built-in, Black New', 'sony-wh-ch720n-noise-canceling-wireless-headphones-bluetooth-over-the-ear-headset-with-microphone-and-alexa-built-in-black-new', 4, '- Sony’s lightest Wireless Noise-canceling headband ever. Specific uses for product: Entertainment.\r\n- Take noise canceling to the next level with Sony’s Integrated Processor V1, so you can fully immerse yourself in the music.\r\n- Super comfortable and lightweight design.\r\n- Adjustable Ambient Sound mode and Adaptive Sound control features tailors sound to suit the environment around you\r\n- Up to 35-hour battery life with quick charging (3 min charge for up to 1 hour of playback).\r\n- High sound quality and well-balanced sound tuning.\r\n- Crystal clear hands-free calling and voice assistant with Precise Voice Pickup technology.', 'Sony', 148.00, 1000, 'https://m.media-amazon.com/images/I/51rpbVmi9XL._AC_SL1200_.jpg', '[\"https://m.media-amazon.com/images/I/51zL2U+3bDL._AC_SL1200_.jpg\", \"https://m.media-amazon.com/images/I/41ynUUcntOL._AC_SL1200_.jpg\"]', 2, '2023-11-16 02:52:50', '2023-11-16 02:59:29'),
(8, 'Meta Quest 2 - Advanced All-In-One Virtual Reality Headset - 128 GB', 'meta-quest-2-advanced-all-in-one-virtual-reality-headset-128-gb', 6, '- Experience total immersion with 3D positional audio, hand tracking and easy-to-use controllers working together to make virtual worlds feel real.\r\n- Explore an expanding universe of over 500 titles across gaming, fitness, social/multiplayer and entertainment, including exclusive releases and totally unique VR experiences.\r\n- Enjoy fast, smooth gameplay and immersive graphics as high-speed action unfolds around you with a fast processor and immersive graphics.\r\nTravel universes in blockbuster fantasies, scare yourself witless in horror adventures or squad up with friends to save the universe.', 'Meta Quest', 249.00, 999, 'https://m.media-amazon.com/images/I/61tE7IcuLmL._AC_SL1500_.jpg', '[\"https://m.media-amazon.com/images/I/71Ff1TswKSL._AC_SL1500_.jpg\", \"https://m.media-amazon.com/images/I/71unPYTHa5L._AC_SL1500_.jpg\"]', 9, '2023-11-16 02:55:08', '2023-11-16 02:59:21'),
(9, 'GIGABYTE GeForce RTX 4060 Eagle OC 8G Graphics Card, 3X WINDFORCE Fans, 8GB 128-bit GDDR6, GV-N4060EAGLE OC-8GD Video Card', 'gigabyte-geforce-rtx-4060-eagle-oc-8g-graphics-card-3x-windforce-fans-8gb-128-bit-gddr6-gv-n4060eagle-oc-8gd-video-card', 2, '- Powered by NVIDIA DLSS 3, ultra-efficient Ada Lovelace architechture, and full ray tracing.\r\n- 4th Generation Tensor Cores: Up to 4x performance with DLSS 3.\r\n- 3rd Generation RT Cores: Up to 2x ray tracing performance.\r\n- Powered by GeForce RTX 4060.\r\n- Integrated with 8GB GDDR6 128-bit memory interface.\r\n- WINDFORCE Cooling System, Dual BIOS, Protection metal back plate.', 'Gigabyte', 304.99, 999, 'https://m.media-amazon.com/images/I/71g2Lc8urJL._AC_SL1500_.jpg', '[\"https://m.media-amazon.com/images/I/71tFWdGya1L._AC_SL1500_.jpg\", \"https://m.media-amazon.com/images/I/71-gZAQhMrL._AC_SL1500_.jpg\"]', 1, '2023-11-16 03:03:24', '2023-11-16 03:50:25'),
(10, 'AMD Ryzen 5 5600X 6-core, 12-Thread Unlocked Desktop Processor with Wraith Stealth Cooler', 'amd-ryzen-5-5600x-6-core-12-thread-unlocked-desktop-processor-with-wraith-stealth-cooler', 2, '- AMD\'s fastest 6 core processor for mainstream desktop, with 12 processing threads.\r\n- Can deliver elite 100 plus FPS performance in the world\'s most popular games.\r\n- Bundled with the quiet, capable AMD Wraith Stealth cooler.\r\n- System Memory Type: DDR4 4.6 GHz Max Boost, unlocked for overclocking, 35 MB of cache, DDR-3200 support.\r\n- For the advanced Socket AM4 platform, can support PCIe 4.0 on X570 and B550 motherboards.\r\n- OS Support: Windows 11 - 64-Bit Edition, Windows 10 - 64-Bit Edition, RHEL x86 64-Bit, Ubuntu x86 64-Bit.', 'AMD', 160.00, 999, 'https://m.media-amazon.com/images/I/61twhaihHtL._AC_SL1500_.jpg', '[\"https://m.media-amazon.com/images/I/71iZckOx06L._AC_SL1500_.jpg\", \"https://m.media-amazon.com/images/I/61uUIygd0JS._AC_SL1500_.jpg\"]', 2, '2023-11-16 03:07:04', '2023-11-16 03:31:12');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password_changed_at` datetime NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('user','admin') COLLATE utf8mb4_unicode_ci DEFAULT 'user',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `password_changed_at`, `address`, `phone`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Thuan', 'Truong', 'qthuan382@gmail.com', '$2a$10$h8kTs9eo1YfWA0v5.iNDQOruidT9ycCHYkdOI3U6WYPoDdBtFCsJm', '2023-11-16 00:04:05', '554 Dien Bien Phu, Da Nang, Viet Nam', '0377993100', 'admin', '2023-11-16 00:04:05', '2023-11-16 00:04:05'),
(2, 'Nghia', 'Dang', 'ahuhu@gmail.com', '$2a$10$i.avuNBO4ONSIQ2RrQz4Te9GogH1Xy/tzWYsLNXbYGccLoDE17MAC', '2023-11-16 01:00:37', '100 Hai Ba Trung, Ha Noi, Viet Nam', '09995511123', 'admin', '2023-11-16 00:59:59', '2023-11-16 03:49:54'),
(3, 'chi thuong', 'le', 'lethuongmytrinh@gmail.com', '$2a$10$KI2qOVp7w8uI4B0J9AKjquVoTaSKyykTY7Hxa.YrOdkZVDg.e0ewe', '2023-11-16 01:46:57', 'Nhon Binh, Quy Nhon, Binh Dinh', '0984254577', 'user', '2023-11-16 01:32:49', '2023-11-16 01:46:57'),
(4, 'Thuan tuan Ho', 'Truong', 'thuan@gmail.com', '$2a$10$sDLx9Q.DY.EtkavFIwnHlOyttQjhVRRj.n330NDm7NRU.rQCejzpy', '2023-11-16 03:45:32', 'Nhon Binh, Quy Nhon, Binh Dinh', '0335687950', 'admin', '2023-11-16 03:23:06', '2023-11-16 03:47:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
