/*
 * Adds the routes for various scroll views and CRUD operations
 * @param app - The Scroll app instance
 */
module.exports = function(app) {
  var config = app.config.views;

  // post-type scrolls
  app.get('/post/:slug', function(req, res) {
    this.controllers.scroll.findOne('post', req.params.slug,
      function(err, scroll) {
        app.render(res, 'post', {post:scroll});
      });
  }, 'post');

  // page-type scrolls
  app.get('/:page', function(req, res) {
    this.controllers.scroll.findOne('page', req.params.page,
      function(err, scroll) {
        app.render(res, 'page', {page:scroll});
      });
  }, 'page');

  /*--------------------------------------
   Scroll data CRUD operations
  --------------------------------------*/
  var crud = new app.Router();
  crud.use(app.restrict);

  crud.post('/', function(req, res) {
      this.controllers.scroll.save(req.body, function(err, scroll) {
        res.send(scroll);
      });
    }.bind(app))
    .put('/:id', app.restrict, function(req, res) {
      req.body.id = req.params.id;
      this.controllers.scroll.save(req.body, function(err) {
        res.send(err || {success:true});
      });
    }.bind(app))
    .delete('/:id', app.restrict, function(req, res) {
      this.controllers.scroll.remove(req.params.id, function(err) {
        res.send(err || {success:true});
      });
    }.bind(app));

  app.use('/scroll', crud);
};
