CREATE DATABASE DONAR_MVP;
USE DONAR_MVP;

CREATE TABLE agendamentos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    item VARCHAR(255) NOT NULL,
    data_entrega DATE NOT NULL,
    hora_entrega TIME NOT NULL,
    qnt INT NOT NULL
);

CREATE TABLE cadastro_usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL UNIQUE,
    tipo_usuario ENUM('Colaborador', 'Instituição') NOT NULL,
    endereco VARCHAR(255) NOT NULL
);

CREATE TABLE tabela_itens (
    id_item INT PRIMARY KEY AUTO_INCREMENT,
    item VARCHAR(255) NOT NULL,
    qnt_itens VARCHAR(255) NOT NULL,
    id_user INT,
    FOREIGN KEY (id_user) REFERENCES cadastro_usuario(id)
);

SELECT * FROM agendamentos;
SELECT * FROM cadastro_usuario;
SELECT * FROM tabela_itens;
