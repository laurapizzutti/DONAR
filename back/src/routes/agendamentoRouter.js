const {Router} = require('express')
const router = Router();

const { storeTask, getTask, updateTask } = require('../controller/agendamentoController');

router.post('/store/task', storeTask);
router.get('/get/task/:id', getTask);
router.put('/update/task/:id', updateTask);

module.exports = router;