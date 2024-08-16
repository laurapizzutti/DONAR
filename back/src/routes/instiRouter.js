const {Router} = require('express')
const router = Router();

const { getInstiData } = require('../controller/instiController');

router.get('/get/insti', getInstiData);


module.exports = router;