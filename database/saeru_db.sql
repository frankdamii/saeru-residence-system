-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: saeru_db
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `academic_levels`
--

DROP TABLE IF EXISTS `academic_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `academic_levels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `level_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `level_name` (`level_name`),
  UNIQUE KEY `level_name_2` (`level_name`),
  UNIQUE KEY `level_name_3` (`level_name`),
  UNIQUE KEY `level_name_4` (`level_name`),
  UNIQUE KEY `level_name_5` (`level_name`),
  UNIQUE KEY `level_name_6` (`level_name`),
  UNIQUE KEY `level_name_7` (`level_name`),
  UNIQUE KEY `level_name_8` (`level_name`),
  UNIQUE KEY `level_name_9` (`level_name`),
  UNIQUE KEY `level_name_10` (`level_name`),
  UNIQUE KEY `level_name_11` (`level_name`),
  UNIQUE KEY `level_name_12` (`level_name`),
  UNIQUE KEY `level_name_13` (`level_name`),
  UNIQUE KEY `level_name_14` (`level_name`),
  UNIQUE KEY `level_name_15` (`level_name`),
  UNIQUE KEY `level_name_16` (`level_name`),
  UNIQUE KEY `level_name_17` (`level_name`),
  UNIQUE KEY `level_name_18` (`level_name`),
  UNIQUE KEY `level_name_19` (`level_name`),
  UNIQUE KEY `level_name_20` (`level_name`),
  UNIQUE KEY `level_name_21` (`level_name`),
  UNIQUE KEY `level_name_22` (`level_name`),
  UNIQUE KEY `level_name_23` (`level_name`),
  UNIQUE KEY `level_name_24` (`level_name`),
  UNIQUE KEY `level_name_25` (`level_name`),
  UNIQUE KEY `level_name_26` (`level_name`),
  UNIQUE KEY `level_name_27` (`level_name`),
  UNIQUE KEY `level_name_28` (`level_name`),
  UNIQUE KEY `level_name_29` (`level_name`),
  UNIQUE KEY `level_name_30` (`level_name`),
  UNIQUE KEY `level_name_31` (`level_name`),
  UNIQUE KEY `level_name_32` (`level_name`),
  UNIQUE KEY `level_name_33` (`level_name`),
  UNIQUE KEY `level_name_34` (`level_name`),
  UNIQUE KEY `level_name_35` (`level_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academic_levels`
--

LOCK TABLES `academic_levels` WRITE;
/*!40000 ALTER TABLE `academic_levels` DISABLE KEYS */;
INSERT INTO `academic_levels` VALUES (4,'Cuarto Año'),(6,'Máster'),(1,'Primer Año'),(5,'Quinto Año'),(2,'Segundo Año'),(3,'Tercer Año');
/*!40000 ALTER TABLE `academic_levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announcements`
--

DROP TABLE IF EXISTS `announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcements`
--

LOCK TABLES `announcements` WRITE;
/*!40000 ALTER TABLE `announcements` DISABLE KEYS */;
INSERT INTO `announcements` VALUES (1,'Corte programado de agua caliente','El próximo jueves 15 de agosto, desde las 10:00 hasta las 14:00, se realizará un mantenimiento en el sistema de agua caliente. Durante este tiempo, el servicio estará interrumpido en todas las plantas.\nGracias por vuestra comprensión.','2025-08-13 15:07:31'),(2,'Cine nocturno en la terraza','Este sábado 17 de agosto a las 21:00, proyectaremos Oppenheimer en la terraza de la residencia. Se proporcionarán palomitas y refrescos gratis.\n¡Trae tu manta y disfruta de la noche!','2025-08-13 15:07:56');
/*!40000 ALTER TABLE `announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_profile_id` int NOT NULL,
  `academic_year` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','approved','rejected','waitlist') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `submission_date` datetime NOT NULL,
  `assigned_habitation_id` int DEFAULT NULL,
  `record_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `admin_notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_profile_id` (`student_profile_id`),
  UNIQUE KEY `record_number` (`record_number`),
  UNIQUE KEY `record_number_2` (`record_number`),
  UNIQUE KEY `record_number_3` (`record_number`),
  UNIQUE KEY `record_number_4` (`record_number`),
  UNIQUE KEY `record_number_5` (`record_number`),
  UNIQUE KEY `record_number_6` (`record_number`),
  UNIQUE KEY `record_number_7` (`record_number`),
  UNIQUE KEY `record_number_8` (`record_number`),
  UNIQUE KEY `record_number_9` (`record_number`),
  UNIQUE KEY `record_number_10` (`record_number`),
  UNIQUE KEY `record_number_11` (`record_number`),
  UNIQUE KEY `record_number_12` (`record_number`),
  UNIQUE KEY `record_number_13` (`record_number`),
  UNIQUE KEY `record_number_14` (`record_number`),
  UNIQUE KEY `record_number_15` (`record_number`),
  UNIQUE KEY `record_number_16` (`record_number`),
  UNIQUE KEY `record_number_17` (`record_number`),
  UNIQUE KEY `record_number_18` (`record_number`),
  UNIQUE KEY `record_number_19` (`record_number`),
  UNIQUE KEY `record_number_20` (`record_number`),
  UNIQUE KEY `record_number_21` (`record_number`),
  UNIQUE KEY `record_number_22` (`record_number`),
  UNIQUE KEY `record_number_23` (`record_number`),
  UNIQUE KEY `record_number_24` (`record_number`),
  UNIQUE KEY `record_number_25` (`record_number`),
  UNIQUE KEY `record_number_26` (`record_number`),
  UNIQUE KEY `record_number_27` (`record_number`),
  UNIQUE KEY `record_number_28` (`record_number`),
  UNIQUE KEY `record_number_29` (`record_number`),
  UNIQUE KEY `record_number_30` (`record_number`),
  UNIQUE KEY `record_number_31` (`record_number`),
  UNIQUE KEY `record_number_32` (`record_number`),
  UNIQUE KEY `record_number_33` (`record_number`),
  UNIQUE KEY `record_number_34` (`record_number`),
  UNIQUE KEY `record_number_35` (`record_number`),
  KEY `assigned_habitation_id` (`assigned_habitation_id`),
  CONSTRAINT `applications_ibfk_69` FOREIGN KEY (`student_profile_id`) REFERENCES `student_profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `applications_ibfk_70` FOREIGN KEY (`assigned_habitation_id`) REFERENCES `habitations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (4,5,'2024/2025','approved','2025-08-13 07:37:16',1,NULL,'Bienvenido!','2025-08-13 07:37:16'),(5,6,'2024/2025','approved','2025-08-13 15:34:59',4,NULL,'Salud sensible;','2025-08-13 15:34:59');
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entry_documents`
--

DROP TABLE IF EXISTS `entry_documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entry_documents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `application_id` int NOT NULL,
  `enrollment_proof_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entry_slip_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_receipt_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `application_id` (`application_id`),
  CONSTRAINT `entry_documents_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entry_documents`
--

LOCK TABLES `entry_documents` WRITE;
/*!40000 ALTER TABLE `entry_documents` DISABLE KEYS */;
INSERT INTO `entry_documents` VALUES (4,4,'public\\uploads\\documents\\enrollmentProof-1755070636437-246493425.pdf','public\\uploads\\documents\\entrySlip-1755070636515-656382696.pdf','public\\uploads\\documents\\paymentReceipt-1755070636549-463527069.pdf','2025-08-13 07:37:16'),(5,5,'public\\uploads\\documents\\enrollmentProof-1755099298602-467314670.pdf','public\\uploads\\documents\\entrySlip-1755099299140-430029238.pdf','public\\uploads\\documents\\paymentReceipt-1755099299148-908009403.pdf','2025-08-13 15:34:59');
/*!40000 ALTER TABLE `entry_documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculties`
--

DROP TABLE IF EXISTS `faculties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_2` (`name`),
  UNIQUE KEY `name_3` (`name`),
  UNIQUE KEY `name_4` (`name`),
  UNIQUE KEY `name_5` (`name`),
  UNIQUE KEY `name_6` (`name`),
  UNIQUE KEY `name_7` (`name`),
  UNIQUE KEY `name_8` (`name`),
  UNIQUE KEY `name_9` (`name`),
  UNIQUE KEY `name_10` (`name`),
  UNIQUE KEY `name_11` (`name`),
  UNIQUE KEY `name_12` (`name`),
  UNIQUE KEY `name_13` (`name`),
  UNIQUE KEY `name_14` (`name`),
  UNIQUE KEY `name_15` (`name`),
  UNIQUE KEY `name_16` (`name`),
  UNIQUE KEY `name_17` (`name`),
  UNIQUE KEY `name_18` (`name`),
  UNIQUE KEY `name_19` (`name`),
  UNIQUE KEY `name_20` (`name`),
  UNIQUE KEY `name_21` (`name`),
  UNIQUE KEY `name_22` (`name`),
  UNIQUE KEY `name_23` (`name`),
  UNIQUE KEY `name_24` (`name`),
  UNIQUE KEY `name_25` (`name`),
  UNIQUE KEY `name_26` (`name`),
  UNIQUE KEY `name_27` (`name`),
  UNIQUE KEY `name_28` (`name`),
  UNIQUE KEY `name_29` (`name`),
  UNIQUE KEY `name_30` (`name`),
  UNIQUE KEY `name_31` (`name`),
  UNIQUE KEY `name_32` (`name`),
  UNIQUE KEY `name_33` (`name`),
  UNIQUE KEY `name_34` (`name`),
  UNIQUE KEY `name_35` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculties`
