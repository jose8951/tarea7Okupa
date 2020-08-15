-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-05-2020 a las 12:02:55
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `morosos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anunciantes`
--

CREATE TABLE `anunciantes` (
  `login` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(128) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `bloqueado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `anunciantes`
--

INSERT INTO `anunciantes` (`login`, `password`, `email`, `bloqueado`) VALUES
('usu1', '$2y$10$xNx0I/xlJokvEMPpiM2zEOJwV8L6gBXpBPt.u2nXLKsfI8PoIOQIS', 'usu1@usu1.es', 0),
('usu2', '$2y$10$THXFv7LFXvivXHDFWPKaO.1jX1MZer09klu.jnEqTLUnlSVHjEfBW', 'usu2@usu2.com', 0),
('usu3', '$2y$10$X6NwhC7ULp6smUFpTFCaW.R8gHv3x9dUvZ1y1ZoYthXy73oBjQiHe', 'usu3@usu3.com', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anuncios`
--

CREATE TABLE `anuncios` (
  `id_anuncio` int(11) NOT NULL,
  `autor` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `moroso` varchar(60) COLLATE utf8_spanish_ci NOT NULL,
  `localidad` varchar(60) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(500) COLLATE utf8_spanish_ci NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `anuncios`
--

INSERT INTO `anuncios` (`id_anuncio`, `autor`, `moroso`, `localidad`, `descripcion`, `fecha`) VALUES
(88, 'usu1', 'Maria', 'Av carlos de haya 29010 Málaga, Málaga, España', 'casa ocupada 23', '2020-11-01'),
(116, 'usu1', 'maria', 'Calle larios, 29015 Málaga, Málaga, España', 'casa ocupaka 2uuuuu', '2020-05-14'),
(117, 'usu2', 'Carlos', 'Av Carlos Haya, 29010 Málaga, Málaga, Spain', 'casa okupa 34', '2020-05-28'),
(119, 'usu1', 'el paco', 'Av carlos de haya 29010 Málaga, Málaga, España', 'Casa okupada 34', '2020-04-07');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `anunciantes`
--
ALTER TABLE `anunciantes`
  ADD PRIMARY KEY (`login`);

--
-- Indices de la tabla `anuncios`
--
ALTER TABLE `anuncios`
  ADD PRIMARY KEY (`id_anuncio`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `anuncios`
--
ALTER TABLE `anuncios`
  MODIFY `id_anuncio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=237;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
