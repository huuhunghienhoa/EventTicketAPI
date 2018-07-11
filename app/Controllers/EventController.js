let Event = require('../Models/event');

module.exports = {
  index : (req, res) => {
    var limit_q = req.query.limit, page_q = req.query.page || 0;
    if(req.query.limit < 0) limit_q = 0;
    if(req.query.page < 0) page_q = 0
      var pageOptions = {
        page: page_q,
        limit: limit_q
      }
      var eventMap = [];
      Event.find()
      .skip(pageOptions.page*pageOptions.limit)
      .limit(pageOptions.limit)
      .exec(function (err, events) {
       if(events){
        events.forEach(function(event) {
          var eventJson = {
            id: event._id,
            name:  event.name,
            banner: event.banner,
            description: event.description,
            ticket_price: event.ticket_price,
            ticket_total: event.ticket_total
          };
          eventMap.push(eventJson);
        });
        }



    // var perPage = 1 , page = req.query.page > 0 ? req.query.page : 0
    // Event.find()
    // .limit(perPage)
    // .skip(perPage * page)
    // .sort({
    //     name: 'asc'
    // }).exec(function(err, events) {
    //   var eventMap = [];

    // events.forEach(function(event) {
    //   var eventJson = {
    //     id: event._id,
    //     name:  event.name,
    //     banner: event.banner,
    //     description: event.description
    //   };
    //    eventMap.push(eventJson);
    // });
    res.json({ status: 'SUCCESS', data: eventMap});

  });
    },
    getEvent : (req, res) => {
      Event.findOne({_id: req.params.event_id},
        function (err, event) {
          if(!event)
            return res.json({status: 'EVENT_NOT_EXISTED'});
          let eventjson = {
            id: event._id,
            name: event.name,
            banner: event.banner,
            description: event.description,
            ticket_total: event.ticket_total,
            ticket_price: event.ticket_price,
            start_date: event.start_date,
            end_date: event.end_date,
            ticket_start_date: event.ticket_start_date,
            ticket_end_date: event.ticket_end_date
          };
          res.json({status: "success", data: eventjson});
        });
    },
    postEvent : async (req, res) => {
     var body = req.decoded;
  //    let event =
  //    await Event.create({
  //     user: body.id,
  //     name : req.body.name,
  //     banner : req.body.banner,
  //     description : req.body.description,
  //     ticket_price: req.body.ticket_price,
  //     ticket_total: req.body.ticket_total,
  //     start_date: req.body.start_date,
  //     end_date: req.body.end_date,
  //     ticket_start_date: req.body.ticket_start_date,
  //     ticket_end_date: req.body.ticket_end_date
  // });
  //    if(event)
  //     res.status(200).send({status: 'SUCCESS', data :{ event_id: event._id}});
     Event.create({
      user: body.id,
      name : req.body.name,
      banner : req.body.banner,
      description : req.body.description,
      ticket_price: req.body.ticket_price,
      ticket_total: req.body.ticket_total,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      ticket_start_date: req.body.ticket_start_date,
      ticket_end_date: req.body.ticket_end_date
    }, function (err, event) {
      res.status(200).send({status: 'SUCCESS', data :{ event_id: event._id}});
    });
   },
   updateEvent : async (req, res) =>{
    let event = {
      name: req.body.name.trim(),
      description: req.body.description,
      banner: req.file.path,
      ticket_total: req.body.ticket_total,
      ticket_price: req.body.ticket_price,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      ticket_start_date: req.body.ticket_start_date,
      ticket_end_date: req.body.ticket_end_date
    }
    Event.findByIdAndUpdate(req.params.event_id, event, function (err, event) {
      if (!event) return res.json({status: 'EVENT_NOT_EXISTED'});
      return res.json({status: 'SUCCESS'});
    });

  // let event = await Event.findByIdAndUpdate(req.params.event_id, req.body);
  // if (!event) return res.json({status: 'EVENT_NOT_EXISTED'});
  // return res.json({status: 'SUCCESS'});
},
deleteEvent : (req, res) => {
 Event.findOne({_id: req.params.event_id},
  function (err, event) {
    if(!event)
      return res.json({status: 'EVENT_NOT_EXISTED'});
    Event.deleteOne({ _id: req.params.event_id }, function (err) {
      if(!err)
        res.json({status: "SUCCESS"});
    });
  });
}
}
