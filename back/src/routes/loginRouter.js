const {Router} = require('express')
const router = Router();

const { login } = require('../controller/loginController');

/**
* @swagger
* /login:
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

router.post('/login', login);
// router.get('/login/id', getId);

module.exports = router;