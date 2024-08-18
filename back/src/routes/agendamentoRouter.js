const {Router} = require('express')
const router = Router();

const { storeTask, getTask } = require('../controller/agendamentoController');

router.post('/store/task', storeTask);
router.get('/get/task/:id', getTask);

module.exports = router;