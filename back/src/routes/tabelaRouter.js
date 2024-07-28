const { Router } = require('express');
const router = Router();

const { storeItem, getItems } = require('../controller/tabelaController');

router.post('/store/item', storeItem);
router.get('/get/items/:id', getItems);

module.exports = router;
