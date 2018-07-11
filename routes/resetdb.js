var express = require('express');
var router = express.Router();
var controller = require('../app/Controllers/ResetDBController.js');

/* Event*/

router.get('/', controller.reset);

module.exports = router;
