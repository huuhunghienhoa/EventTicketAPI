var Event = require('../Models/event');
module.exports = {
  postEvent : (req, res, next) => {
    let response = { validations: [] };
    req.checkBody("name", "required").trim().not().isEmpty();
    req.checkBody("banner", "required").trim().not().isEmpty();
    req.checkBody("description", "required").trim().not().isEmpty();
    req.checkBody("ticket_total", "positive_integer_required").isInt({min:1});
    req.checkBody("ticket_price", "positive_integer_required").isInt({min:0});
    req.checkBody("start_date", "required").trim().isISO8601();

    req.checkBody("end_date", "end_date_invalid").trim().isISO8601();
    req.checkBody("start_date", "start_date_invalid").isBefore(req.body.end_date);

    req.checkBody("ticket_start_date", "required").trim().isISO8601();
    req.checkBody("ticket_end_date", "ticket_end_date_invalid").trim().isISO8601();
    req.checkBody("ticket_start_date", "ticket_start_date_invalid").isBefore(req.body.start_date).isBefore(req.body.ticket_end_date);
    var errors = req.validationErrors();
    if (errors) {
      response.status = "VALIDATION_ERROR";
      errors.forEach(function(err) {
        response.validations.push({ attribute: err.param, reason: err.msg });
      });
      res.statusCode = 200;
      return res.json(response);
     }else {
      next();
    }
  },

  updateEvent : (req, res, next) => {
    let response = { validations: [] };
    req.checkBody("name", "required").trim().not().isEmpty();
    if(!req.file)
      response.validations.push({ attribute: "banner", reason: "required" });

    if(!req.file || !req.file.originalname.match(/\.(jpg|png)$/i)) {
      response.validations.push({ attribute: "banner", reason: "mime_type_not_allowed" });
    }
    req.checkBody("description", "required").trim().not().isEmpty();
    req.checkBody("ticket_total", "positive_integer_required").isInt({min:1});
    req.checkBody("ticket_price", "positive_integer_required").isInt({min:0});
    req.checkBody("start_date", "required").trim().isISO8601();
    req.checkBody("end_date", "end_date_invalid").trim().isISO8601();

    req.checkBody("start_date", "start_date_invalid").isBefore(req.body.end_date);

    req.checkBody("ticket_start_date", "required").trim().isISO8601();
    req.checkBody("ticket_end_date", "ticket_end_date_invalid").trim().isISO8601();
    req.checkBody("ticket_start_date", "ticket_start_date_invalid").isBefore(req.body.start_date).isBefore(req.body.ticket_end_date);

    var errors = req.validationErrors();
    if (errors  || response.validations.length > 0) {
      response.status = "VALIDATION_ERROR";
      if(errors){
      errors.forEach(function(err) {
        response.validations.push({ attribute: err.param, reason: err.msg });
      });
    }
      res.statusCode = 200;
      return res.json(response);
     }else {
      next();
    }
  },
  checkEventExist: (req, res, next) => {
    Event.findOne({_id: req.params.event_id},
        function (err, event) {
          if(!event)
            return res.json({status: 'EVENT_NOT_EXISTED'});
          else
            next();
        });
  }
}
