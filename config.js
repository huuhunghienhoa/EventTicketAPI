var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/EventMongoose');

module.exports = {
  'secret': 'abc1234'
};
