let user = require('../Models/user');
let ticket = require('../Models/ticket');
let event = require('../Models/event');

module.exports = {
  reset : async (req, res) => {
    // await user.remove({"username":{$nin:["huuhung"]}}, function (err, scc) {
    //    res.json({ status: 'SUCCESS'})
    // });
    // ticket.remove({});
    // event.remove({});
    await user.remove({"username":{$nin:["BE.admin"]}});
    await ticket.remove({});
    await event.remove({});
    res.json({ status: 'SUCCESS'});
  }
}
