/*
 * Adds the routes for various scroll views and CRUD operations
 * @param app - The Scroll app instance
 */
module.exports = function(app) {
  var config = app.config.views;

  app.get('/post/:slug', (config.post.handler || function(req, res) {
    this.controllers.scroll.get('post', req.params.slug,
      function(err, scroll) {
        res.render(config.post.view, {post:scroll});
      });
  }).bind(app));

  app.get('/:page', (config.page.handler || function(req, res) {
    this.controllers.scroll.get('page', req.params.page,
      function(err, scroll) {
        res.render(confg.page.view, {page:scroll});
      });
  }).bind(app));
};
