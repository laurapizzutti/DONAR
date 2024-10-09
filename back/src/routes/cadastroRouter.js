const {Router} = require('express')
const userRouter = Router();

const { storeUser } = require('../controller/cadastroController');

/**
* @swagger
* /store/user:
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

userRouter.post('/store/user', storeUser);
// userRouter.get('/get/user', getUser);


module.exports = userRouter;