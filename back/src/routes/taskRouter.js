const {Router} = require('express')
const router = Router();

const { storeTask } = require('../controller/taskController');

router.post('/store/task', storeTask);
// router.get('/get/task', getTask);

module.exports = router;