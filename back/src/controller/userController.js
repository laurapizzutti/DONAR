const connection = require('../config/db.js');
const dotenv = require('dotenv').config();

async function storeUser(request, response){
    const params = Array(
        request.body.nome,
        request.body.email,
        request.body.senha,
        request.body.tipo_usuario,
        request.body.endereco,
    );


    const query = 'INSERT INTO cadastro_usuario(nome, email, senha, tipo_usuario, endereco) VALUES (?, ?, ?, ?, ? )';

    connection.query(query, params, (err, results) => {
        console.log(err)
        if (results) {
            response 
                .status(201)
                .json({
                    success: true,
                    massage: "Sucesso!",
                    data: results
                })
            
        }else{
            response
                .status(400)
                .json({
                    success: false,
                    message: "Ops, deu problema :(",
                    data: err
                })
        }
    })
}

// async function getUser(request, response) {    
//     const params = Array(
//         request.params.id
//     )
//     console.log(params)

//     const query = 'SELECT * FROM cadastro_usuario WHERE id_user = ?';

//     connection.query(query, params, (err, results) => {
//         console.log(err, results)
//         if (results) {
//             response.status(200).json({
//                 success: true,
//                 message: "Dados com sucesso!",
//                 data: results
//             });
//         } else {
//             response.status(400).json({
//                 success: false,
//                 message: "Erro ao recuperar Dados.",
//                 data: err
//             });
//         }
//     });
// }

module.exports = {
    storeUser
}