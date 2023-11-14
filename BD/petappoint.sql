-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-11-2023 a las 06:23:04
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `petappoint`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consulta`
--

CREATE TABLE `consulta` (
  `idConsulta` int(4) NOT NULL,
  `fecha` datetime NOT NULL,
  `nombreAnimal` varchar(100) NOT NULL,
  `nombreCliente` varchar(20) NOT NULL,
  `rutCliente` varchar(12) NOT NULL,
  `telefonoCliente` int(9) NOT NULL,
  `emailVet` varchar(100) NOT NULL,
  `tipoConsulta` varchar(25) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `consulta`
--

INSERT INTO `consulta` (`idConsulta`, `fecha`, `nombreAnimal`, `nombreCliente`, `rutCliente`, `telefonoCliente`, `emailVet`, `tipoConsulta`, `descripcion`) VALUES
(23, '2023-11-22 12:45:00', 'Negrita', 'Pedro Pascal', '5.588.181-2', 923451234, 'jose@example', 'Cirugia esterilización', 'Dar Seguimiento'),
(25, '2024-02-25 15:45:00', 'Roslyn', 'Duran Avery', '9.170.289-4', 945911903, 'juan@example', 'Consulta veterinaria', 'Minim dolore est ipsum ea eiusmod duis. Cillum est velit officia id eiusmod sunt. Do ex est do non adipisicing ut. Duis cupidatat sunt amet reprehenderit anim est veniam velit aute id laboris aliqua proident. Deserunt consectetur commodo dolor anim laborum duis est incididunt ipsum et. Dolor irure culpa tempor duis ex ea tempor aliqua consequat non qui dolor sit.\r\n'),
(26, '2024-08-23 15:45:00', 'Darcy', 'Norman Huffman', '7.276.576-7', 945873768, 'juan@example', 'Consulta veterinaria', 'Id laborum anim magna sint fugiat est nisi labore eiusmod eu. Officia excepteur magna exercitation consectetur commodo ad sit sunt velit. Velit non exercitation proident labore ut anim exercitation consectetur quis quis elit. Ullamco veniam laborum proident consectetur qui eu consectetur pariatur sint laboris labore cillum eu. Nisi nulla sunt enim reprehenderit est officia dolor laborum sunt do sunt.\r\n'),
(27, '2024-07-30 15:45:00', 'Ann', 'Vasquez Ewing', '15.412.679-6', 999711706, 'jose@example', 'Consulta veterinaria', 'Commodo officia nulla eu labore et. Cillum est veniam ad eu in excepteur commodo id nostrud anim enim culpa nostrud. Cupidatat magna eu aliquip nostrud labore irure aliquip Lorem cillum deserunt ad dolore aute.\r\n'),
(28, '2024-09-28 15:45:00', 'Sloan', 'Good Stephenson', '12.896.10-2', 946013066, 'jose@example', 'Consulta veterinaria', 'Nulla excepteur anim qui cupidatat enim do nulla deserunt. Ad sunt exercitation commodo excepteur fugiat aliqua veniam minim velit. Nostrud officia anim sunt eiusmod ut velit in amet aliqua aliquip. Amet culpa irure excepteur nulla irure minim mollit incididunt aliqua aute enim Lorem. Labore incididunt officia officia do culpa. Est aliqua minim officia ipsum ullamco commodo deserunt duis aute cillum nulla ad culpa adipisicing. Irure magna ullamco excepteur tempor.\r\n'),
(29, '2023-11-10 15:45:00', 'Stafford', 'Angel Gamble', '20.880.711-5', 999587805, 'juan@example', 'Consulta veterinaria', 'Quis adipisicing amet veniam aliqua aliqua nulla exercitation id deserunt labore. Cillum qui nisi veniam id non qui deserunt tempor in ea id est exercitation. Cupidatat dolor ipsum occaecat eu incididunt.\r\n'),
(30, '2023-12-08 15:45:00', 'Katie', 'Kelly Bean', '6.809.33-5', 995426585, 'jose@example', 'Cirugia esterilización', 'Enim sint eu reprehenderit sunt eiusmod voluptate aliquip. Exercitation nostrud cillum incididunt officia esse reprehenderit non elit adipisicing. Lorem laboris excepteur cupidatat irure dolore Lorem et Lorem amet aliquip ipsum ut consequat. Esse ad cillum duis dolor. Dolore ad quis nulla consectetur excepteur laborum consequat ex eu pariatur minim ipsum esse.\r\n'),
(31, '2023-12-07 15:45:00', 'Wood', 'Jolene Bolton', '22.245.609-4', 988698884, 'juan@example', 'Consulta veterinaria', 'Pariatur excepteur sint voluptate sunt dolor magna consequat sunt dolor mollit velit occaecat occaecat fugiat. Non amet qui deserunt tempor enim sit occaecat do. Lorem cupidatat irure eiusmod occaecat ea cillum et ea ut ex est do ut.\r\n'),
(32, '2023-11-21 15:45:00', 'Janine', 'Ruthie William', '19.61.305-9', 937704518, 'juan@example', 'Cirugia general', 'Officia ea magna ut cillum ex et est fugiat est ipsum aute esse Lorem. Quis ullamco tempor aute dolor. Cupidatat esse sit consectetur consequat irure consectetur nulla adipisicing cillum amet. Pariatur proident officia sunt eu consequat ex laborum culpa elit sit. Duis reprehenderit qui non laborum labore commodo amet nisi proident non. Magna nisi aute ea ullamco culpa culpa in sunt minim fugiat laboris.\r\n'),
(33, '2023-12-07 15:45:00', 'Eva', 'Sherry Mclaughlin', '18.938.919-8', 915193827, 'juan@example', 'Cirugia esterilización', 'Do nisi fugiat elit non laboris non ex est proident sunt. Culpa labore tempor minim Lorem occaecat anim culpa velit ipsum incididunt ad ullamco. Adipisicing non aliqua eiusmod esse excepteur non ex sit ex proident quis. Reprehenderit est adipisicing reprehenderit minim duis incididunt pariatur exercitation ipsum laborum eiusmod. Magna Lorem quis id irure pariatur ut aliquip irure id ipsum. Quis mollit ea cillum exercitation tempor laboris enim laborum veniam minim. Officia do eiusmod veniam ut incididunt.\r\n'),
(34, '2023-12-12 15:45:00', 'Louella', 'Nancy Clements', '7.416.321-9', 930309000, 'juan@example', 'Cirugia esterilización', 'Labore tempor anim voluptate laboris exercitation ut consectetur nulla tempor nostrud culpa. Do non sint excepteur consequat irure. Fugiat nostrud cupidatat do ipsum ad anim ad id cillum adipisicing ea excepteur occaecat.\r\n'),
(35, '2023-12-21 15:45:00', 'Lynn', 'Byers Crane', '21.167.315-k', 925923771, 'juan@example', 'Cirugia esterilización', 'Pariatur voluptate amet consequat exercitation ullamco dolore ea sit esse laborum proident ad id. Consequat quis proident aliqua exercitation non sit ut sit occaecat et magna id ullamco occaecat. Irure cillum ea sunt ex proident laboris. Quis cupidatat tempor eiusmod qui.\r\n'),
(36, '2023-11-29 15:45:00', 'Concepcion', 'Hodges Booker', '12.173.907-2', 974525349, 'juan@example', 'Cirugia esterilización', 'Sunt enim voluptate deserunt est eu reprehenderit cupidatat excepteur velit excepteur consequat labore laboris. Ad ad aute cillum dolor proident duis minim ex eu. Ipsum quis do sit reprehenderit sit cillum mollit sit culpa incididunt nulla sint duis nisi. Do fugiat duis culpa deserunt. Ex magna do commodo culpa occaecat. Sunt nostrud commodo officia enim laboris nulla laboris. Irure veniam Lorem pariatur voluptate commodo deserunt veniam sunt proident esse.\r\n'),
(37, '2023-11-18 15:45:00', 'Maria', 'Douglas Mccray', '13.874.743-4', 995327903, 'jose@example', 'Cirugia general', 'Laborum eu cillum enim elit culpa cupidatat nulla culpa aliquip laboris. Pariatur nostrud ex laboris cupidatat pariatur ad magna labore amet. Veniam cillum consectetur cillum aliquip exercitation cupidatat. Elit enim esse adipisicing ipsum amet occaecat fugiat. Laboris deserunt Lorem velit anim exercitation officia voluptate consectetur officia. Id reprehenderit culpa Lorem dolore. Labore nostrud do duis nostrud officia sint exercitation ullamco irure eu elit adipisicing magna labore.\r\n'),
(38, '2023-12-10 15:45:00', 'Corrine', 'Manuela Hendrix', '6.177.108-3', 981269828, 'jose@example', 'Cirugia esterilización', 'Laborum proident id in deserunt ad qui ullamco veniam laboris. Ad aliquip occaecat non tempor est aliquip occaecat dolor cillum laboris consectetur culpa. Nostrud irure cillum laborum ex. Excepteur Lorem ad do consectetur cupidatat officia enim labore ipsum ad.\r\n');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `receta`
--

CREATE TABLE `receta` (
  `idReceta` int(4) NOT NULL,
  `idConsulta` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `admin` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`nombre`, `apellido`, `email`, `password`, `admin`) VALUES
('jose', 'pepe', 'jose@example', '$2a$09$UfXZo6CLaFbLfNPuLdpU1enWlygl2CRAmrnmM/NFKPir1mnpC4cKO', 'Ve93*8#,hf)4'),
('juan', 'tablos', 'juan@example', '$2a$09$m0gCw4225SR9OL6kOZt9Xeb6iNd15oNQy.EIifXORk1oP8pH2r0em', 'D8a1;or4nIF@');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `consulta`
--
ALTER TABLE `consulta`
  ADD PRIMARY KEY (`idConsulta`),
  ADD KEY `email` (`emailVet`);

--
-- Indices de la tabla `receta`
--
ALTER TABLE `receta`
  ADD PRIMARY KEY (`idReceta`),
  ADD KEY `IdConsulta` (`idConsulta`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `consulta`
--
ALTER TABLE `consulta`
  MODIFY `idConsulta` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `receta`
--
ALTER TABLE `receta`
  MODIFY `idReceta` int(4) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `receta`
--
ALTER TABLE `receta`
  ADD CONSTRAINT `receta_ibfk_1` FOREIGN KEY (`idConsulta`) REFERENCES `consulta` (`idConsulta`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
