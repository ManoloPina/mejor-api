'use strict';
const Bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Constants = require('../Constants');

class UsersRouter {

  constructor() {
  }

  post(req, res, next) {

    let userEmail = req.body.email;
    let password = req.body.password;

    this.users.find({email: userEmail}).then(data => {

      if(data.length > 0) {
        
        Bcrypt.compare(password, data[0].password, (err, result) => {

          if(result) {
            let token = jwt.sign(password, Constants.SECRET_KEY);
            res.json({
              userId: data[0]._id,
              token: token
            });
          }else {
            res.status(500).json({
              message: 'Senha incorreta',
              error: err
            });
          }

        });
      } else {
        res.status(500).json({message: 'Usuário não encontrado'});
      }

    });
  }

  createAccount(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let hashPass = Bcrypt.hashSync(password, Constants.SALTS_ROUND);
    let encryptedPass = 
    this.users.insert({email: email, password: hashPass, assinature: ''})
    .then(result => {
      res.json(result);
    }).catch(err => {
      res.status(500).json(err);
    });
  }

  updateAssinature(req, res) {
    let userId = req.body.userId;
    let assinature = req.body.assinature;
    console.log('assinatue', assinature);
    this.users.update({_id: userId}, {assinature: assinature})
    .then(result => {
      res.json({message: `Atualização de assinatura para o plano ${assinature}`, result: result});
    }).catch(err => {
      res.status(500).json(err);
    });
  }

}

module.exports = UsersRouter;
