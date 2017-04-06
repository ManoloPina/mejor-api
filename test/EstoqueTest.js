const assert = require('assert');
const request = require('request');
const Constants = require('../app/Constants');

class EstoqueTest {
  constructor() {
    this.initialize();
  }

  initialize() {
    this.update();
  }

  insert() {

  }

  update() {
    it('should check the update', (done) => {
      new Promise((resolve, reject) => {
        request.post({url:`${Constants.baseUrl}`, form: {
          nome: 'Nome do produto',
          codigo_produto: `${Math.floor(Math.random()*90000) + 10000}`,
          quantidade: 1,
          preco_custo: 10.20,
          preco_venda: 25.00,
          imagem: '',
          data_modificacao: new Date(),
          secret: `${Constants.SECRET_KEY}`
        }}, (err, httpResponse, body) => {
          console.log('body', body);
          err ? reject(err) : resolve(httpResponse);
        });
      })
      .then(done)
      .catch(err => {
        console.err('err', err);
      });
    });
  }

}

new EstoqueTest();