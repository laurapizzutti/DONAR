const {Router} = require('express')
const router = Router();

const { storeTask, getTask, updateTask } = require('../controller/agendamentoController');

router.post('/store/task', storeTask);
router.get('/get/task/:id', getTask);
router.post('/update/task/:id_agendamento', updateTask);

module.exports = router;