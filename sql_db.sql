-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: jobtrek1
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `active_session`
--

DROP TABLE IF EXISTS `active_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `active_session` (
  `id` varchar(255) NOT NULL,
  `token` text NOT NULL,
  `userId` varchar(255) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`userId`),
  CONSTRAINT `active_session_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `active_session`
--

LOCK TABLES `active_session` WRITE;
/*!40000 ALTER TABLE `active_session` DISABLE KEYS */;
INSERT INTO `active_session` VALUES ('00f3fc81-5a72-4b8f-8be8-72e5141041df','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzIyNTE0OTYxLCJleHAiOjE3MjI2MDEzNjF9.eTegy3nOQKyIIIcSkOE8A_ir78evQWJRBzn3HyJZtyM','721f14db-804c-4c37-8a87-8d5665df2425','2024-08-01 17:52:41'),('02f4dbbf-2ee5-47ea-a748-e6dfe2033c7a','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMzQ0NTMyNiwiZXhwIjoxNzIzNTMxNzI2fQ.67TC2Ay5UK3kWqYXC4vC1b6vQ0vYisBNkwVINVcz9pE','b0d8e377-87f9-4361-8132-87db13d19e91','2024-08-12 12:18:46'),('05445024-7731-4fc3-bd1d-3c3fd7e07d8e','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMjQ4Njk0MSwiZXhwIjoxNzIyNTczMzQxfQ.gScTnjV4cQqzCZZAKVjpXX-zuSrYX4k5R1HpdAxo1Qs','b0d8e377-87f9-4361-8132-87db13d19e91','2024-08-01 10:05:42'),('05abe30e-6eaa-4c2e-9060-168a5f05c53a','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyNDIyNDM0NSwiZXhwIjoxNzI0MzEwNzQ1fQ.XH1DVkXNSrodIQJLNdcOGx6cmmt_wzTZ-XdTPd-6O7o','b0d8e377-87f9-4361-8132-87db13d19e91','2024-08-21 12:42:25'),('08ceb098-6ed4-40e9-851c-f65bc8a00473','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzIzNzkxMDAxLCJleHAiOjE3MjM4Nzc0MDF9.pNaP5S7lVuR5lN2MBactzbee_2F8mqqKh3alU5NjuQE','721f14db-804c-4c37-8a87-8d5665df2425','2024-08-16 12:20:01'),('127ce84f-1588-4fa3-b8d3-2d147a22c2dc','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyNDE1NzkxNywiZXhwIjoxNzI0MjQ0MzE3fQ.vJv9klhhaB_40RbKTKOxy8Tq-vTWn6pnxVjNYZ_UcKo','b0d8e377-87f9-4361-8132-87db13d19e91','2024-08-20 18:15:17'),('192776bd-f300-4f08-a690-551c5f28cff4','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZiMTgyODgyLWZlOTktNGI0Mi05YmE1LWY3ZTAxYzg3MDQ3ZiIsInVzZXJuYW1lIjoiYmh1bWlrYSIsImVtYWlsIjoiYmh1bWlrYUBnbWFpbC5jb20iLCJpYXQiOjE3MjQyMjQxMjcsImV4cCI6MTcyNDMxMDUyN30.Yeti7acIJZhr4yA4gY5nDiA3MudLv_GFew3SSIbgdC8','6b182882-fe99-4b42-9ba5-f7e01c87047f','2024-08-21 12:38:47'),('21335324-4b7f-4297-bc6b-b932441422ac','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMzQ1NTI4OSwiZXhwIjoxNzIzNTQxNjg5fQ.nXDNrWlCpRQ1ZF2bD7rChm720M8DvX7Os-AIJ72Y_UE','b0d8e377-87f9-4361-8132-87db13d19e91','2024-08-12 15:04:49'),('230384a9-d695-41d2-a342-945b02d7fc0d','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzIxOTAyMzY5LCJleHAiOjE3MjE5ODg3Njl9.cheHtI34szcEeJwi38IKXXAkyyOtAgYkwDcrjLUq2w4','721f14db-804c-4c37-8a87-8d5665df2425','2024-07-25 15:42:49'),('2648aaa9-5586-4bc7-90db-20662817c074','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzI0MjIyMDkwLCJleHAiOjE3MjQzMDg0OTB9.bvhm1n6bmXlRj5MIG7jw9CxGEKCk2hNQD4Qq4LEuicA','721f14db-804c-4c37-8a87-8d5665df2425','2024-08-21 12:04:50'),('291d684d-b4f9-4c48-bb80-2a240745f977','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMzQ1NzU4OCwiZXhwIjoxNzIzNTQzOTg4fQ.HUFzUu3mwAchyrX-v5RRJUtJmltlANXB4lOQAx_wY04','b0d8e377-87f9-4361-8132-87db13d19e91','2024-08-12 15:43:08'),('2c19cb6a-e376-4486-ad0d-8728f515b8da','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyNDA2MjM2NCwiZXhwIjoxNzI0MTQ4NzY0fQ.3yXLdIb867Mtt3k2d41MfH2gkmn3EkwCNNy2sgwxdNk','b0d8e377-87f9-4361-8132-87db13d19e91','2024-08-19 15:42:44'),('2de76f80-5c9d-4d27-9519-121455fd4ae6','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzIzNDUzNjI5LCJleHAiOjE3MjM1NDAwMjl9.HD7EeomHA-bSE8VeTUc29HLd5k_Z4SaFrPzS5Tfx3dc','721f14db-804c-4c37-8a87-8d5665df2425','2024-08-12 14:37:09'),('2fe09347-a1c1-461b-89f1-bda388acf3ab','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMTkwMjgxOCwiZXhwIjoxNzIxOTg5MjE4fQ.aADhddXB1Q4EPkYmhTK74Jvz_mc9KuPV85v16gA9G5s','b0d8e377-87f9-4361-8132-87db13d19e91','2024-07-25 15:50:18'),('330aa3c7-4b5b-426a-926f-d667b0f6dc4c','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzIzNzkyMDcwLCJleHAiOjE3MjM4Nzg0NzB9.DwgC5a4mxxy0iiFAYwbGDqXsYe1VMGCHR9auVoczY_A','721f14db-804c-4c37-8a87-8d5665df2425','2024-08-16 12:37:50'),('3595b398-e424-4ec6-80d9-97e11487bbef','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzIzNzkyNDIyLCJleHAiOjE3MjM4Nzg4MjJ9.oPiuYZlG5chDbIB2TAMAL8Z6Y4jg5A_qok6y1CCHqhs','721f14db-804c-4c37-8a87-8d5665df2425','2024-08-16 12:43:42'),('3fc16b69-2493-44b0-a9a3-af559b74bef4','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzIyNTE1MjM3LCJleHAiOjE3MjI2MDE2Mzd9.aTYewkZV6TWXv63ehxgQNQ7yTMEEA1lruOOOX7LEIeg','721f14db-804c-4c37-8a87-8d5665df2425','2024-08-01 17:57:17'),('427bc96d-282b-4fc2-aa2d-068d0865f921','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzIzNDU0OTU1LCJleHAiOjE3MjM1NDEzNTV9.3fez9ptgrOIZOvb8KwJRgvxKJvSegHOwN279_McCnlY','721f14db-804c-4c37-8a87-8d5665df2425','2024-08-12 14:59:15'),('436e3ac5-7951-42a8-aad7-9893ad28a165','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzIxOTAxMDYwLCJleHAiOjE3MjE5ODc0NjB9.OUGcaECay_vyP44Qspj4Ow-1Xcc6Q7liz8G6CL9vcto','721f14db-804c-4c37-8a87-8d5665df2425','2024-07-25 15:21:00'),('45d5d408-23e4-4efd-86ad-d70e25d150bd','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzIxOTA2OTA1LCJleHAiOjE3MjE5OTMzMDV9.lY0krtrNT5azhE9YGDJqMFN1b_m8gBespIfBQ-XyWi0','721f14db-804c-4c37-8a87-8d5665df2425','2024-07-25 16:58:25'),('4cc89598-2038-48c1-867e-8b50dac24da9','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMzQ1Mzk4MCwiZXhwIjoxNzIzNTQwMzgwfQ.lFrNnMt8mbQSUrz_VvNtLQqhd8HLBUjYJAYhRfxPvVs','b0d8e377-87f9-4361-8132-87db13d19e91','2024-08-12 14:43:00'),('50d2f600-add5-4470-8d63-cde024c1a2ea','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMzQzNzU3OCwiZXhwIjoxNzIzNTIzOTc4fQ.zZlz2Rd4C12r9cpwCHzWUyyQxFUxPQbVeUTIxTLCBV4','b0d8e377-87f9-4361-8132-87db13d19e91','2024-08-12 10:09:38'),('5139d566-97cd-45e5-9a0c-540dbe357cb2','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyNDIxNzUxNSwiZXhwIjoxNzI0MzAzOTE1fQ.8C-THKFz25HoziiuoUsMor6XIMPGgcRCQUXTXC4lfS8','b0d8e377-87f9-4361-8132-87db13d19e91','2024-08-21 10:48:35'),('5183ce79-8353-4b3f-b2e2-07b929475382','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzI0MTM3NjYxLCJleHAiOjE3MjQyMjQwNjF9.jWwihCNGoAQ5rk0Q4SR98G0gUtRuX3w1KGx4t2Sfyqs','721f14db-804c-4c37-8a87-8d5665df2425','2024-08-20 12:37:42'),('51df5e40-a20c-4d2a-9883-a56a460c206a','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzIzNDUzOTY0LCJleHAiOjE3MjM1NDAzNjR9.S8b4V7b30Jp7yj0Pz6RbONTXl9qX5QxqMOT6EE6UkKw','721f14db-804c-4c37-8a87-8d5665df2425','2024-08-12 14:42:44'),('5fe60c68-426b-4a46-8b40-851e441faacc','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzIxOTAzMzQyLCJleHAiOjE3MjE5ODk3NDJ9.UR-WO6zGHSZuwWnIGQicu3LkJU_Rwg-U-mgvCuWIASY','721f14db-804c-4c37-8a87-8d5665df2425','2024-07-25 15:59:02'),('60581f67-9998-4148-9d7c-2821b13db67d','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzI0MDY1NjI0LCJleHAiOjE3MjQxNTIwMjR9.86DpPVg3PmLFYAGPA-1xtv9r67Esbim3u3FFwtaYnMc','721f14db-804c-4c37-8a87-8d5665df2425','2024-08-19 16:37:04'),('652b7835-794a-421b-bf7d-8ddc1bd6727d','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMTkwNjg0MywiZXhwIjoxNzIxOTkzMjQzfQ.4UVDpcR1_mmWJWYrvUYEV7-k98rRNHemHmNhLqSDq30','b0d8e377-87f9-4361-8132-87db13d19e91','2024-07-25 16:57:23'),('664ed631-9287-44fa-93b9-6ccb96207c0c','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzIzNzkxOTA3LCJleHAiOjE3MjM4NzgzMDd9.31rkLSgFCnV1_HvMjpyAmDK8dK5gEL-gZzuLOB5KPFs','721f14db-804c-4c37-8a87-8d5665df2425','2024-08-16 12:35:07'),('67b297fa-cd57-4695-a9a7-8bbf0f364755','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyNDIyMjczMywiZXhwIjoxNzI0MzA5MTMzfQ.Fqq6OAP3MFTE9d52NiFw47HkjDyM-kV1qV3OR5jAWU8','b0d8e377-87f9-4361-8132-87db13d19e91','2024-08-21 12:15:33'),('68e76ba6-3acd-45ba-983f-4e677939d21d','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMjU3NDQ0OSwiZXhwIjoxNzIyNjYwODQ5fQ.c6EuNiYQhdc-Tiu83u8F7D7VDq2QFR2ygFOZf6lOr5o','b0d8e377-87f9-4361-8132-87db13d19e91','2024-08-02 10:24:10'),('6a0b728e-41a7-4758-ab10-b37de3c05d28','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzI0MjI0MDM4LCJleHAiOjE3MjQzMTA0Mzh9.CeBWPkLVnLU1UNOzsr0Uk0UX29zkwE0YMKfbXIPhE-8','721f14db-804c-4c37-8a87-8d5665df2425','2024-08-21 12:37:18'),('6bb75e6a-7ead-4c69-b8e5-07e7ec01f762','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzIzNDM3NTAyLCJleHAiOjE3MjM1MjM5MDJ9.g0ms2-8U_r0mGMe7TATSxxAP7CBYrB4IfvCMxojhFZQ','721f14db-804c-4c37-8a87-8d5665df2425','2024-08-12 10:08:22'),('6d5eb5dc-97f9-4f4a-8ede-c614388edc6b','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMTkwMDg2NSwiZXhwIjoxNzIxOTg3MjY1fQ.A_WzavUpYt4bYnwjnkxy6_OKoGzEudUFIgYFsP-Clq4','b0d8e377-87f9-4361-8132-87db13d19e91','2024-07-25 15:17:45'),('7158caed-30c6-4f62-a11d-a7b39a67e21f','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyNDA2NTkwNywiZXhwIjoxNzI0MTUyMzA3fQ.wE585PZRCLH8rNG_equsNrEesz1FEWlya0_wyc4GLQ4','b0d8e377-87f9-4361-8132-87db13d19e91','2024-08-19 16:41:47'),('773cc43a-f4e0-4da9-8717-0ac18df321a2','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMzQ1OTI5OCwiZXhwIjoxNzIzNTQ1Njk4fQ.IC239wE1W_rSs6RSxqHupZIi1DaRz8taJ8-m2kLXE5E','b0d8e377-87f9-4361-8132-87db13d19e91','2024-08-12 16:11:38'),('7deef020-791a-471d-80b5-bc22862492af','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzI0MjQxNjQ5LCJleHAiOjE3MjQzMjgwNDl9.nu6okLJqFuVvU7pkevYxPSJAw2fHO31mNMyjcioDEec','721f14db-804c-4c37-8a87-8d5665df2425','2024-08-21 17:30:49'),('7f7c6cd4-9583-489f-a146-4d9923663797','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyNDIzODQ1NiwiZXhwIjoxNzI0MzI0ODU2fQ.Frn0bX9b7FdPmWceiERb0NE55XnlwTdVJyUasF3-4Dc','b0d8e377-87f9-4361-8132-87db13d19e91','2024-08-21 16:37:36'),('80238631-8d2a-4b1a-a0ba-1e899cf5c5b5','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyNDEzNzcyMSwiZXhwIjoxNzI0MjI0MTIxfQ.3DGhyYpBA71UiTaJALiot3xzheGq4DTvxgJq0RoOfcg','b0d8e377-87f9-4361-8132-87db13d19e91','2024-08-20 12:38:41'),('823ea5ec-2ad7-4b86-a7cf-43f6cf22a804','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzI0MDYyMjYyLCJleHAiOjE3MjQxNDg2NjJ9.PlOCCDGKH2olsJ0vBMmvZ0_1fWe6S7QoLC8wSZoE9xU','721f14db-804c-4c37-8a87-8d5665df2425','2024-08-19 15:41:03'),('906b05a9-f18c-43f7-86e0-f287655a964e','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMjM0MTk2NywiZXhwIjoxNzIyNDI4MzY3fQ.nIQ3SMXPh0PtgtC0stF1ChVtpbGs-f7FlNtATy36RzA','b0d8e377-87f9-4361-8132-87db13d19e91','2024-07-30 17:49:27'),('90da911e-09ea-4972-a57f-f9ec28b028d7','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzIzNDUyOTI0LCJleHAiOjE3MjM1MzkzMjR9.t21Pyut0GKcENwmOeeGMIJ7bUPoy9ECYe_t3LQ3Yb1A','721f14db-804c-4c37-8a87-8d5665df2425','2024-08-12 14:25:24'),('9571ddd7-ce0c-458b-adb9-cbe58f954667','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMTkwMjA5OCwiZXhwIjoxNzIxOTg4NDk4fQ.mI8rUl13D57BQsHgnjfRN0BiJAOvLtQD1SOrl0NtiyQ','b0d8e377-87f9-4361-8132-87db13d19e91','2024-07-25 15:38:18'),('966a90b0-0aa0-446a-97aa-f463b498d986','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzIzNzkxMDE3LCJleHAiOjE3MjM4Nzc0MTd9.TB2YBofjcbA2QKfhXcKuzvNkuc5OUuFHjPNXvxPuW0U','721f14db-804c-4c37-8a87-8d5665df2425','2024-08-16 12:20:17'),('97d68aaa-a5dc-456d-8376-084c946f9d3d','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzI0MTU3ODk1LCJleHAiOjE3MjQyNDQyOTV9.NxOFuvtUHsUMsh78vTefKhNXXpPCYejaD6bNEHNhP28','721f14db-804c-4c37-8a87-8d5665df2425','2024-08-20 18:14:55'),('9c3817c8-db49-4003-bed4-36b0bd4c6482','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMzQ0NjA0NSwiZXhwIjoxNzIzNTMyNDQ1fQ.Y9924nXMv2J8GBnrNOnxaGxtcXqKpOBpYak-5ptrHM4','b0d8e377-87f9-4361-8132-87db13d19e91','2024-08-12 12:30:45'),('9d93c54c-67be-44e0-af42-e590f921d76a','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMzQ1NzkwNCwiZXhwIjoxNzIzNTQ0MzA0fQ.Wr1C-IF5Jqkvp0G9RWmMSrST2M_vTCYeArWfUskWq2A','b0d8e377-87f9-4361-8132-87db13d19e91','2024-08-12 15:48:24'),('9e4f2d56-a0cc-444e-b846-fdb9598d7ad3','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyNDA2NTQ1NywiZXhwIjoxNzI0MTUxODU3fQ.6qMR2Z_s9eCowpNoTcO6MEA10QpMW64EuBkB68xEKf0','b0d8e377-87f9-4361-8132-87db13d19e91','2024-08-19 16:34:17'),('a119bb9a-0c18-41ab-aee6-afd297b17eec','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMTkwMjI3MywiZXhwIjoxNzIxOTg4NjczfQ.qwGmqTRxE4Sm8N-D-XtG8AKFi9yBCaRxqRJbS4Il4dA','b0d8e377-87f9-4361-8132-87db13d19e91','2024-07-25 15:41:13'),('a56cd8af-6c55-4b8d-83f1-677944733824','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhYmNhZmFkLTExZTUtNGUyNC1iNDg1LTY2OTJmNjI2NWYzMSIsInVzZXJuYW1lIjoiYWRhZGEiLCJlbWFpbCI6ImFkYWRhQGdtYWlsLmNvbSIsImlhdCI6MTcyNDIzNTIwMCwiZXhwIjoxNzI0MzIxNjAwfQ.c5rqaqJNN07E_jnLCXWKXSTMUqwpYapW5vEfC-xBIrk','6abcafad-11e5-4e24-b485-6692f6265f31','2024-08-21 15:43:20'),('bc77f7d0-06c9-4416-bd5f-3c70ec1322e2','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzIzNDQ2MDE0LCJleHAiOjE3MjM1MzI0MTR9.giL4QNS9VesShCnQN5c8cSotopSrvheOtraNbsh-HOU','721f14db-804c-4c37-8a87-8d5665df2425','2024-08-12 12:30:15'),('c01c7abd-9428-4cc4-8c60-9b80a88409f5','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMzQ1NzYxMiwiZXhwIjoxNzIzNTQ0MDEyfQ.so7ZbPsEL45mgtgUW4jY_XjKqVaR4M2Rx4RfzcEyDLg','b0d8e377-87f9-4361-8132-87db13d19e91','2024-08-12 15:43:32'),('c707c70e-a2a9-4d25-a12d-9c049ba954b2','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMTk4MzY1MywiZXhwIjoxNzIyMDcwMDUzfQ.3UNJyNrDF6XeE1_VhxEEkmncGNH_x-YrCsndFrzrGVE','b0d8e377-87f9-4361-8132-87db13d19e91','2024-07-26 14:17:33'),('c9b58940-c709-45ec-b219-a0f58579a7d0','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzIzNDUzNzEzLCJleHAiOjE3MjM1NDAxMTN9.1n3NqlyAaxud0fg_or1rknxF7SKv405tY4--FRkbP7g','721f14db-804c-4c37-8a87-8d5665df2425','2024-08-12 14:38:33'),('cc0de185-7f0b-4367-9bad-dafb4dcd7212','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzIzNDU2NDYyLCJleHAiOjE3MjM1NDI4NjJ9.j9ABE_E-10YJllHVmGsNAkwxq_rukwCiL8KVzmB4psY','721f14db-804c-4c37-8a87-8d5665df2425','2024-08-12 15:24:22'),('cd9719cf-1760-4560-b471-022be91a9764','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyNDIyMjAzMSwiZXhwIjoxNzI0MzA4NDMxfQ.0nHqxqsKMsXgSZmfsa7b8Hzdc-hFXBXCKbOqLELWDMk','b0d8e377-87f9-4361-8132-87db13d19e91','2024-08-21 12:03:51'),('cf2bb3bc-3b73-46f1-820e-863d63f0aa21','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyNDEyNjI4MiwiZXhwIjoxNzI0MjEyNjgyfQ.RxIjxTr5IP-YRGhfBiQ9OMr4X0kWs9xZKvOpPSGat5o','b0d8e377-87f9-4361-8132-87db13d19e91','2024-08-20 09:28:02'),('d1ea860e-67e8-433c-b3fc-a857c46b2475','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMjMxMzIwOSwiZXhwIjoxNzIyMzk5NjA5fQ.oK7kAE3ZxgJTu4Cj6lB9VhDWQ3qCDlxMyBzealZzY4c','b0d8e377-87f9-4361-8132-87db13d19e91','2024-07-30 09:50:09'),('deeb67f1-f1c6-4b1b-bb09-e058c49b5897','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzIzNzkxMDcxLCJleHAiOjE3MjM4Nzc0NzF9.PCREuTtohqyVrIaedEwNEVZ_mKFV08C3BuYN_ikD7vI','721f14db-804c-4c37-8a87-8d5665df2425','2024-08-16 12:21:11'),('eebfa5c9-9f90-43a7-ac0a-d8bfee14d6e7','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMyMzZjMmM3LTY5NmMtNGE2NS04NGZkLTAyZTdiMmViOWZjZCIsInVzZXJuYW1lIjoieXV2aSIsImVtYWlsIjoieXV2aUBnbWFpbC5jb20iLCJpYXQiOjE3MjM0MzkzNjAsImV4cCI6MTcyMzUyNTc2MH0.s3UtNXiWYTEQ_a968A5_z-r1FgakyCeCHFwT-4Njvoc','3236c2c7-696c-4a65-84fd-02e7b2eb9fcd','2024-08-12 10:39:20'),('f1c8bc00-c039-4e4a-a2d7-e1db6f303892','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcyMWYxNGRiLTgwNGMtNGMzNy04YTg3LThkNTY2NWRmMjQyNSIsInVzZXJuYW1lIjoiYWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAZ21haWwuY29tIiwiaWF0IjoxNzIzNDU4MTkyLCJleHAiOjE3MjM1NDQ1OTJ9.QFHMvKAaI2XIwlc7_xzjMr8sElWSTWFB4bHCKj8q9B0','721f14db-804c-4c37-8a87-8d5665df2425','2024-08-12 15:53:12'),('fa3f63b3-1802-4c9b-b8a7-7eb6ef2ed6d2','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMjIyNjc0OSwiZXhwIjoxNzIyMzEzMTQ5fQ.dNV3_CH_UOjf5qXWgxPusAQFoVL3k_iUDfet1Ls1nR4','b0d8e377-87f9-4361-8132-87db13d19e91','2024-07-29 09:49:09'),('fb52b42d-88a5-47f9-86d3-e5b3a66f09e3','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMzc5MDY3MiwiZXhwIjoxNzIzODc3MDcyfQ.uLKlsMIjwA8rnkr58TfktJ_IGyvxk9GwfqXBRV8pOE0','b0d8e377-87f9-4361-8132-87db13d19e91','2024-08-16 12:14:32'),('ffa81eff-a17a-4fee-8445-4dbb2e318c3f','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIwZDhlMzc3LTg3ZjktNDM2MS04MTMyLTg3ZGIxM2QxOWU5MSIsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMTk3MDM5MiwiZXhwIjoxNzIyMDU2NzkyfQ.RDGiy7U2biPQxkBbX0N8i0UFwJ1GbYdIdo9xQO6wiLg','b0d8e377-87f9-4361-8132-87db13d19e91','2024-07-26 10:36:32');
/*!40000 ALTER TABLE `active_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appliedjobs`
--

DROP TABLE IF EXISTS `appliedjobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appliedjobs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jobid` varchar(255) NOT NULL,
  `userid` varchar(255) NOT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  `dateofapplied` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `job_id_idx` (`jobid`),
  KEY `user_id_idx` (`userid`),
  CONSTRAINT `appliedjobs_job_id_fk` FOREIGN KEY (`jobid`) REFERENCES `job_details` (`id`),
  CONSTRAINT `appliedjobs_user_id_fk` FOREIGN KEY (`userid`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appliedjobs`
--

LOCK TABLES `appliedjobs` WRITE;
/*!40000 ALTER TABLE `appliedjobs` DISABLE KEYS */;
INSERT INTO `appliedjobs` VALUES (3,'063b0db5-663c-4586-83ac-387c1fbf8dd0','721f14db-804c-4c37-8a87-8d5665df2425','Accepted','2024-08-01 12:22:53'),(4,'063b0db5-663c-4586-83ac-387c1fbf8dd0','b0d8e377-87f9-4361-8132-87db13d19e91','Pending','2024-08-02 05:23:59'),(5,'063b0db5-663c-4586-83ac-387c1fbf8dd0','3236c2c7-696c-4a65-84fd-02e7b2eb9fcd','Pending','2024-08-12 06:31:48'),(6,'2a0e2fff-1bfb-4aa3-8872-fa3bb087e052','721f14db-804c-4c37-8a87-8d5665df2425','Pending','2024-08-12 07:00:21'),(7,'99f7e897-01a8-4280-87b4-fb348b873536','721f14db-804c-4c37-8a87-8d5665df2425','Pending','2024-08-19 10:11:30'),(8,'063b0db5-663c-4586-83ac-387c1fbf8dd0','6b182882-fe99-4b42-9ba5-f7e01c87047f','Pending','2024-08-21 07:08:56');
/*!40000 ALTER TABLE `appliedjobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categoryname` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_name_idx` (`categoryname`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Design'),(2,'Marketing'),(4,'Sales');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_details`
--

DROP TABLE IF EXISTS `job_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_details` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `salary` varchar(255) NOT NULL,
  `dateOfPost` date NOT NULL,
  `lastDate` date NOT NULL,
  `locationId` int DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `skills` int DEFAULT NULL,
  `experience` varchar(255) DEFAULT NULL,
  `jobType` varchar(255) DEFAULT NULL,
  `education` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_details_location_fk` (`locationId`),
  KEY `job_details_category_fk` (`categoryId`),
  CONSTRAINT `job_details_category_fk` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `job_details_location_fk` FOREIGN KEY (`locationId`) REFERENCES `location` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_details`
--

LOCK TABLES `job_details` WRITE;
/*!40000 ALTER TABLE `job_details` DISABLE KEYS */;
INSERT INTO `job_details` VALUES ('063b0db5-663c-4586-83ac-387c1fbf8dd0','Software Testing','Test the software','2.5-3lpa','2024-08-01','2024-08-15',3,1,NULL,NULL,NULL,NULL),('2a0e2fff-1bfb-4aa3-8872-fa3bb087e052','React Developer','cweci cew9h vcwenv','3-5lpa','2024-08-01','2024-08-15',5,1,NULL,'0-2','full time','Any graduation'),('49f1d01a-0f84-4985-93f0-f02d5cb7233b','whjevfhw','vwhrqjvewjhfb','2-4lpa','2024-08-20','2024-08-30',4,1,NULL,'0-2','dfvwqrehjwef','ewfrwqfqwrg'),('99f7e897-01a8-4280-87b4-fb348b873536','developer',' sagcjas ','3-5lpa','2024-08-02','2024-08-16',5,2,NULL,'0-1','parttime','b.e'),('ddc2f003-0a5a-4230-8b93-25da628414ad','Sales MAnager',' ewhjbfjw vcqwjhqr v','5-7lpa','2024-08-19','2024-08-29',6,4,NULL,'0-1','full time','degree');
/*!40000 ALTER TABLE `job_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_details_skills`
--

DROP TABLE IF EXISTS `job_details_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_details_skills` (
  `jobDetailsId` varchar(255) NOT NULL,
  `skillId` int NOT NULL,
  PRIMARY KEY (`jobDetailsId`,`skillId`),
  KEY `skillId` (`skillId`),
  CONSTRAINT `job_details_skills_ibfk_1` FOREIGN KEY (`jobDetailsId`) REFERENCES `job_details` (`id`) ON DELETE CASCADE,
  CONSTRAINT `job_details_skills_ibfk_2` FOREIGN KEY (`skillId`) REFERENCES `skills` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_details_skills`
--

LOCK TABLES `job_details_skills` WRITE;
/*!40000 ALTER TABLE `job_details_skills` DISABLE KEYS */;
INSERT INTO `job_details_skills` VALUES ('2a0e2fff-1bfb-4aa3-8872-fa3bb087e052',1),('99f7e897-01a8-4280-87b4-fb348b873536',1),('ddc2f003-0a5a-4230-8b93-25da628414ad',1),('2a0e2fff-1bfb-4aa3-8872-fa3bb087e052',2),('99f7e897-01a8-4280-87b4-fb348b873536',2),('063b0db5-663c-4586-83ac-387c1fbf8dd0',5),('49f1d01a-0f84-4985-93f0-f02d5cb7233b',5),('063b0db5-663c-4586-83ac-387c1fbf8dd0',6),('49f1d01a-0f84-4985-93f0-f02d5cb7233b',6),('99f7e897-01a8-4280-87b4-fb348b873536',6);
/*!40000 ALTER TABLE `job_details_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_details_skills_skills`
--

DROP TABLE IF EXISTS `job_details_skills_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_details_skills_skills` (
  `jobDetailsId` varchar(255) NOT NULL,
  `skillId` int NOT NULL,
  PRIMARY KEY (`jobDetailsId`,`skillId`),
  KEY `skillId` (`skillId`),
  CONSTRAINT `job_details_skills_skills_ibfk_1` FOREIGN KEY (`jobDetailsId`) REFERENCES `job_details` (`id`) ON DELETE CASCADE,
  CONSTRAINT `job_details_skills_skills_ibfk_2` FOREIGN KEY (`skillId`) REFERENCES `skills` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_details_skills_skills`
--

LOCK TABLES `job_details_skills_skills` WRITE;
/*!40000 ALTER TABLE `job_details_skills_skills` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_details_skills_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `id` int NOT NULL AUTO_INCREMENT,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `location_name_idx` (`city`,`country`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (3,'Bengaluru','India'),(2,'Chennai','India'),(5,'Mumbai','India'),(6,'Mysuru','India'),(7,'noida','india'),(4,'Trivandrum','India');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `profileId` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `city` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `education` varchar(100) DEFAULT NULL,
  `skills` text,
  `description` text,
  PRIMARY KEY (`profileId`),
  UNIQUE KEY `email_idx` (`email`),
  KEY `profile_user_id_idx` (`userId`),
  CONSTRAINT `profile_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (1,'721f14db-804c-4c37-8a87-8d5665df2425','aditya','aditya@gmail.com','9535951784','Male','Bengaluru','india','engineering','react, node','cEQEvwv frbwthntw'),(2,'3236c2c7-696c-4a65-84fd-02e7b2eb9fcd','yuva','yuvi@gmail.com','1234567890','Male','Bengaluru','India','Degree','React, Javascript, html, css',' ndwvbjh vhqhvrvq ver jbjh j'),(3,'6b182882-fe99-4b42-9ba5-f7e01c87047f','vreqhgvjerv','bhumika@gmail.com','9876543212','Female','bengaluru','India','Degreedvv','React, node, dwe','gec1vcjr3vrv');
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` varchar(255) NOT NULL,
  `name` text NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('1','admin','2024-07-25 15:14:16'),('2','user','2024-07-25 15:14:21');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `skill` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `skills_name_idx` (`skill`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (6,'Automation Testing'),(5,'Manual Testing'),(2,'Node.js'),(1,'React.js');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(250) NOT NULL,
  `username` text NOT NULL,
  `email` text,
  `password` text,
  `user_role` varchar(255) DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `security_question` varchar(255) DEFAULT NULL,
  `security_answer` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_role_idx` (`user_role`),
  CONSTRAINT `user_role` FOREIGN KEY (`user_role`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('3236c2c7-696c-4a65-84fd-02e7b2eb9fcd','yuvi','yuvi@gmail.com','$2a$10$S6rIE1RsiPF8C5mk29WmUuCaJ0SYEOccq.tPTxpW94ItbDe6zUU26','2','2024-08-12 10:39:07',NULL,NULL),('6abcafad-11e5-4e24-b485-6692f6265f31','adada','adada@gmail.com','$2a$10$SsG4TiLThIGG2XY3aoxkF.9xCtuLvP2nrZnUiNlzvBtIeLP5jso3W','2','2024-08-21 14:16:53','What was the name of your first pet?','dog'),('6b182882-fe99-4b42-9ba5-f7e01c87047f','bhumika','bhumika@gmail.com','$2a$10$bxelymuPW5cdhFHLdR2kQebH7suKTrw4xTW79SVK/8RV8OU9fLaPe','2','2024-08-21 12:38:35',NULL,NULL),('721f14db-804c-4c37-8a87-8d5665df2425','aditya','aditya@gmail.com','$2a$10$T80kuY2.eLj.hKvhpHCdd.HJZ95uMfSNC98cmHo5Ut.JxNhSVaMBe','2','2024-07-25 15:20:49',NULL,NULL),('b0d8e377-87f9-4361-8132-87db13d19e91','admin','admin@gmail.com','$2a$10$nhDBVsk06zwFknI0ACBTdO5izsmNOjMvNCitMy6SOEYdBbO3vVv4W','1','2024-07-25 15:17:16',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-21 17:47:32
