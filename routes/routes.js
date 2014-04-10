/*
 * Loads the routes for the core Scroll server.
 * @param app - The Scroll app instance
 */
module.exports = function(app) {
  app.get('/', function(req, res) {
    res.send('Home Page');
  });

  require('./scroll')(app);
};
