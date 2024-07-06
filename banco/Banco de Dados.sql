create database DONAR_MVP;
use DONAR_MVP;

create table agendamentos (
	id INT primary key auto_increment,
	item VARCHAR(255) NOT NULL,
    data_entrega date NOT NULL,
    hora_entrega time NOT NULL,
    qnt INT NOT NULL
);

create table cadastro_usuario (
	id INT primary key auto_increment,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL UNIQUE,
    tipo_usuario ENUM ("Colaborador", "Instituição" NOT NULL),
    endereco VARCHAR(255) NOT NULL
);

select * from agendamentos;
select *  from cadastro_usuario;