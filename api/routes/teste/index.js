var express = require('express');
var router = express.Router();

var teste = require('../../controllers/teste/testeController');

router.post('/teste', teste.teste);
module.exports = router;
