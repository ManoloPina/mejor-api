'use strict';

const Connection = require('./Connection');

class Users extends Connection {

  constructor() {
    super();
    this.schema = this.mongoose.Schema({
      email: String,
      password: String,
      assinature: String
    }, {collection: 'users'});
    this.usuarios = this.mongoose.model('usuarios', this.schema);
  }

  find(query, sortObject = {}) {
    return new Promise((resolve, reject) => {
      this.usuarios.find(query, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  }

  insert(query) {
    return new Promise((resolve, reject) => {
      this.usuarios.create(query, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  }

  update(conditional, query) {
    return new Promise((resolve, reject) => {
      this.usuarios.update(conditional, query, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  }

}

module.exports = Users;
