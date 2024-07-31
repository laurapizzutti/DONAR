const connection = require('../config/db.js');
const dotenv = require('dotenv').config();

async function storeItem(request, response) {
    const items = request.body;
    const query = 'INSERT INTO tabela_itens (item, qnt_itens) VALUES ?';
    const values = items.map(item => [item.nome, item.quantidade]);

    connection.query(query, [values], (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Itens adicionados com sucesso!",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Erro ao adicionar itens.",
                data: err
            });
        }
    });
}

async function getItems(request, response) {
    const query = 'SELECT * FROM tabela_itens';

    connection.query(query, (err, results) => {
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

async function deleteItems(request, response) {
    const { id_item } = request.body;

    const query = 'DELETE FROM tabela_itens WHERE id_item = ?';

    connection.query(query, [id_item], (err, results) => {
        if (results) {
            response.status(200).json({
                success: true,
                message: "Item deletado com sucesso!",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Erro ao deletar item.",
                data: err
            });
        }
    });
}

module.exports = {
    storeItem,
    getItems,
    deleteItems
};
