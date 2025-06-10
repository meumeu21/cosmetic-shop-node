-- MySQL dump 10.13  Distrib 9.3.0, for macos15.2 (arm64)
--
-- Host: localhost    Database: cosmetic_shop
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `cart_id` (`cart_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=250 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,2,'2025-05-26 23:32:01','2025-05-26 23:32:01'),(133,3,'2025-06-03 06:45:48','2025-06-03 06:45:48'),(220,5,'2025-06-06 12:57:20','2025-06-06 12:57:20');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `username` varchar(50) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (2,'username@example.com','$2b$10$gyKpnXW0RSINUqx2V9VnneIC2gGSZscPpS8/Q9WBofaJ3bL0C9KdK','+79857292415','Moscow','2025-05-13 00:34:19','2025-06-06 18:11:10','username','/images/cat.png','other'),(3,'masha@example.com','$2b$10$G.dSeSUmzJ26N7P9F8HRp.suV6rJRAIFZPAzCNrSOG24U7ST3VZwG','+79999999999','','2025-06-03 06:45:33','2025-06-06 15:08:21','Masha','','female'),(5,'nastya@example.com','$2b$10$A97DADz9ALiLK1HfAC45HeNjVI2p1Z1VtEJle3jdrwof3Yibcdb6i','','','2025-06-06 12:55:28','2025-06-06 12:58:03','nastya','','female');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,6,4,1525.00),(2,2,6,7,1525.00),(3,3,6,1,1525.00),(4,4,6,9,1525.00),(9,9,11,2,128.00),(10,10,8,1,388.00),(11,10,9,1,682.00),(12,11,69,1,1000.00),(13,11,8,1,388.00),(14,11,7,3,1790.00),(15,12,13,1,388.00),(16,12,20,4,1000.00),(17,12,69,1,1000.00),(18,12,22,1,1000.00),(19,13,6,1,1525.00),(20,13,7,1,1790.00),(21,13,8,1,388.00),(22,13,9,1,682.00),(23,13,10,1,682.00),(24,13,11,1,128.00),(25,13,13,1,388.00),(26,13,14,1,128.00),(27,13,70,1,1000.00),(28,13,69,1,1000.00),(29,13,68,1,1000.00),(30,13,67,1,1000.00),(31,13,50,1,1000.00),(32,13,49,1,1000.00),(33,14,69,9,1000.00),(34,14,49,6,1000.00),(35,14,7,3,1790.00),(36,14,6,3,1525.00),(37,14,6,1,1525.00),(38,14,8,1,388.00),(39,14,50,1,1000.00),(40,14,48,1,1000.00),(41,14,9,2,682.00),(42,14,70,1,1000.00),(43,14,68,1,1000.00),(44,15,7,9,1790.00),(45,15,9,1,682.00),(46,15,6,7,1525.00),(47,16,68,1,1000.00),(48,16,7,1,1790.00),(49,16,8,1,388.00),(50,16,9,1,682.00);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','processing','shipped','delivered','cancelled') DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,2,'2025-05-26 23:46:16',6100.00,'pending'),(2,2,'2025-05-27 00:36:28',10675.00,'pending'),(3,2,'2025-05-27 00:45:45',1525.00,'pending'),(4,2,'2025-05-28 11:41:36',13725.00,'pending'),(9,2,'2025-05-29 14:47:25',256.00,'pending'),(10,2,'2025-05-30 06:24:27',1070.00,'pending'),(11,2,'2025-06-02 13:27:38',6758.00,'pending'),(12,2,'2025-06-02 20:23:28',6388.00,'pending'),(13,2,'2025-06-06 18:13:35',11711.00,'pending'),(14,2,'2025-06-06 20:58:17',32222.00,'pending'),(15,2,'2025-06-08 15:18:09',27467.00,'pending'),(16,3,'2025-06-10 11:52:01',3860.00,'pending');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int NOT NULL DEFAULT '0',
  `category` varchar(50) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_by` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `age_group` varchar(10) NOT NULL DEFAULT '0+',
  `volume` int DEFAULT NULL,
  `items_in_set` int DEFAULT '1',
  `is_hypoallergenic` tinyint(1) NOT NULL DEFAULT '0',
  `application` text,
  `composition` text,
  `brand` varchar(100) DEFAULT NULL,
  `contraindications` text,
  `type` varchar(100) NOT NULL DEFAULT 'hand cream',
  `is_bestseller` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `staff` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (6,'Retinol Intense','Intensive anti-aging facial serum with retinol promotes rapid skin renewal. It rejuvenates, slows down aging and prevents age-related changes. Instantly triggers the recovery of damaged cells, increases the elasticity of the skin, enhances the effect of other care products.\r\nThe serum moisturizes, nourishes, narrows pores, smoothes wrinkles. Tightens flabby skin, restoring its elasticity. Eliminates dryness, itching and peeling. Removes greasy shine, redness, irritation and inflammation, reduces the severity of age spots. Makes pigment spots less noticeable.',1525.00,1000,'Anti-aging','/images/retinol-intense-serum.png',1,'2025-05-12 23:30:57','2025-06-08 16:07:52','30+',30,1,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nisi et ex volutpat placerat. Vestibulum aliquam nisi at rhoncus tempus. Maecenas bibendum neque eu ante auctor, nec facilisis sem varius. Mauris ut sodales ante. Suspendisse tincidunt nisi quis metus rhoncus sagittis. Nam quis ante quis nibh lobortis imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id venenatis leo. Cras quis orci at lectus dignissim vehicula.','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nisi et ex volutpat placerat. Vestibulum aliquam nisi at rhoncus tempus. Maecenas bibendum neque eu ante auctor, nec facilisis sem varius. Mauris ut sodales ante. Suspendisse tincidunt nisi quis metus rhoncus sagittis. Nam quis ante quis nibh lobortis imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id venenatis leo. Cras quis orci at lectus dignissim vehicula.','SOME BY MI','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nisi et ex volutpat placerat. Vestibulum aliquam nisi at rhoncus tempus. Maecenas bibendum neque eu ante auctor, nec facilisis sem varius. Mauris ut sodales ante. Suspendisse tincidunt nisi quis metus rhoncus sagittis. Nam quis ante quis nibh lobortis imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id venenatis leo. Cras quis orci at lectus dignissim vehicula.','Reactivating serum',1),(7,'AHA-BHA-PHA','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et lorem id justo volutpat sodales sit amet nec arcu. Suspendisse congue lacus est, at vestibulum ipsum egestas sed. Integer at hendrerit orci. Maecenas mauris nisl, congue sed venenatis nec, sollicitudin tempus elit. Mauris ut varius nibh, sit amet commodo ex. Nullam ut odio dolor. Nam facilisis sodales nulla, quis viverra nulla vestibulum eget. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam dignissim diam in dignissim ultrices.',1790.00,100,'Watering','/images/aha-bha-pha.png',1,'2025-05-28 21:04:32','2025-06-08 16:09:20','12+',0,70,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nisi et ex volutpat placerat. Vestibulum aliquam nisi at rhoncus tempus. Maecenas bibendum neque eu ante auctor, nec facilisis sem varius. Mauris ut sodales ante. Suspendisse tincidunt nisi quis metus rhoncus sagittis. Nam quis ante quis nibh lobortis imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id venenatis leo. Cras quis orci at lectus dignissim vehicula.','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nisi et ex volutpat placerat. Vestibulum aliquam nisi at rhoncus tempus. Maecenas bibendum neque eu ante auctor, nec facilisis sem varius. Mauris ut sodales ante. Suspendisse tincidunt nisi quis metus rhoncus sagittis. Nam quis ante quis nibh lobortis imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id venenatis leo. Cras quis orci at lectus dignissim vehicula.','some by mi','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nisi et ex volutpat placerat. Vestibulum aliquam nisi at rhoncus tempus. Maecenas bibendum neque eu ante auctor, nec facilisis sem varius. Mauris ut sodales ante. Suspendisse tincidunt nisi quis metus rhoncus sagittis. Nam quis ante quis nibh lobortis imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id venenatis leo. Cras quis orci at lectus dignissim vehicula.','Miracle truecica clear pad',1),(8,'Clear Spot','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et lorem id justo volutpat sodales sit amet nec arcu. Suspendisse congue lacus est, at vestibulum ipsum egestas sed. Integer at hendrerit orci. Maecenas mauris nisl, congue sed venenatis nec, sollicitudin tempus elit. Mauris ut varius nibh, sit amet commodo ex. Nullam ut odio dolor. Nam facilisis sodales nulla, quis viverra nulla vestibulum eget. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam dignissim diam in dignissim ultrices.',388.00,100,'Calming','/images/clear-spot.png',1,'2025-05-28 21:06:21','2025-06-08 16:08:08','0+',0,0,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nisi et ex volutpat placerat. Vestibulum aliquam nisi at rhoncus tempus. Maecenas bibendum neque eu ante auctor, nec facilisis sem varius. Mauris ut sodales ante. Suspendisse tincidunt nisi quis metus rhoncus sagittis. Nam quis ante quis nibh lobortis imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id venenatis leo. Cras quis orci at lectus dignissim vehicula.','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nisi et ex volutpat placerat. Vestibulum aliquam nisi at rhoncus tempus. Maecenas bibendum neque eu ante auctor, nec facilisis sem varius. Mauris ut sodales ante. Suspendisse tincidunt nisi quis metus rhoncus sagittis. Nam quis ante quis nibh lobortis imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id venenatis leo. Cras quis orci at lectus dignissim vehicula.','some by mi','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nisi et ex volutpat placerat. Vestibulum aliquam nisi at rhoncus tempus. Maecenas bibendum neque eu ante auctor, nec facilisis sem varius. Mauris ut sodales ante. Suspendisse tincidunt nisi quis metus rhoncus sagittis. Nam quis ante quis nibh lobortis imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id venenatis leo. Cras quis orci at lectus dignissim vehicula.','Patch',1),(9,'Super Matcha','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et lorem id justo volutpat sodales sit amet nec arcu. Suspendisse congue lacus est, at vestibulum ipsum egestas sed. Integer at hendrerit orci. Maecenas mauris nisl, congue sed venenatis nec, sollicitudin tempus elit. Mauris ut varius nibh, sit amet commodo ex. Nullam ut odio dolor. Nam facilisis sodales nulla, quis viverra nulla vestibulum eget. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam dignissim diam in dignissim ultrices.',682.00,100,'Cleaning','/images/super-matcha.png',1,'2025-05-28 21:07:32','2025-06-08 16:09:07','18+',90,0,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nisi et ex volutpat placerat. Vestibulum aliquam nisi at rhoncus tempus. Maecenas bibendum neque eu ante auctor, nec facilisis sem varius. Mauris ut sodales ante. Suspendisse tincidunt nisi quis metus rhoncus sagittis. Nam quis ante quis nibh lobortis imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id venenatis leo. Cras quis orci at lectus dignissim vehicula.','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nisi et ex volutpat placerat. Vestibulum aliquam nisi at rhoncus tempus. Maecenas bibendum neque eu ante auctor, nec facilisis sem varius. Mauris ut sodales ante. Suspendisse tincidunt nisi quis metus rhoncus sagittis. Nam quis ante quis nibh lobortis imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id venenatis leo. Cras quis orci at lectus dignissim vehicula.','some by mi','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nisi et ex volutpat placerat. Vestibulum aliquam nisi at rhoncus tempus. Maecenas bibendum neque eu ante auctor, nec facilisis sem varius. Mauris ut sodales ante. Suspendisse tincidunt nisi quis metus rhoncus sagittis. Nam quis ante quis nibh lobortis imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id venenatis leo. Cras quis orci at lectus dignissim vehicula.','Pore clean cleansing gel',1),(10,'Retinol Intense','Nam mollis neque non massa porttitor pretium. In sit amet orci in mi condimentum semper. Nunc accumsan malesuada quam, eget feugiat mauris elementum ut. Duis auctor non nibh hendrerit hendrerit. Aenean laoreet massa lectus, mollis aliquam lorem porttitor a. Suspendisse felis risus, pharetra in lacus nec, tristique laoreet elit. Maecenas eu sagittis arcu. Nullam et luctus sapien.',682.00,100,'Anti-aging','/images/retinol-intense-mask.png',1,'2025-05-28 21:09:10','2025-06-08 16:09:33','60+',0,1,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nisi et ex volutpat placerat. Vestibulum aliquam nisi at rhoncus tempus. Maecenas bibendum neque eu ante auctor, nec facilisis sem varius. Mauris ut sodales ante. Suspendisse tincidunt nisi quis metus rhoncus sagittis. Nam quis ante quis nibh lobortis imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id venenatis leo. Cras quis orci at lectus dignissim vehicula.','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nisi et ex volutpat placerat. Vestibulum aliquam nisi at rhoncus tempus. Maecenas bibendum neque eu ante auctor, nec facilisis sem varius. Mauris ut sodales ante. Suspendisse tincidunt nisi quis metus rhoncus sagittis. Nam quis ante quis nibh lobortis imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id venenatis leo. Cras quis orci at lectus dignissim vehicula.','some by mi','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nisi et ex volutpat placerat. Vestibulum aliquam nisi at rhoncus tempus. Maecenas bibendum neque eu ante auctor, nec facilisis sem varius. Mauris ut sodales ante. Suspendisse tincidunt nisi quis metus rhoncus sagittis. Nam quis ante quis nibh lobortis imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id venenatis leo. Cras quis orci at lectus dignissim vehicula.','Reactivating mask',1),(11,'Real Aloe','Nam mollis neque non massa porttitor pretium. In sit amet orci in mi condimentum semper. Nunc accumsan malesuada quam, eget feugiat mauris elementum ut. Duis auctor non nibh hendrerit hendrerit. Aenean laoreet massa lectus, mollis aliquam lorem porttitor a. Suspendisse felis risus, pharetra in lacus nec, tristique laoreet elit. Maecenas eu sagittis arcu. Nullam et luctus sapien.',128.00,100,'Problem skin','/images/real-aloe.png',1,'2025-05-28 21:11:07','2025-06-08 16:09:46','12+',0,1,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nisi et ex volutpat placerat. Vestibulum aliquam nisi at rhoncus tempus. Maecenas bibendum neque eu ante auctor, nec facilisis sem varius. Mauris ut sodales ante. Suspendisse tincidunt nisi quis metus rhoncus sagittis. Nam quis ante quis nibh lobortis imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id venenatis leo. Cras quis orci at lectus dignissim vehicula.','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nisi et ex volutpat placerat. Vestibulum aliquam nisi at rhoncus tempus. Maecenas bibendum neque eu ante auctor, nec facilisis sem varius. Mauris ut sodales ante. Suspendisse tincidunt nisi quis metus rhoncus sagittis. Nam quis ante quis nibh lobortis imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id venenatis leo. Cras quis orci at lectus dignissim vehicula.','some by mi','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nisi et ex volutpat placerat. Vestibulum aliquam nisi at rhoncus tempus. Maecenas bibendum neque eu ante auctor, nec facilisis sem varius. Mauris ut sodales ante. Suspendisse tincidunt nisi quis metus rhoncus sagittis. Nam quis ante quis nibh lobortis imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id venenatis leo. Cras quis orci at lectus dignissim vehicula.','Soothing care mask',1),(13,'Clear Spot test','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a turpis at neque consequat efficitur. Aenean ac justo at lacus volutpat auctor. Aenean sit amet dapibus tortor. Vestibulum placerat erat porta, commodo lacus eu, cursus mauris. Morbi non erat non quam tincidunt tempor sed vel metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut dictum sem purus, quis finibus magna tincidunt ac. Donec nisl purus, cursus at egestas non, luctus in lorem.',388.00,100,'Problem skin','/images/clear-spot.png',1,'2025-05-29 15:34:03','2025-06-08 16:09:57','12+',0,1,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nisi et ex volutpat placerat. Vestibulum aliquam nisi at rhoncus tempus. Maecenas bibendum neque eu ante auctor, nec facilisis sem varius. Mauris ut sodales ante. Suspendisse tincidunt nisi quis metus rhoncus sagittis. Nam quis ante quis nibh lobortis imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id venenatis leo. Cras quis orci at lectus dignissim vehicula.','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nisi et ex volutpat placerat. Vestibulum aliquam nisi at rhoncus tempus. Maecenas bibendum neque eu ante auctor, nec facilisis sem varius. Mauris ut sodales ante. Suspendisse tincidunt nisi quis metus rhoncus sagittis. Nam quis ante quis nibh lobortis imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id venenatis leo. Cras quis orci at lectus dignissim vehicula.','some by mi','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nisi et ex volutpat placerat. Vestibulum aliquam nisi at rhoncus tempus. Maecenas bibendum neque eu ante auctor, nec facilisis sem varius. Mauris ut sodales ante. Suspendisse tincidunt nisi quis metus rhoncus sagittis. Nam quis ante quis nibh lobortis imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id venenatis leo. Cras quis orci at lectus dignissim vehicula.','Patch',0),(14,'Retinol Intense test','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a turpis at neque consequat efficitur. Aenean ac justo at lacus volutpat auctor. Aenean sit amet dapibus tortor. Vestibulum placerat erat porta, commodo lacus eu, cursus mauris. Morbi non erat non quam tincidunt tempor sed vel metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut dictum sem purus, quis finibus magna tincidunt ac. Donec nisl purus, cursus at egestas non, luctus in lorem.',128.00,1000,'Anti-aging','/images/retinol-intense-mask.png',1,'2025-05-29 15:35:53','2025-06-08 16:10:09','60+',0,1,1,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nisi et ex volutpat placerat. Vestibulum aliquam nisi at rhoncus tempus. Maecenas bibendum neque eu ante auctor, nec facilisis sem varius. Mauris ut sodales ante. Suspendisse tincidunt nisi quis metus rhoncus sagittis. Nam quis ante quis nibh lobortis imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id venenatis leo. Cras quis orci at lectus dignissim vehicula.','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nisi et ex volutpat placerat. Vestibulum aliquam nisi at rhoncus tempus. Maecenas bibendum neque eu ante auctor, nec facilisis sem varius. Mauris ut sodales ante. Suspendisse tincidunt nisi quis metus rhoncus sagittis. Nam quis ante quis nibh lobortis imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id venenatis leo. Cras quis orci at lectus dignissim vehicula.','some by mi','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nisi et ex volutpat placerat. Vestibulum aliquam nisi at rhoncus tempus. Maecenas bibendum neque eu ante auctor, nec facilisis sem varius. Mauris ut sodales ante. Suspendisse tincidunt nisi quis metus rhoncus sagittis. Nam quis ante quis nibh lobortis imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id venenatis leo. Cras quis orci at lectus dignissim vehicula.','Reactivating mask',0),(15,'test','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet eros tellus. Nullam non sem rutrum massa tincidunt eleifend eu in mauris. Nunc rhoncus, elit eget aliquet consequat, sem lectus ullamcorper mi, sit amet pretium arcu metus id augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam tincidunt at lectus et sodales. Quisque in sapien justo. Nulla sed viverra nulla. Nullam et hendrerit arcu, vitae feugiat nisi.',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 16:29:32','2025-05-29 16:47:44','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(16,'test','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet eros tellus. Nullam non sem rutrum massa tincidunt eleifend eu in mauris. Nunc rhoncus, elit eget aliquet consequat, sem lectus ullamcorper mi, sit amet pretium arcu metus id augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam tincidunt at lectus et sodales. Quisque in sapien justo. Nulla sed viverra nulla. Nullam et hendrerit arcu, vitae feugiat nisi.',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 16:30:52','2025-05-29 16:47:57','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(17,'test','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet eros tellus. Nullam non sem rutrum massa tincidunt eleifend eu in mauris. Nunc rhoncus, elit eget aliquet consequat, sem lectus ullamcorper mi, sit amet pretium arcu metus id augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam tincidunt at lectus et sodales. Quisque in sapien justo. Nulla sed viverra nulla. Nullam et hendrerit arcu, vitae feugiat nisi.',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 16:36:47','2025-05-29 16:48:02','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(18,'test','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet eros tellus. Nullam non sem rutrum massa tincidunt eleifend eu in mauris. Nunc rhoncus, elit eget aliquet consequat, sem lectus ullamcorper mi, sit amet pretium arcu metus id augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam tincidunt at lectus et sodales. Quisque in sapien justo. Nulla sed viverra nulla. Nullam et hendrerit arcu, vitae feugiat nisi.',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 16:38:06','2025-05-29 16:49:07','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(19,'test','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet eros tellus. Nullam non sem rutrum massa tincidunt eleifend eu in mauris. Nunc rhoncus, elit eget aliquet consequat, sem lectus ullamcorper mi, sit amet pretium arcu metus id augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam tincidunt at lectus et sodales. Quisque in sapien justo. Nulla sed viverra nulla. Nullam et hendrerit arcu, vitae feugiat nisi.',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 16:38:53','2025-05-29 16:48:06','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(20,'test','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet eros tellus. Nullam non sem rutrum massa tincidunt eleifend eu in mauris. Nunc rhoncus, elit eget aliquet consequat, sem lectus ullamcorper mi, sit amet pretium arcu metus id augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam tincidunt at lectus et sodales. Quisque in sapien justo. Nulla sed viverra nulla. Nullam et hendrerit arcu, vitae feugiat nisi.',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 16:40:01','2025-05-29 16:48:10','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(21,'test','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet eros tellus. Nullam non sem rutrum massa tincidunt eleifend eu in mauris. Nunc rhoncus, elit eget aliquet consequat, sem lectus ullamcorper mi, sit amet pretium arcu metus id augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam tincidunt at lectus et sodales. Quisque in sapien justo. Nulla sed viverra nulla. Nullam et hendrerit arcu, vitae feugiat nisi.',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 16:40:54','2025-05-29 16:48:13','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(22,'test','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet eros tellus. Nullam non sem rutrum massa tincidunt eleifend eu in mauris. Nunc rhoncus, elit eget aliquet consequat, sem lectus ullamcorper mi, sit amet pretium arcu metus id augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam tincidunt at lectus et sodales. Quisque in sapien justo. Nulla sed viverra nulla. Nullam et hendrerit arcu, vitae feugiat nisi.',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 16:41:52','2025-05-29 16:48:28','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(23,'test','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet eros tellus. Nullam non sem rutrum massa tincidunt eleifend eu in mauris. Nunc rhoncus, elit eget aliquet consequat, sem lectus ullamcorper mi, sit amet pretium arcu metus id augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam tincidunt at lectus et sodales. Quisque in sapien justo. Nulla sed viverra nulla. Nullam et hendrerit arcu, vitae feugiat nisi.',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 16:43:10','2025-05-29 16:48:39','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(24,'test','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet eros tellus. Nullam non sem rutrum massa tincidunt eleifend eu in mauris. Nunc rhoncus, elit eget aliquet consequat, sem lectus ullamcorper mi, sit amet pretium arcu metus id augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam tincidunt at lectus et sodales. Quisque in sapien justo. Nulla sed viverra nulla. Nullam et hendrerit arcu, vitae feugiat nisi.',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 16:43:47','2025-05-29 16:48:43','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(25,'test','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet eros tellus. Nullam non sem rutrum massa tincidunt eleifend eu in mauris. Nunc rhoncus, elit eget aliquet consequat, sem lectus ullamcorper mi, sit amet pretium arcu metus id augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam tincidunt at lectus et sodales. Quisque in sapien justo. Nulla sed viverra nulla. Nullam et hendrerit arcu, vitae feugiat nisi.',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 16:50:17','2025-05-29 16:50:17','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(26,'test','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet eros tellus. Nullam non sem rutrum massa tincidunt eleifend eu in mauris. Nunc rhoncus, elit eget aliquet consequat, sem lectus ullamcorper mi, sit amet pretium arcu metus id augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam tincidunt at lectus et sodales. Quisque in sapien justo. Nulla sed viverra nulla. Nullam et hendrerit arcu, vitae feugiat nisi.',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 16:50:57','2025-05-29 16:50:57','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(27,'test','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet eros tellus. Nullam non sem rutrum massa tincidunt eleifend eu in mauris. Nunc rhoncus, elit eget aliquet consequat, sem lectus ullamcorper mi, sit amet pretium arcu metus id augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam tincidunt at lectus et sodales. Quisque in sapien justo. Nulla sed viverra nulla. Nullam et hendrerit arcu, vitae feugiat nisi.',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 16:51:35','2025-05-29 16:51:35','0+',90,0,1,'','','some by mi','','Cleansing gel',1),(28,'test','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet eros tellus. Nullam non sem rutrum massa tincidunt eleifend eu in mauris. Nunc rhoncus, elit eget aliquet consequat, sem lectus ullamcorper mi, sit amet pretium arcu metus id augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam tincidunt at lectus et sodales. Quisque in sapien justo. Nulla sed viverra nulla. Nullam et hendrerit arcu, vitae feugiat nisi.',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 16:56:42','2025-05-29 16:56:42','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(29,'test','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet eros tellus. Nullam non sem rutrum massa tincidunt eleifend eu in mauris. Nunc rhoncus, elit eget aliquet consequat, sem lectus ullamcorper mi, sit amet pretium arcu metus id augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam tincidunt at lectus et sodales. Quisque in sapien justo. Nulla sed viverra nulla. Nullam et hendrerit arcu, vitae feugiat nisi.',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 16:57:28','2025-05-29 16:57:28','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(30,'test','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet eros tellus. Nullam non sem rutrum massa tincidunt eleifend eu in mauris. Nunc rhoncus, elit eget aliquet consequat, sem lectus ullamcorper mi, sit amet pretium arcu metus id augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam tincidunt at lectus et sodales. Quisque in sapien justo. Nulla sed viverra nulla. Nullam et hendrerit arcu, vitae feugiat nisi.',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 16:58:23','2025-05-29 16:58:23','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(31,'test','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet eros tellus. Nullam non sem rutrum massa tincidunt eleifend eu in mauris. Nunc rhoncus, elit eget aliquet consequat, sem lectus ullamcorper mi, sit amet pretium arcu metus id augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam tincidunt at lectus et sodales. Quisque in sapien justo. Nulla sed viverra nulla. Nullam et hendrerit arcu, vitae feugiat nisi.',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 16:59:04','2025-05-29 16:59:04','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(32,'test','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet eros tellus. Nullam non sem rutrum massa tincidunt eleifend eu in mauris. Nunc rhoncus, elit eget aliquet consequat, sem lectus ullamcorper mi, sit amet pretium arcu metus id augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam tincidunt at lectus et sodales. Quisque in sapien justo. Nulla sed viverra nulla. Nullam et hendrerit arcu, vitae feugiat nisi.',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 17:06:15','2025-05-29 17:06:19','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(33,'test','',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 17:14:44','2025-05-29 17:14:44','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(34,'test','',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 17:14:58','2025-05-29 17:14:58','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(35,'test','',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 17:14:59','2025-05-29 17:14:59','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(36,'test','',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 17:15:01','2025-05-29 17:15:01','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(37,'test','',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 17:15:02','2025-05-29 17:15:02','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(38,'test','',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 17:15:03','2025-05-29 17:15:03','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(39,'test','',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 17:15:04','2025-05-29 17:15:04','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(40,'test','',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 17:15:05','2025-05-29 17:15:05','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(41,'test','',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 17:15:05','2025-05-29 17:15:05','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(42,'test','',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 17:15:06','2025-05-29 17:15:06','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(43,'test','',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 17:15:06','2025-05-29 17:15:06','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(44,'test','',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 17:15:07','2025-05-29 17:15:07','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(45,'test','',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 17:16:18','2025-05-29 17:16:18','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(46,'test','',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 17:16:19','2025-05-29 17:16:19','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(47,'test','',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 17:16:20','2025-05-29 17:16:20','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(48,'test','',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 17:16:22','2025-05-29 17:16:22','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(49,'test','',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 17:16:22','2025-05-29 17:16:22','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(50,'test','',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 17:16:23','2025-05-29 17:16:23','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(67,'test','',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 17:18:18','2025-05-29 17:18:18','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(68,'test','',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 17:18:19','2025-05-29 17:18:19','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(69,'test','',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 17:18:20','2025-05-29 17:18:20','0+',90,0,1,'','','some by mi','','Cleansing gel',0),(70,'test','',1000.00,100,'Cleaning','/images/aha.png',1,'2025-05-29 17:19:46','2025-05-29 17:19:46','0+',90,0,1,'','','some by mi','','Cleansing gel',0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','manager') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'admin','admin@example.com','$2b$10$ScFJWqjV43zR7lr9o/96ze5DT4GvdDudPJmENdv7qZQjyWxGWz2fK','admin','2025-05-09 21:59:19','2025-05-09 21:59:19'),(2,'merch','merch@example.com','$2b$10$4sj2vthSi3fZDfDH6ujcpOq6YGBt1NMk8xXjbBG1joQQRM93FVxlG','manager','2025-05-09 23:02:19','2025-05-09 23:02:19');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-10 14:54:58
