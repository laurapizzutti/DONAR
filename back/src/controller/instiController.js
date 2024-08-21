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

async function getInstiName(request, response){

    const params = Array(
            request.params.id_insti
        )

    const query = 'SELECT nome FROM cadastro_usuario WHERE id = ?';

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

module.exports = {
    getInstiData,
    getInstiName
}