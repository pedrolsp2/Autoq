var user = require('./user');
var auth = require('./auth');
var pecas = require('./pecas');
var cliente = require('./cliente');

module.exports = (app) => {
  app.use('/api', user, auth, cliente, pecas);
};
