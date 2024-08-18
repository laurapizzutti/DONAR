const { Router } = require('express');
const router = Router();

const { storeItem, getItems } = require('../controller/tabelaController');

// router.delete('/delete/tabela', deleteItems);

// rotas de itens
router.post('/store/item', storeItem)
router.get('/itens/:id', getItems)
// router.get('/itens/:id', getItemsHome)


module.exports = router;
