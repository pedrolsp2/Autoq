var user = require('./user');
var auth = require('./auth');

module.exports = (app) => {
  app.use('/api', user, auth);
};
