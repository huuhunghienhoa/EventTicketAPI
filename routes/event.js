var express = require('express');
var multer  = require('multer')
var controller = require('../app/Controllers/EventController.js');
var isadmin = require('../app/Middlewares/IsAdminMiddleware.js');
var validationEvent = require('../app/Validations/EventValidate.js');
/* Event*/
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
   cb(null, Date.now()+'-'+file.originalname);
 }
});
var upload = multer({ storage: storage })
var router = express.Router();
//Get Event
router.get('/:event_id', controller.getEvent);
//Edit Event
router.post('/:event_id', isadmin.checkAdmin, upload.single('banner'), validationEvent.updateEvent, controller.updateEvent);
//Get all Event
router.get('/', controller.index);

router.post('/', isadmin.checkAdmin, validationEvent.postEvent , controller.postEvent);
router.delete('/:event_id', isadmin.checkAdmin, controller.deleteEvent);
module.exports = router;
