const connection = require('../config/db.js');
const dotenv = require('dotenv').config();

async function storeItem(request, response) {
    const params = Array(
        request.body.nomeItem,
        request.body.quantidade,
        request.body.Id_User
    );
    console.log(params);

    const query = 'INSERT INTO tabela_itens(item,qnt_itens,id_user) VALUES(?,?,?)';

    connection.query(query, params, (err, results) => {
        console.log(err, results)
        if(results) {
            response.status(201).json({
                success: true,
                message: "Itens enviados com sucesso!",
                data: results
            });        
        } else {
            response.status(401)
                .json({
                    success: false,
                    message: "Itens não enviados com sucesso!",
                    data: results
            });  
        }
    });
}

async function getItems(request, response) {    
    const params = Array(
        request.params.id
    )
    console.log(params)

    const query = 'SELECT * FROM tabela_itens WHERE id_user = ?';

    connection.query(query, params, (err, results) => {
        console.log(err, results)
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

// function getItemsHome(request, response) {    
//     const params = Array(
//         request.params.id
//     )
//     console.log(params)

//     const query = 'SELECT * FROM tabela_itens WHERE id_user = ?';

//     connection.query(query, params, (err, results) => {
//         console.log(err, results)
//         if (results) {
//             response.status(200).json({
//                 success: true,
//                 message: "Itens recuperados com sucesso!",
//                 data: results
//             });
//         } else {
//             response.status(400).json({
//                 success: false,
//                 message: "Erro ao recuperar itens.",
//                 data: err
//             });
//         }
//     });
// }

async function deleteItems(request, response) {
    const { id } = request.params; // Capturar o ID do parâmetro da URL

    const query = 'DELETE FROM tabela_itens WHERE id_item = ?';

    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error("Erro ao deletar item:", err);
            return response.status(400).json({
                success: false,
                message: "Erro ao deletar item.",
                data: err
            });
        }

        if (results.affectedRows > 0) {
            response.status(200).json({
                success: true,
                message: "Item deletado com sucesso!",
                data: results
            });
        } else {
            response.status(404).json({
                success: false,
                message: "Item não encontrado.",
            });
        }
    });
}

module.exports = {
    storeItem,
    getItems,
    deleteItems
};
