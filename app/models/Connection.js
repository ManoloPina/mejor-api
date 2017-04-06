const mongoose = require('mongoose');
const Constants = require('../Constants');
mongoose.connect(Constants.DB_PATH);

class Connection {
  constructor() {
    this.db = mongoose.connection;
    this.mongoose = mongoose;
  }
}

module.exports = Connection;