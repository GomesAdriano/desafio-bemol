-- MySQL Script generated by MySQL Workbench
-- Mon Mar 25 04:07:35 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ecommerce_bemol
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ecommerce_bemol
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ecommerce_bemol` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `ecommerce_bemol` ;

-- -----------------------------------------------------
-- Table `ecommerce_bemol`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce_bemol`.`cliente` (
  `cliente_cpf` CHAR(11) NOT NULL,
  `nome_completo` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `telefone` CHAR(11) NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  `saldo` DECIMAL(12,2) NOT NULL DEFAULT 1000.00,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `telefone_UNIQUE` (`telefone` ASC) VISIBLE,
  PRIMARY KEY (`cliente_cpf`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecommerce_bemol`.`endereco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce_bemol`.`endereco` (
  `endereco_id` CHAR(36) NOT NULL,
  `logradouro` VARCHAR(100) NOT NULL,
  `numero` VARCHAR(20) NOT NULL,
  `complemento` VARCHAR(100) NULL,
  `bairro` VARCHAR(100) NOT NULL,
  `cidade` VARCHAR(100) NOT NULL,
  `estado` CHAR(2) NOT NULL,
  `cep` CHAR(8) NOT NULL,
  `cliente_cpf` CHAR(11) NOT NULL,
  PRIMARY KEY (`endereco_id`),
  INDEX `fk_endereco_cliente_idx` (`cliente_cpf` ASC) VISIBLE,
  CONSTRAINT `fk_endereco_cliente`
    FOREIGN KEY (`cliente_cpf`)
    REFERENCES `ecommerce_bemol`.`cliente` (`cliente_cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecommerce_bemol`.`produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce_bemol`.`produto` (
  `produto_id` CHAR(6) NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `descricao` VARCHAR(550) NOT NULL,
  `preco` DECIMAL(12,2) NOT NULL,
  `imagem` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`produto_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecommerce_bemol`.`compra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce_bemol`.`compra` (
  `compra_id` CHAR(36) NOT NULL,
  `data_compra` DATE NOT NULL,
  `qtd_parcela` TINYINT NOT NULL,
  `valor_total` DECIMAL(12,2) NOT NULL,
  `quitado` TINYINT NOT NULL DEFAULT 0,
  `cliente_cpf` CHAR(11) NOT NULL,
  `produto_id` CHAR(6) NOT NULL,
  PRIMARY KEY (`compra_id`),
  INDEX `fk_compra_cliente1_idx` (`cliente_cpf` ASC) VISIBLE,
  INDEX `fk_compra_produto1_idx` (`produto_id` ASC) VISIBLE,
  CONSTRAINT `fk_compra_cliente1`
    FOREIGN KEY (`cliente_cpf`)
    REFERENCES `ecommerce_bemol`.`cliente` (`cliente_cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_compra_produto1`
    FOREIGN KEY (`produto_id`)
    REFERENCES `ecommerce_bemol`.`produto` (`produto_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ecommerce_bemol`.`parcela`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce_bemol`.`parcela` (
  `parcela_id` CHAR(36) NOT NULL,
  `numero_parcela` TINYINT NOT NULL,
  `valor_parcela` DECIMAL(12,2) NOT NULL,
  `vencimento` DATE NOT NULL,
  `paga` TINYINT NOT NULL DEFAULT 0,
  `compra_id` CHAR(36) NOT NULL,
  PRIMARY KEY (`parcela_id`),
  INDEX `fk_parcela_compra1_idx` (`compra_id` ASC) VISIBLE,
  CONSTRAINT `fk_parcela_compra1`
    FOREIGN KEY (`compra_id`)
    REFERENCES `ecommerce_bemol`.`compra` (`compra_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;