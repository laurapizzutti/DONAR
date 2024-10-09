const { Router } = require('express');
const router = Router();

const { storeItem, getItems, deleteItems } = require('../controller/tabelaController');

/**
* @swagger
* /delete/item:
*   delete:
*     summary: Remove uma tarefa pelo id
*     responses:
*       200:
*         description: Uma lista de tarefas
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*/

router.delete('/delete/item', deleteItems);

/**
* @swagger
* /store/item:
*   post:
*     summary: Cadastra uma nova tarefa
*     responses:
*       201:
*         description: Sucesso!
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*/

router.post('/store/item', storeItem)

/**
* @swagger
* /itens/:id:
*   get:
*     summary: Retorna todas as tarefas
*     responses:
*       200:
*         description: Uma lista de tarefas
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*/

router.get('/itens/:id', getItems)

module.exports = router;
