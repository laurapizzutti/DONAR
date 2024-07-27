// // const connection = require('../config/db.js');
// // const dotenv= require('dotenv').config();

// // async function storeTabela(request, response){
// //     const params = Array(
// //         request.body.item,
// //         request.body.qnt_itens
// //     );

// //     const query = 'INSERT INTO agendamentos(item, qnt_itens) VALUES (?, ?)';

// //     connection.query(query, params, (err, results) => {
// //         console.log(err)
// //         if (results) {
// //             response 
// //                 .status(201)
// //                 .json({
// //                     success: true,
// //                     massage: "Sucesso!",
// //                     data: results
// //                 })
// //         }else{
// //             response
// //                 .status(400)
// //                 .json({
// //                     success: false,
// //                     message: "Ops, deu problema :(",
// //                     data: err
// //                 })
// //         }
// //     })
// // }

// // module.exports = {
// //     storeTabela
// //     // getTask 
// // }



// const { Pool } = require('pg');
// const pool = new Pool({
//   user: 'root',
//   host: 'localhost',
//   database: 'DONAR_MVP',
//   password: '998545021@Laura',
//   port: 3001,
// });

// const getTabelaItens = async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM tabela_itens');
//     res.status(200).json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// const addTabelaItem = async (req, res) => {
//   const { nome, descricao } = req.body;
//   try {
//     const result = await pool.query('INSERT INTO tabela_itens (nome, descricao) VALUES ($1, $2) RETURNING *', [nome, descricao]);
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// const updateTabelaItem = async (req, res) => {
//   const { id, nome, descricao } = req.body;
//   try {
//     const result = await pool.query('UPDATE tabela_itens SET nome = $1, descricao = $2 WHERE id = $3 RETURNING *', [nome, descricao, id]);
//     res.status(200).json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// const deleteTabelaItem = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await pool.query('DELETE FROM tabela_itens WHERE id = $1', [id]);
//     res.status(204).send();
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// module.exports = {
//   getTabelaItens,
//   addTabelaItem,
//   updateTabelaItem,
//   deleteTabelaItem,
// };
