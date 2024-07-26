// const connection = require('../config/db.js');
// const dotenv= require('dotenv').config();

// async function storeTabela(request, response){
//     const params = Array(
//         request.body.item,
//         request.body.qnt_itens
//     );

//     const query = 'INSERT INTO agendamentos(item, qnt_itens) VALUES (?, ?)';

//     connection.query(query, params, (err, results) => {
//         console.log(err)
//         if (results) {
//             response 
//                 .status(201)
//                 .json({
//                     success: true,
//                     massage: "Sucesso!",
//                     data: results
//                 })
//         }else{
//             response
//                 .status(400)
//                 .json({
//                     success: false,
//                     message: "Ops, deu problema :(",
//                     data: err
//                 })
//         }
//     })
// }

// module.exports = {
//     storeTabela
//     // getTask 
// }