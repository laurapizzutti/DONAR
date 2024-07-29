const { Router } = require('express');
const router = Router();

const { storeItem, getItems, deleteItems } = require('../controller/tabelaController');


router.post('/store/tabela', storeItem); 
router.get('/get/tabela', getItems);   
router.delete('/delete/tabela', deleteItems);

module.exports = router;
