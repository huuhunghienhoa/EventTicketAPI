let Ticket = require('../Models/ticket');
let Event = require('../Models/event');

async function sumTicket(req, res) {
  let sumTicket = 0;
  let tickets = await Ticket.find({event: req.params.event_id});
  if(tickets){
  tickets.forEach(function(ticket) {
    sumTicket += ticket.quantity;
  });
}
  return sumTicket;
}

module.exports = {

  buyTicket : (req, res) => {
    Event.findOne({ _id: req.params.event_id }, async function (err, event) {
      if (!event) return res.json({status: 'EVENT_NOT_EXISTED'});
      let end_date = new Date(event.end_date).getTime();
      let current_date = new Date().getTime();
      if(current_date > end_date)
        return res.json({status: 'NOT_TIME_BUY_TICKET'});
      let SumTicket = await sumTicket(req, res);
      if((parseInt(req.body.quantity) + SumTicket) > event.ticket_total){
        return res.json({status: 'TICKET_SOLD_OUT'});
      }else {
        Ticket.create({
          user: req.decoded.id,
          event: event._id,
          quantity: req.body.quantity,
          card_type: req.body.card_type,
          card_number: req.body.card_number,
          card_expiration: req.body.card_expiration,
          cvc_code: req.body.cvc_code
        }, function (err, ticket) {
          res.status(200).send({status: 'SUCCESS', payment_id: ticket._id});
        });
      }
    });
  },
  purchasedTicket : async (req, res) => {
    let ticketsMap = [];
    Event.findOne({_id: req.params.event_id}, function (err, event) {
      if(!event) return res.json({status: 'EVENT_NOT_EXISTED'})
        Ticket.find({event: req.params.event_id}, function (err, tickets) {
          if(tickets){
          tickets.forEach(function(ticket) {
            let ticketJson = {
              id: ticket._id,
              ticket_count: ticket.quantity
            };
            ticketsMap.push(ticketJson);
          });
        }
          return res.json({status: 'SUCCESS', data: ticketsMap})
        });
    });
  }
}
