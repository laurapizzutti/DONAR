const connection = require('../config/db.js');
const dotenv = require('dotenv').config();


async function getInstiData(request, response){

    const query = 'SELECT id, nome, tipo_usuario, endereco FROM cadastro_usuario WHERE tipo_usuario = "Instituição"';

    connection.query(query, (err, results) => {
        console.log(err)
        if (results) {
            response 
                .status(201)
                .json({
                    success: true,
                    massage: "id e nome, tipo_usuario, endereco das Instituições recuparados!",
                    data: results
                })

            // // localStorage.setItem('id: ', results.data.id)
            // // Id_User = 
            // if (results.data.tipo_usuario === 'Instituição') {
            //     window.location.href = "/front/html/perfil_insti.html";
            // }

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

// async function getItems(request, response) {    
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

module.exports = {
    getInstiData
}