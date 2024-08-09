const connection = require('../config/db.js');
const dotenv = require('dotenv').config();
const { response } = require('express')


async function login(req, res) {

    const params = Array(
        req.body.email
    )
    console.log("email p/ cadastro:", req.body.email)

    const query = "SELECT email, senha, id FROM cadastro_usuario WHERE email = ?";
    // const query = "SELECT email, senha, FROM cadastro_usuario WHERE email = ?";

    connection.query(query, params, (err, results) => {
        console.log(err, results)
        if(results.length > 0) {
            let senhaForms = req.body.senha
            let senhaDb = results[0].senha

            if (senhaDb === senhaForms)
                console.log('Senha Correta!')   
                res
                    .status(200)
                    .json({
                        success: true,
                        message: "Login feito com Sucesso",
                        data: results[0]
                });        
            } else {
                res
                    .status(400)
                    .json({
                        success: false,
                        message: "Verifique sua Senha",
                        data: results
                });  
                // localStorage.setItem('id_user', results[2].data.id_user);
                // console.log(`ID do usuário armazenado: ${results[2].data.id_user}`);
        }
    });
};

module.exports = {
    login
}

