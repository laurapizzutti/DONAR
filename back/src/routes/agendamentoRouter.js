const {Router} = require('express')
const router = Router();

const { storeTask, getTask, updateTask, getTaskInsti } = require('../controller/agendamentoController');

/**
* @swagger
* /store/task:
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

router.post('/store/task', storeTask);

/**
* @swagger
* /get/task/:id:
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

router.get('/get/task/:id', getTask);

/**
* @swagger
* /get/task/:id:
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

router.get('/get/task/insti/:id', getTaskInsti);

/**
* @swagger
* /update/task/:id_agendamento:
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

router.post('/update/task/:id_agendamento', updateTask);

module.exports = router;