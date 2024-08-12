-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 12 août 2024 à 17:54
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ihm`
--

-- --------------------------------------------------------

--
-- Structure de la table `depot`
--

CREATE TABLE `depot` (
  `idD` int(15) NOT NULL,
  `nomD` varchar(50) NOT NULL,
  `marqueD` varchar(50) NOT NULL,
  `quantiterD` int(15) NOT NULL,
  `qualiterD` varchar(50) NOT NULL,
  `lienD` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `depot`
--

INSERT INTO `depot` (`idD`, `nomD`, `marqueD`, `quantiterD`, `qualiterD`, `lienD`) VALUES
(1, 'Cable vga', 'Itel', 2, 'bon', 'bureauA');

-- --------------------------------------------------------

--
-- Structure de la table `depotb`
--

CREATE TABLE `depotb` (
  `idDB` int(15) NOT NULL,
  `NomDB` varchar(50) NOT NULL,
  `MarqueDB` varchar(50) NOT NULL,
  `QuantiterDB` int(15) NOT NULL,
  `QualiterDB` varchar(50) NOT NULL,
  `LienDB` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `depotb`
--

INSERT INTO `depotb` (`idDB`, `NomDB`, `MarqueDB`, `QuantiterDB`, `QualiterDB`, `LienDB`) VALUES
(1, 'OrdiBureau', 'Asus', 2, 'Recuperable', 'DepotA');

-- --------------------------------------------------------

--
-- Structure de la table `materielbase`
--

CREATE TABLE `materielbase` (
  `idB` int(15) NOT NULL,
  `Nom` varchar(50) NOT NULL,
  `MarqueB` varchar(50) NOT NULL,
  `Quantiter` int(15) NOT NULL,
  `Qualiter` varchar(50) NOT NULL,
  `Lien` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `materielbase`
--

INSERT INTO `materielbase` (`idB`, `Nom`, `MarqueB`, `Quantiter`, `Qualiter`, `Lien`) VALUES
(1, 'Ordi bureau', 'Hp', 4, 'Bon', 'BureauA'),
(22, 'Point d\'acces', 'Huway', 2, 'Bon', 'Bureau4');

-- --------------------------------------------------------

--
-- Structure de la table `materiellane`
--

CREATE TABLE `materiellane` (
  `idL` int(11) NOT NULL,
  `nomL` varchar(50) NOT NULL,
  `marqueL` varchar(50) NOT NULL,
  `quantiteL` int(15) NOT NULL,
  `qualiterL` varchar(50) NOT NULL,
  `lienL` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `materiellane`
--

INSERT INTO `materiellane` (`idL`, `nomL`, `marqueL`, `quantiteL`, `qualiterL`, `lienL`) VALUES
(1, 'Switch', 'Itel', 2, 'Bon', 'BureauA'),
(18, 'Point d\'acces', 'Huway', 2, 'Bon', 'Bureau4');

-- --------------------------------------------------------

--
-- Structure de la table `outils`
--

CREATE TABLE `outils` (
  `idO` int(15) NOT NULL,
  `nomO` varchar(50) NOT NULL,
  `marqueO` varchar(50) NOT NULL,
  `quantiterO` int(15) NOT NULL,
  `qualiterO` varchar(50) NOT NULL,
  `lienO` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `outils`
--

INSERT INTO `outils` (`idO`, `nomO`, `marqueO`, `quantiterO`, `qualiterO`, `lienO`) VALUES
(1, 'Souries', 'Itel', 1, 'Mauvais', 'BureauA');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `depot`
--
ALTER TABLE `depot`
  ADD PRIMARY KEY (`idD`);

--
-- Index pour la table `depotb`
--
ALTER TABLE `depotb`
  ADD PRIMARY KEY (`idDB`);

--
-- Index pour la table `materielbase`
--
ALTER TABLE `materielbase`
  ADD PRIMARY KEY (`idB`);

--
-- Index pour la table `materiellane`
--
ALTER TABLE `materiellane`
  ADD PRIMARY KEY (`idL`);

--
-- Index pour la table `outils`
--
ALTER TABLE `outils`
  ADD PRIMARY KEY (`idO`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `depot`
--
ALTER TABLE `depot`
  MODIFY `idD` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `depotb`
--
ALTER TABLE `depotb`
  MODIFY `idDB` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `materielbase`
--
ALTER TABLE `materielbase`
  MODIFY `idB` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `materiellane`
--
ALTER TABLE `materiellane`
  MODIFY `idL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `outils`
--
ALTER TABLE `outils`
  MODIFY `idO` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
