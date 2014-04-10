/*
 * Adds the routes for various scroll views and CRUD operations
 * @param app - The Scroll app instance
 */
module.exports = function(app) {
  app.get('/post/:slug', function(req, res) {
    this.controllers.scroll.get('post', req.params.slug, function(err, scroll) {
      res.render('post', {post:scroll});
    });
  }.bind(app));
};
