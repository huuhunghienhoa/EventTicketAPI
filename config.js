var mongoose = require('mongoose');
mongoose.connect(
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/EventMongoose');

module.exports = {
  'secret': 'abc1234'
};
