var mongoose = require('mongoose'), Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;
var EventSchema = new mongoose.Schema({
  user: ObjectId,
  name: String,
  banner: String,
  description: String,
  ticket_total: Number,
  ticket_price: Number,
  start_date: String,
  end_date: String,
  ticket_start_date: String,
  ticket_end_date: String
});
mongoose.model('Event', EventSchema);

module.exports = mongoose.model('Event');
