const { Router } = require('express');
const router = Router();

const { storeItem, getItems, deleteItems } = require('../controller/tabelaController');

router.delete('/delete/item', deleteItems);

// rotas de itens
router.post('/store/item', storeItem)
router.get('/itens/:id', getItems)
// router.get('/itens/:id', getItemsHome)


module.exports = router;
