create database autoq;
use autoq;

CREATE TABLE `dim_politica` (
  `id_politica` int NOT NULL AUTO_INCREMENT,
  `ds_politica` varchar(450) DEFAULT NULL,
  PRIMARY KEY (`id_politica`)
);
INSERT INTO `autoq`.`dim_politica` (`ds_politica`) VALUES ('Admin');
INSERT INTO `autoq`.`dim_politica` (`ds_politica`) VALUES ('Gerente');
INSERT INTO `autoq`.`dim_politica` (`ds_politica`) VALUES ('Vendedor');
INSERT INTO `autoq`.`dim_politica` (`ds_politica`) VALUES ('Caixa');

CREATE TABLE `dim_usuario` (
  `SK_USUARIO` int NOT NULL AUTO_INCREMENT,
  `NM_USUARIO` varchar(450) DEFAULT NULL,
  `EMAIL_USUARIO` varchar(450) DEFAULT NULL,
  `DS_USUARIO` varchar(45) DEFAULT NULL,
  `SENHA_USUARIO` varchar(450) DEFAULT NULL,
  `CREATED_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATE_AT` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `D_E_L_E_T` char(1) DEFAULT NULL,
  `POLITICA` int DEFAULT NULL,
  PRIMARY KEY (`SK_USUARIO`),
  KEY `POLITICA_X_USER_idx` (`POLITICA`),
  CONSTRAINT `POLITICA_X_USER` FOREIGN KEY (`POLITICA`) REFERENCES `dim_politica` (`id_politica`)
);
INSERT INTO `autoq`.`dim_usuario` (`NM_USUARIO`, `EMAIL_USUARIO`, `DS_USUARIO`, `SENHA_USUARIO`, `POLITICA`) VALUES ('Administrador AutoQ', 'admin@autoq.com', 'admin', '$2b$10$FzbzHgDvjDl9HfJt8qKsl.LKKbgHiGR9CerNkKTDYjKdZz0VSb8tu', '1');

