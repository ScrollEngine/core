/*
 * Loads the routes for the core Scroll server.
 * @param app - The Scroll app instance
 */
module.exports = function(app) {
  var config = app.config.views;

  app.get('/', function(req, res) {
    var options = {order:{field:'created',desc:true},limit:5};
    this.controllers.scroll.find('post', options, function(err, posts) {
      res.render(config.index.view, {view:'index',posts:posts});
    });
  }, 'index');

  require('./scroll')(app);
};
