var express = require('express');
var router = express.Router();
var middlware = require('../../middleware/modules');

var pecas = require('../../controllers/pecas/pecasController');

router.put('/pecas', pecas.createpecas);
router.patch('/pecas', pecas.editpecas);
router.get('/pecas', pecas.selectpecas);

module.exports = router;
