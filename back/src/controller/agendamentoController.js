const connection = require('../config/db.js');
const dotenv= require('dotenv').config();

async function storeTask(request, response){
    const params = Array(
        request.body.item,
        request.body.date,
        request.body.hora,
        request.body.qnt,
        request.body.Id_User,
        // request.body.Id_Insti

    );

    console.log(params)

    const query = 'INSERT INTO agendamentos(item, data_entrega, hora_entrega, qnt, id_doador) VALUES (?, ?, ?, ?, ?)';

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

async function getTask(request, response){

    const params = Array(
        request.body.Id_User,

        
    );

     console.log(params)

    // A PÁGINA AGENDAMENTOS.HTML SÓ APARECE PARA COLABORADORES, PORTANTO,
    // A PORRA DO ID QUE VIRA PARA PROCURAR NO BANCO SERÁ APENAS DE COLABORADORES

    const query = 'SELECT * from agendamentos WHERE id_doador = ?';

    connection.query(query, params, (err, results) => {
        console.log(err)
        if (results) {
            response.status(201).json({
                    success: true,
                    massage: "Sucesso!",
                    data: results
                })
        }else{
            response.status(400).json({
                    success: false,
                    message: "Ops, deu problema :(",
                    data: err
            })
        }
    })
}

module.exports = {
    storeTask,
    getTask 
}