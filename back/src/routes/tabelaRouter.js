const { Router } = require('express');
const router = Router();

const { storeItem, getItems } = require('../controller/tabelaController');

// Atualizar as rotas para '/api/tabela'
router.post('/tabela', storeItem); // POST para adicionar itens
router.get('/tabela', getItems);    // GET para obter todos os itens

module.exports = router;
