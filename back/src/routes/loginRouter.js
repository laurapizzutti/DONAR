const {Router} = require('express')
const router = Router();

const { login } = require('../controller/loginController');

router.post('/login', login);
// router.get('/get/task', getTask);

module.exports = router;