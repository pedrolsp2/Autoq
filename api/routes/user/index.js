var express = require('express');
var router = express.Router();
var verification = require('../../middleware/verification');

var user = require('../../controllers/user/userController');

router.put('/user', [verification.existenceEmail], user.createUser);
router.get('/users', user.listUser);
router.delete('/user', user.deleteUser);
router.patch('/user', user.editUser);

module.exports = router;
