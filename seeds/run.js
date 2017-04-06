'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const Constants = require('../app/Constants');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(Constants.DB_PATH);

class Seeds {
  constructor() {
    this.db = mongoose.connection;
    this.initialize();
  }

  initialize() {
    
    let estoqueSchema = new Schema({
      nome: String,
      codigo_produto: {type: String, index: true, unique: true},
      preco_custo: Number,
      preco_venda: Number,
      quantidade: Number,
      imagem: String,
      data_adicao: Date,
      data_modificacao: Date
    }, {collection: 'estoque'});

    let usuariosSchema = new Schema({
      nome: String,
      email: String,
      senha: String,
      grupo: String
    }, {collection: 'usuarios'});

    let grupoSchema = new Schema({
      nome: String,
      modulos: []
    }, {collection: 'grupo_acesso'});

    new Promise((resolve, reject) => {
      this.db.once('open', () => {
        estoqueSchema.index({codigo_produto: 1, unique: true});
        let Estoque = mongoose.model('manolo', estoqueSchema);
        let estoqueSeed = new Estoque({
          nome: 'Nome do produto',
          codigo_produto: '83830380983837',
          preco_custo: 0.50,
          preco_venda: 0.10,
          imagem: 'nome_da_imagem.jpg',
          data_adicao: new Date(),
          data_modificacao: new Date()
        });
        estoqueSeed.save();
        resolve();
      });
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        console.log('criando collection de usuários..');
        let usuarios = mongoose.model('usuarios', usuariosSchema);
        usuarios.create({
          nome: 'Catharina Varela Borges', 
          email: 'cathi_catharina@hotmail.com',
          senha: '14d777febb71c53630e9e843bedbd4d8',
          grupo: 'administrador'
        }, (err, item) => {
          err ? reject(err) : resolve();
        });
      });
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        console.log('criando collection de grupos de acesso..');
        let grupoAcesso = mongoose.model('grupo_acesso', grupoSchema);
        grupoAcesso.create({
          nome: 'administrador',
          modulos: ['usuarios', 'estoque', 'dispensas', 'vendas']
        }, (err, item) => {
          err ? reject(err) : resolve();
        });
      });
    })
    .then(() => {
      process.exit();
    })
    .catch(err => {
      console.log('Erro de conexão', err);
    });
  }

  // connect() {
  //   return new Promise((resolve, reject) => {
  //     MongoClient.connect(`${Constants.DB_PATH}`, (err, db) => {
  //       err ? reject(err) : resolve(db);
  //     });
  //   });
  // }

  // createCollection(collectionName) {
  //   return new Promise((resolve, reject) => {
  //     this.connect().then(db => {
  //       db.createCollection(collectionName, (err, collection) => {
  //         err ? reject(err) : resolve(collection);
  //   	   	console.log("Created testCollection");
  //       });
  //     });
  //   });
  // }

  // insertOne(collection, object) {
  //   return new Promise((resolve, reject) => {
  //     this.connect().then(db => {
  //       db.collection(collection).insertOne(object, (err, result) => {
  //         result ? resolve(result) : reject(err);
  //       });
  //     });
  //   });
  // }



  // result(err, result) {
  //   assert.equal(null, err);
  //   assert.equal(1,result.insertedCount);
  // }

}

new Seeds();
