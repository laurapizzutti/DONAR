const {Router} = require('express')
const router = Router();

const { getInstiData, getInstiName } = require('../controller/instiController');

/**
* @swagger
* /get/inti:
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

router.get('/get/insti', getInstiData);

/**
* @swagger
* /get/InstiName/:id_insti:
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

router.get('/get/InstiName/:id_insti', getInstiName);

module.exports = router;