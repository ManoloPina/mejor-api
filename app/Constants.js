'use strict';

class Constants {

  static get SECRET_KEY() {
    return "Gh5=:2(gF)85DhEB3mM[&-5<VJ[htX^K";
  }

  static get DB_PATH() {
    return "mongodb://root:root@ds143340.mlab.com:43340/mejor_db";
  }

  static get baseUrl() {
    return 'http://localhost:3000';
  }
  
  static get MODULES() {
    return sessionStorage.getItem('modulos') ? sessionStorage.getItem('modulos').split(',') : [];
  }

  static get SALTS_ROUND() {
    return 10;
  }
}

module.exports = Constants;
