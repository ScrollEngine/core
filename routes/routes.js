/*
 * Loads the routes for the core Scroll server.
 * @param app - The Scroll app instance
 */
module.exports = function(app) {
  var config = app.config.views;

  app.get('/', (config.index.handler || function(req, res) {
    res.send('Home Page');
  }).bind(app));

  require('./scroll')(app);
};
