const connection = require('../config/db.js');
const dotenv = require('dotenv').config();

async function storeItem(request, response) {
    const params = [
        request.body.id, // ID do usuário
        request.body.item,
        request.body.qnt_itens
    ];

    const query = 'INSERT INTO tabela_itens (id, item, qnt_itens) VALUES (?, ?, ?)';

    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Item adicionado com sucesso!",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Erro ao adicionar item.",
                data: err
            });
        }
    });
}

async function getItems(request, response) {
    const query = 'SELECT * FROM tabela_itens WHERE id = ?';
    const params = [request.params.id];

    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(200).json({
                success: true,
                message: "Itens recuperados com sucesso!",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Erro ao recuperar itens.",
                data: err
            });
        }
    });
}

module.exports = {
    storeItem,
    getItems
};
