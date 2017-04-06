'use strict';
const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const multer = require('multer');
const Authentication = require('./Authentication');
const Constants = require('./Constants');
const bodyParser = require('body-parser');
const Users = require('./models/Users');
const Connection = require('./models/Connection');
const session = require('express-session');
const UploadMiddleware = require('./middleware/UploadMiddleware');
const UsersRouter = require('./routes/UsersRouter');
const cors = require('cors');

class Server {
  constructor() {
    this.authenticantion = new Authentication();
    this.express = new express();
    this.parseUrlencoded = bodyParser.urlencoded({ extended: false });
    this.connection = new Connection();
    this.users = new Users();
    this.usersRouter = new UsersRouter();
    this.initialize();
  }

  initialize() {

    this.express.use(session({
      secret: Constants.SECRET_KEY,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
      maxAge: 1800000
    }));

    this.express.use(cors());
    this.express.use(bodyParser.json());

    //Authentication router
    this.express.post('/login', this.parseUrlencoded, this.usersRouter.post.bind(this));
    this.express.post('/users/create', this.parseUrlencoded, this.usersRouter.createAccount.bind(this));
    this.express.post('/users/update/assinature', this.parseUrlencoded, this.usersRouter.updateAssinature.bind(this));
    this.express.listen(5200);
  }

}

new Server();
