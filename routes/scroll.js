/*
 * Adds the routes for various scroll views and CRUD operations
 * @param app - The Scroll app instance
 */
module.exports = function(app) {
  var config = app.config.views;

  // post-type scrolls
  app.get('/post/:slug', (config.post.handler || function(req, res) {
    this.controllers.scroll.findOne('post', req.params.slug,
      function(err, scroll) {
        res.render(config.post.view, {post:scroll});
      });
  }).bind(app));

  // page-type scrolls
  app.get('/:page', (config.page.handler || function(req, res) {
    this.controllers.scroll.findOne('page', req.params.page,
      function(err, scroll) {
        res.render(confg.page.view, {page:scroll});
      });
  }).bind(app));
};
