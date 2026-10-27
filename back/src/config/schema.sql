CREATE TABLE IF NOT EXISTS cadastro_usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('Colaborador', 'Instituição') NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    nome_usuario VARCHAR(255),
    descricao VARCHAR(255) DEFAULT 'Clique em Editar para adicionar sua descrição!'
);

CREATE TABLE IF NOT EXISTS tabela_itens (
    id_item INT PRIMARY KEY AUTO_INCREMENT,
    item VARCHAR(255) NOT NULL,
    qnt_itens VARCHAR(255) NOT NULL,
    id_user INT,
    FOREIGN KEY (id_user) REFERENCES cadastro_usuario(id)
);

CREATE TABLE IF NOT EXISTS agendamentos (
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
