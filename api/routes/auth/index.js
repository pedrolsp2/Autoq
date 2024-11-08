var express = require('express');
var router = express.Router();

var auth = require('../../controllers/auth/authController');

router.post('/tokenvalidation', auth.tokenValidate);
router.post('/auth', auth.login);
module.exports = router;
