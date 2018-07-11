var express = require('express');
var router = express.Router();
var controller = require('../app/Controllers/TicketConttroller.js');
var auth = require('../app/Middlewares/AuthMiddleware.js');
var validationTicket = require('../app/Validations/BuyTicketValidate.js');

/* Event*/

router.post('/:event_id', auth.check, validationTicket.buyTicket, controller.buyTicket);

module.exports = router;
