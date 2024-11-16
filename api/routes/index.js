var user = require('./user');
var auth = require('./auth');
var cliente = require('./cliente');

module.exports = (app) => {
  app.use('/api', user, auth, cliente);
};
