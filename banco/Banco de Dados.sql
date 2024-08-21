CREATE DATABASE DONAR_MVP;
USE DONAR_MVP;

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

CREATE TABLE agendamentos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    item VARCHAR(255) NOT NULL,
    data_entrega DATE NOT NULL,
    hora_entrega TIME NOT NULL,
    qnt INT NOT NULL,
	id_doador INT NOT NULL,
    id_insti INT NOT NULL,
	FOREIGN KEY (id_doador) REFERENCES cadastro_usuario(id),
    FOREIGN KEY (id_insti) REFERENCES cadastro_usuario(id),
    _status ENUM ('Realizada', 'Agendada') NOT NULL
);

SELECT * FROM agendamentos;
SELECT * FROM cadastro_usuario;
SELECT * FROM tabela_itens;

INSERT INTO cadastro_usuario(nome, email, senha,tipo_usuario,endereco)VALUES('ONG Somos+ Juntos','somos@somos','somos','Instituição','Rua 45, Rio Branco');
INSERT INTO cadastro_usuario(nome, email, senha,tipo_usuario,endereco)VALUES('Laura Pizzuti','lalapizzutti@gmail.com','Laura','Colaborador','Rua 63, Rio Verde');
INSERT INTO tabela_itens(item,qnt_itens,id_user) VALUES('Arroz', 8, 1);
INSERT INTO agendamentos (id, item, data_entrega, hora_entrega, qnt, id_doador, id_insti, _status) VALUES ('1','Arroz', '2022-06-06','09:00', 10, 2, 1, 'Agendada');

 -- DELETE FROM tabela_itens;
-- DELETE FROM cadastro_usuario WHERE email = 'fyjycrf';
-- DROP TABLE cadastro_usuario;

-- truncate table agendamentos;
