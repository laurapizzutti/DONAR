const { Router } = require('express');
const router = Router();

const { storeItem, getItems, deleteItems } = require('../controller/tabelaController');


router.post('/api/store/tabela', storeItem); 
router.get('/get/tabela', getItems);   
router.delete('/api/delete/tabela', deleteItems);

module.exports = router;
