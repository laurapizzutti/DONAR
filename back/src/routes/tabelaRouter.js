const { Router } = require('express');
const router = Router();

const { storeItem, getItems, deleteItems } = require('../controller/tabelaController');

// router.post('/store/tabela', storeItem); 
// router.get('/get/tabela', getItems);   
// router.delete('/delete/tabela', deleteItems);

// rotas de itens
router.post('/store/item', storeItem)
router.get('/itens/:id', getItems)

module.exports = router;
