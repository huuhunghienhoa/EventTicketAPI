var express = require('express');
var router = express.Router();
var controller = require('../app/Controllers/TicketConttroller.js');
var auth = require('../app/Middlewares/AuthMiddleware.js');

/* Event*/

router.get('/:event_id', auth.check, controller.purchasedTicket);

module.exports = router;
