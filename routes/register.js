var express = require('express');
var router = express.Router();
var controller = require('../app/Controllers/AuthController.js');
var validationAuth = require('../app/Validations/AuthValidate.js');

/* Register. */
router.get('/', controller.getRegister);

router.post('/', validationAuth.postRegister , controller.postRegister);

module.exports = router;
