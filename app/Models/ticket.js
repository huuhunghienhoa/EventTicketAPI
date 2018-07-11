var mongoose = require('mongoose'), Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;
var TicketSchema = new mongoose.Schema({
  user: ObjectId,
  event: ObjectId,
  quantity: Number,
  card_type: {type: String, default: 'visa'},
  card_number: String,
  card_expiration: String,
  cvc_code: String
});
mongoose.model('Ticket', TicketSchema);

module.exports = mongoose.model('Ticket');
