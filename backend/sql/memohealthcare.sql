-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Gen 16, 2026 alle 01:59
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `memohealthcare`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `appointments`
--

CREATE TABLE `appointments` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `titolo` varchar(100) NOT NULL,
  `data` date NOT NULL,
  `ora` time NOT NULL,
  `note` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `appointments`
--

INSERT INTO `appointments` (`id`, `user_id`, `titolo`, `data`, `ora`, `note`) VALUES
(1, 7, 'Visita cardiologica', '2025-01-10', '09:30:00', 'Controllo annuale'),
(2, 7, 'Controllo pressione', '2025-01-20', '11:00:00', 'Portare esami precedenti'),
(3, 7, 'Visita dal medico di base', '2025-02-05', '10:15:00', 'Rinnovo ricetta'),
(4, 8, 'Visita ginecologica', '2025-01-12', '14:00:00', 'Controllo periodico'),
(5, 8, 'Visita oculistica', '2025-01-25', '16:30:00', 'Portare occhiali'),
(6, 8, 'Controllo tiroide', '2025-02-08', '09:00:00', 'A digiuno'),
(7, 9, 'Visita ortopedica', '2025-01-15', '10:00:00', 'Dolore al ginocchio'),
(8, 9, 'Controllo post-operatorio', '2025-01-28', '11:45:00', 'Portare referti'),
(9, 9, 'Visita pneumologica', '2025-02-12', '15:00:00', 'Ex fumatore');

-- --------------------------------------------------------

--
-- Struttura della tabella `esami`
--

CREATE TABLE `esami` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `nome_esame` varchar(100) NOT NULL,
  `data` date NOT NULL,
  `ora` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `esami`
--

INSERT INTO `esami` (`id`, `user_id`, `nome_esame`, `data`, `ora`) VALUES
(1, 7, 'Analisi del sangue', '2025-01-08', '08:00:00'),
(2, 7, 'Elettrocardiogramma', '2025-01-18', '09:30:00'),
(3, 7, 'Colesterolo', '2025-02-01', '08:15:00'),
(4, 8, 'Pap test', '2025-01-10', '10:00:00'),
(5, 8, 'Analisi ormonali', '2025-01-22', '08:00:00'),
(6, 8, 'Ecografia tiroide', '2025-02-05', '11:30:00'),
(7, 9, 'Risonanza magnetica', '2025-01-14', '13:00:00'),
(8, 9, 'RX ginocchio', '2025-01-26', '09:00:00'),
(9, 9, 'Spirometria', '2025-02-10', '10:30:00');

-- --------------------------------------------------------

--
-- Struttura della tabella `reminders`
--

CREATE TABLE `reminders` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `farmaco` varchar(100) NOT NULL,
  `frequenza` varchar(255) DEFAULT NULL,
  `orario` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `reminders`
--

INSERT INTO `reminders` (`id`, `user_id`, `farmaco`, `frequenza`, `orario`) VALUES
(3, 9, 'Paracetamolo', '3 volte al giorno', '08:00:00'),
(4, 8, 'Ibuprofene', '3 volte al giorno', '09:00:00'),
(5, 8, 'Amoxicillina', '2 volte al giorno', '13:00:00'),
(6, 8, 'Vitamina C', '1 volta al giorno', '18:00:00'),
(7, 7, 'Aspirina', '1 volta al giorno', '07:00:00'),
(8, 7, 'Metformina', '1 volta al giorno', '12:00:00'),
(9, 7, 'Lisinopril', '1 volta al giorno', '20:00:00'),
(10, 7, 'Omega 3', '1 volta al giorno', '21:00:00'),
(11, 9, 'Paracetamolo', '3 volte al giorno', '14:00:00'),
(12, 9, 'Paracetamolo', '3 volte al giorno', '20:00:00'),
(13, 8, 'Ibuprofene', '3 volte al giorno', '15:00:00'),
(14, 8, 'Ibuprofene', '3 volte al giorno', '21:00:00'),
(15, 8, 'Amoxicillina', '2 volte al giorno', '20:00:00');

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `codice_fiscale` varchar(16) NOT NULL,
  `pin` varchar(255) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cognome` varchar(100) NOT NULL,
  `data_nascita` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`id`, `codice_fiscale`, `pin`, `nome`, `cognome`, `data_nascita`) VALUES
(7, 'ABCDEF12G34H567I', '$2b$10$VIm.LrW0JTtojsiDBbpZ..Fgedv4bL1qYjZxjYyAqGuF2SuuNJHKG', 'Mario ', 'Rossi', '1990-05-18'),
(8, 'LMNOPQ56R78S901T', '$2b$10$ldSTXjcMjJS4Z8.m/6X0ve1wQZybFGLAtnfO0RGlP0K/3WUvsKPvW', 'Lucia ', 'Bianchi', '1985-11-15'),
(9, 'UVWXYZ90A12B345C', '$2b$10$E6dk1/2kHca9pozfTP6nGenSGZ7aOVvkolNXW1ZYL2rNbwWODFwh.', 'Giuseppe ', 'Verdi', '1978-02-27');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_appointments_user` (`user_id`);

--
-- Indici per le tabelle `esami`
--
ALTER TABLE `esami`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_esami_user` (`user_id`);

--
-- Indici per le tabelle `reminders`
--
ALTER TABLE `reminders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codice_fiscale` (`codice_fiscale`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT per la tabella `esami`
--
ALTER TABLE `esami`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT per la tabella `reminders`
--
ALTER TABLE `reminders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `fk_appointments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Limiti per la tabella `esami`
--
ALTER TABLE `esami`
  ADD CONSTRAINT `fk_esami_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Limiti per la tabella `reminders`
--
ALTER TABLE `reminders`
  ADD CONSTRAINT `reminders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
