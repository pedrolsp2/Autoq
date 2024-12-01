var express = require('express');
var router = express.Router();
var middlware = require('../../middleware/modules');

var cliente = require('../../controllers/cliente/clienteController');

router.put('/cliente', cliente.createCliente);
router.patch('/cliente', cliente.editCliente);
router.get('/cliente', cliente.selectCliente);

module.exports = router;
