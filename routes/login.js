var express = require('express');
var router = express.Router();
var controller = require('../app/Controllers/AuthController.js');
var validationAuth = require('../app/Validations/AuthValidate.js');

/* Login */
router.get('/', controller.getLogin);

router.post('/', validationAuth.postLogin ,controller.postLogin);


module.exports = router;
