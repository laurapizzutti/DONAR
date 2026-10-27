const connection = require('../config/db.js');
const dotenv = require('dotenv').config();
const { response } = require('express') // possível problema


async function login(req, res) {

    const params = Array(
        req.body.email
    )
    console.log("email p/ cadastro:", req.body.email)

    const query = "SELECT email, senha, id, tipo_usuario FROM cadastro_usuario WHERE email = ?";
    // const query = "SELECT email, senha, FROM cadastro_usuario WHERE email = ?";

    connection.query(query, params, (err, results) => {
        console.log(err, results)
        if (err) {
            return res.status(500).json({ success: false, message: "Erro no servidor", data: err });
        }
        if (results.length > 0 && results[0].senha === req.body.senha) {
                console.log('Senha Correta!')
                res
                    .status(200)
                    .json({
                        success: true,
                        message: "",
                        data: results[0]
                });        
            } else {
                res
                    .status(400)
                    .json({
                        success: false,
                        message: "Verifique seu e-mail e senha",
                        data: []
                });  
        }
    });
};

module.exports = {
    login
}

