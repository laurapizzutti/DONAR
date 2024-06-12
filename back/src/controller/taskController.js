const connection = require('../config/db.js');
const dotenv= require('dotenv').config();

async function storeTask(request, response){
    const params = Array(
        request.body.item,
        request.body.date,
        request.body.hora,
        request.body.qnt,

        // 1) pode dar ruim em algum momento
        // é necessário que o item que esteja sendo selecionada na página ajudar 
        // esteja sendo armazenado no banco assim como as demais informações
        // perguntar como adicionar os dados só do cadastro no banco de dados, 
        // como isso é possível de ser feito
        // e como mostrar os dados do banco de dados na tela depois de armazendos
    );

    // const query = "insert into agendar(item, data_entrega, hora_entrega, qnt) values(?,?,?,?)";
    const query = "insert into agendamentos(item, data_entrega, hora_entrega, qnt) values(?,?,?,?)";

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

module.exports = {
    storeTask
}