const {Router} = require('express')
const router = Router();

const { getInstiData, getInstiName } = require('../controller/instiController');

router.get('/get/insti', getInstiData);
router.get('/get/InstiName/:id_insti', getInstiName);


module.exports = router;