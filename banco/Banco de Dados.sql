create database DONAR_MVP;
use DONAR_MVP;

create table agendamentos (
	id INT primary key auto_increment,
     item VARCHAR(255) NOT NULL,
    data_entrega date not null,
    hora_entrega time not null,
    qnt int not null
);

create table cadastro_usuário (
	id INT primary key auto_increment,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL UNIQUE,
    tipo_usuario ENUM ("Colaborador", "Instituição"),
    endereco VARCHAR(255) NOT NULL
);

select * from agendamentos;