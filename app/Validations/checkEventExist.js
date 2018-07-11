var Event = require('../Models/event');
module.exports = {
  check : (req, res, next) => {
    Event.findOne({_id: req.params.event_id},
        function (err, event) {
          if(!event)
            return res.json({status: 'EVENT_NOT_EXISTED'});
          else
            next();
        });
}
}