--

LOCK TABLES `faculties` WRITE;
/*!40000 ALTER TABLE `faculties` DISABLE KEYS */;
INSERT INTO `faculties` VALUES (3,'Facultad de Ciencias de la Salud'),(4,'Facultad de Ciencias Económicas y Empresariales'),(2,'Facultad de Ciencias Sociales y Humanidades'),(1,'Facultad de Ingeniería y Tecnología');
/*!40000 ALTER TABLE `faculties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guardians`
--

DROP TABLE IF EXISTS `guardians`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guardians` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_profile_id` int NOT NULL,
  `guardian_type` enum('Padre','Madre','Tutor','Tutor Eventual') COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `relationship` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `occupation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `residence` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `student_profile_id` (`student_profile_id`),
  CONSTRAINT `guardians_ibfk_1` FOREIGN KEY (`student_profile_id`) REFERENCES `student_profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guardians`
--

LOCK TABLES `guardians` WRITE;
/*!40000 ALTER TABLE `guardians` DISABLE KEYS */;
INSERT INTO `guardians` VALUES (4,5,'Padre','Ezequiel Elá',NULL,NULL,'+240 222 654 321',NULL),(5,6,'Tutor','Iván Chaito',NULL,NULL,'+240 222 553 293',NULL);
/*!40000 ALTER TABLE `guardians` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habitations`
--

DROP TABLE IF EXISTS `habitations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habitations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `residence_id` int NOT NULL,
  `habitation_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `floor` int NOT NULL,
  `capacity` int NOT NULL DEFAULT '1',
  `status` enum('available','occupied','maintenance') COLLATE utf8mb4_unicode_ci DEFAULT 'available',
  PRIMARY KEY (`id`),
  UNIQUE KEY `habitation_code` (`habitation_code`),
  UNIQUE KEY `habitation_code_2` (`habitation_code`),
  UNIQUE KEY `habitation_code_3` (`habitation_code`),
  UNIQUE KEY `habitation_code_4` (`habitation_code`),
  UNIQUE KEY `habitation_code_5` (`habitation_code`),
  UNIQUE KEY `habitation_code_6` (`habitation_code`),
  UNIQUE KEY `habitation_code_7` (`habitation_code`),
  UNIQUE KEY `habitation_code_8` (`habitation_code`),
  UNIQUE KEY `habitation_code_9` (`habitation_code`),
  UNIQUE KEY `habitation_code_10` (`habitation_code`),
  UNIQUE KEY `habitation_code_11` (`habitation_code`),
  UNIQUE KEY `habitation_code_12` (`habitation_code`),
  UNIQUE KEY `habitation_code_13` (`habitation_code`),
  UNIQUE KEY `habitation_code_14` (`habitation_code`),
  UNIQUE KEY `habitation_code_15` (`habitation_code`),
  UNIQUE KEY `habitation_code_16` (`habitation_code`),
  UNIQUE KEY `habitation_code_17` (`habitation_code`),
  UNIQUE KEY `habitation_code_18` (`habitation_code`),
  UNIQUE KEY `habitation_code_19` (`habitation_code`),
  UNIQUE KEY `habitation_code_20` (`habitation_code`),
  UNIQUE KEY `habitation_code_21` (`habitation_code`),
  UNIQUE KEY `habitation_code_22` (`habitation_code`),
  UNIQUE KEY `habitation_code_23` (`habitation_code`),
  UNIQUE KEY `habitation_code_24` (`habitation_code`),
  UNIQUE KEY `habitation_code_25` (`habitation_code`),
  UNIQUE KEY `habitation_code_26` (`habitation_code`),
  UNIQUE KEY `habitation_code_27` (`habitation_code`),
  UNIQUE KEY `habitation_code_28` (`habitation_code`),
  UNIQUE KEY `habitation_code_29` (`habitation_code`),
  UNIQUE KEY `habitation_code_30` (`habitation_code`),
  UNIQUE KEY `habitation_code_31` (`habitation_code`),
  UNIQUE KEY `habitation_code_32` (`habitation_code`),
  UNIQUE KEY `habitation_code_33` (`habitation_code`),
  UNIQUE KEY `habitation_code_34` (`habitation_code`),
  UNIQUE KEY `habitation_code_35` (`habitation_code`),
  KEY `residence_id` (`residence_id`),
  CONSTRAINT `habitations_ibfk_1` FOREIGN KEY (`residence_id`) REFERENCES `residences` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `habitations_chk_1` CHECK (((`capacity` >= 1) and (`capacity` <= 4)))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habitations`
--

LOCK TABLES `habitations` WRITE;
/*!40000 ALTER TABLE `habitations` DISABLE KEYS */;
INSERT INTO `habitations` VALUES (1,1,'R01-101',1,2,'occupied'),(2,1,'R01-102',1,4,'available'),(3,1,'R01-201',2,2,'available'),(4,2,'R02-101',1,1,'occupied'),(5,2,'R02-102',1,2,'available'),(6,3,'R03-101',1,4,'available');
/*!40000 ALTER TABLE `habitations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `majors`
--

DROP TABLE IF EXISTS `majors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `majors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `faculty_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_2` (`name`),
  UNIQUE KEY `name_3` (`name`),
  UNIQUE KEY `name_4` (`name`),
  UNIQUE KEY `name_5` (`name`),
  UNIQUE KEY `name_6` (`name`),
  UNIQUE KEY `name_7` (`name`),
  UNIQUE KEY `name_8` (`name`),
  UNIQUE KEY `name_9` (`name`),
  UNIQUE KEY `name_10` (`name`),
  UNIQUE KEY `name_11` (`name`),
  UNIQUE KEY `name_12` (`name`),
  UNIQUE KEY `name_13` (`name`),
  UNIQUE KEY `name_14` (`name`),
  UNIQUE KEY `name_15` (`name`),
  UNIQUE KEY `name_16` (`name`),
  UNIQUE KEY `name_17` (`name`),
  UNIQUE KEY `name_18` (`name`),
  UNIQUE KEY `name_19` (`name`),
  UNIQUE KEY `name_20` (`name`),
  UNIQUE KEY `name_21` (`name`),
  UNIQUE KEY `name_22` (`name`),
  UNIQUE KEY `name_23` (`name`),
  UNIQUE KEY `name_24` (`name`),
  UNIQUE KEY `name_25` (`name`),
  UNIQUE KEY `name_26` (`name`),
  UNIQUE KEY `name_27` (`name`),
  UNIQUE KEY `name_28` (`name`),
  UNIQUE KEY `name_29` (`name`),
  UNIQUE KEY `name_30` (`name`),
  UNIQUE KEY `name_31` (`name`),
  UNIQUE KEY `name_32` (`name`),
  UNIQUE KEY `name_33` (`name`),
  UNIQUE KEY `name_34` (`name`),
  UNIQUE KEY `name_35` (`name`),
  KEY `faculty_id` (`faculty_id`),
  CONSTRAINT `majors_ibfk_1` FOREIGN KEY (`faculty_id`) REFERENCES `faculties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `majors`
--

LOCK TABLES `majors` WRITE;
/*!40000 ALTER TABLE `majors` DISABLE KEYS */;
INSERT INTO `majors` VALUES (1,1,'Ingeniería Informática'),(2,1,'Ingeniería Civil'),(3,1,'Ingeniería en Telecomunicaciones'),(4,2,'Derecho'),(5,2,'Ciencias Políticas'),(6,2,'Traducción e Interpretación'),(7,2,'Periodismo'),(8,3,'Medicina'),(9,3,'Enfermería'),(10,3,'Farmacia'),(11,4,'Economía'),(12,4,'Administración y Dirección de Empresas'),(13,4,'Marketing');
/*!40000 ALTER TABLE `majors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `residences`
--

DROP TABLE IF EXISTS `residences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `residences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_2` (`name`),
  UNIQUE KEY `name_3` (`name`),
  UNIQUE KEY `name_4` (`name`),
  UNIQUE KEY `name_5` (`name`),
  UNIQUE KEY `name_6` (`name`),
  UNIQUE KEY `name_7` (`name`),
  UNIQUE KEY `name_8` (`name`),
  UNIQUE KEY `name_9` (`name`),
  UNIQUE KEY `name_10` (`name`),
  UNIQUE KEY `name_11` (`name`),
  UNIQUE KEY `name_12` (`name`),
  UNIQUE KEY `name_13` (`name`),
  UNIQUE KEY `name_14` (`name`),
  UNIQUE KEY `name_15` (`name`),
  UNIQUE KEY `name_16` (`name`),
  UNIQUE KEY `name_17` (`name`),
  UNIQUE KEY `name_18` (`name`),
  UNIQUE KEY `name_19` (`name`),
  UNIQUE KEY `name_20` (`name`),
  UNIQUE KEY `name_21` (`name`),
  UNIQUE KEY `name_22` (`name`),
  UNIQUE KEY `name_23` (`name`),
  UNIQUE KEY `name_24` (`name`),
  UNIQUE KEY `name_25` (`name`),
  UNIQUE KEY `name_26` (`name`),
  UNIQUE KEY `name_27` (`name`),
  UNIQUE KEY `name_28` (`name`),
  UNIQUE KEY `name_29` (`name`),
  UNIQUE KEY `name_30` (`name`),
  UNIQUE KEY `name_31` (`name`),
  UNIQUE KEY `name_32` (`name`),
  UNIQUE KEY `name_33` (`name`),
  UNIQUE KEY `name_34` (`name`),
  UNIQUE KEY `name_35` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `residences`
--

LOCK TABLES `residences` WRITE;
/*!40000 ALTER TABLE `residences` DISABLE KEYS */;
INSERT INTO `residences` VALUES (1,'R 01'),(2,'R 02'),(3,'R 03'),(4,'R 04'),(5,'R 05'),(6,'R 06');
/*!40000 ALTER TABLE `residences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_profiles`
--

DROP TABLE IF EXISTS `student_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_of_birth` datetime NOT NULL,
  `identity_document_type` enum('D.I.P.','Pasaporte') COLLATE utf8mb4_unicode_ci NOT NULL,
  `identity_document_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `home_residence` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `faculty_id` int NOT NULL,
  `major_id` int NOT NULL,
  `academic_level_id` int NOT NULL,
  `profile_image_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `instagram_handle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `medical_issues` text COLLATE utf8mb4_unicode_ci,
  `harmful_habits` text COLLATE utf8mb4_unicode_ci,
  `observations` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `identity_document_type` (`identity_document_type`,`identity_document_number`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `faculty_id` (`faculty_id`),
  KEY `major_id` (`major_id`),
  KEY `academic_level_id` (`academic_level_id`),
  CONSTRAINT `student_profiles_ibfk_137` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `student_profiles_ibfk_138` FOREIGN KEY (`faculty_id`) REFERENCES `faculties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `student_profiles_ibfk_139` FOREIGN KEY (`major_id`) REFERENCES `majors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `student_profiles_ibfk_140` FOREIGN KEY (`academic_level_id`) REFERENCES `academic_levels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_profiles`
--

LOCK TABLES `student_profiles` WRITE;
/*!40000 ALTER TABLE `student_profiles` DISABLE KEYS */;
INSERT INTO `student_profiles` VALUES (5,5,'Kisito Ezequiel','Mañé Elá','2000-03-16 00:00:00','Pasaporte','P1234567','+240 222 123 456','Bata, Mbangan',4,12,6,'public\\uploads\\profile_images\\profileImage-1755070636362-712951448.JPG',NULL,NULL,NULL,'Necesito ir al Gimnasio;','2025-08-13 07:37:16'),(6,6,'Francisco Severino','Engonga','2000-03-30 00:00:00','Pasaporte','P10181283','+240 222 674 805','Bata, Ncolombong - Seminario Mayor',1,1,4,'public\\uploads\\profile_images\\profileImage-1755099298594-672228464.jpg','@frankdamii','Asma, anemia, alergia al picante e intolerante a la lactosa;',NULL,'Necesito un cuarto para mí solo;','2025-08-13 15:34:59');
/*!40000 ALTER TABLE `student_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('student','admin') COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `email_14` (`email`),
  UNIQUE KEY `email_15` (`email`),
  UNIQUE KEY `email_16` (`email`),
  UNIQUE KEY `email_17` (`email`),
  UNIQUE KEY `email_18` (`email`),
  UNIQUE KEY `email_19` (`email`),
  UNIQUE KEY `email_20` (`email`),
  UNIQUE KEY `email_21` (`email`),
  UNIQUE KEY `email_22` (`email`),
  UNIQUE KEY `email_23` (`email`),
  UNIQUE KEY `email_24` (`email`),
  UNIQUE KEY `email_25` (`email`),
  UNIQUE KEY `email_26` (`email`),
  UNIQUE KEY `email_27` (`email`),
  UNIQUE KEY `email_28` (`email`),
  UNIQUE KEY `email_29` (`email`),
  UNIQUE KEY `email_30` (`email`),
  UNIQUE KEY `email_31` (`email`),
  UNIQUE KEY `email_32` (`email`),
  UNIQUE KEY `email_33` (`email`),
  UNIQUE KEY `email_34` (`email`),
  UNIQUE KEY `email_35` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@aauca.com','$2b$10$XIsfzODPM9N8isGV0lbLBurdBmaR8hces59G9ZxLrMtPlomBh7XCa','admin',1,'2025-08-09 01:00:22'),(5,'P1234567@aauca-residence.com','$2b$10$SLEJpo/s2duJy45DRZTG1uHPIcCJoSUQ3M9z/23MfyrucytaiEe5y','student',1,'2025-08-13 11:28:28'),(6,'P10181283@aauca-residence.com','$2b$10$QKRITv4Q.w0jmuATzVz8Rue2JZd2qrW3EEZcpny0aPtcbuJ0yxB8q','student',1,'2025-08-13 15:36:45');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-13 18:31:54
