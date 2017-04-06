'use strict';

class UploadMiddleware {
  constructo() {
  }

  estoqueUpload(request, response, next) {
    response.status(200).json('upload realizado');
    next();
  }

}

module.exports = UploadMiddleware;