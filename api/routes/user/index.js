var express = require('express');
var router = express.Router();
var middlware = require('../../middleware/modules');

var user = require('../../controllers/user/userController');

router.put(
  '/user',
  // [middlware.validate, middlware.checkPermission],
  user.createUser
);
router.post(
  '/user',
  [middlware.validate, middlware.checkPermission],
  user.listUser
);
module.exports = router;
