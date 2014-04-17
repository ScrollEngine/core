var util = require('./lib/util'),
    config = require('./config'),
    express = require('express'),
    passport = require('passport'),
    async = require('async'),
    marked = require('marked');

/**
 * Scroll Core Class
 * @class
 * @name Scroll
 * @param [config] {object} - base configuration for the Scroll server.
 */
var Scroll = function(config) {
  this.config = util.extend(require('./config'), (config || {}));
  this.app = express();

  // convenience access to the router object
  this.Router = express.Router;

  // a few proxies for convenience
  this.post = this.app.post.bind(this.app);
  this.put = this.app.put.bind(this.app);
  this.delete = this.app.delete.bind(this.app);
  this.use = this.app.use.bind(this.app);

  // set up the scroll body parsing
  this.parse = config.parse || this.parse;

  // loads the controllers
  this.controllers = require('./controllers/controllers')(this);

  // load the view layer
  this._loadView();

  // initialize the server
  this._setup();
};

/**
 * Convenience function to add a GET route to the server, which binds the
 * handler to the server and checks for a view override.
 * @memberof Scroll
 * @param route {string} - The route definition.
 * @param [middleware] {mixed} - The express-compatible middleware to use
 * with the route.
 * @param handler {function(req, res)} - The handler for the route.
 * @param [view] {string} - The view used for the route. Used to allow
 * views and applications to override the route handler.
 */
Scroll.prototype.get = function(route, middleware, handler, view) {
  var hasMiddleware = false;

  // if a middleware and a handler is provided
  if(typeof middleware === 'function' && typeof handler === 'function') {
    hasMiddleware = true;
  }

  // if only a route and handler were provided
  if(typeof middleware === 'function' && typeof handler === 'undefined') {
    handler = middleware;
  }

  // if a handler and a view is provided
  if(typeof middleware === 'function' && typeof handler === 'string') {
    view = handler;
    handler = middleware;
  }

  // check if the handler for the view has been overridden
  if(view && this.config.views.hasOwnProperty(view)) {
    handler = this.config.views[view].handler || handler;
  }

  handler = handler.bind(this);

  if(hasMiddleware) {
    this.app.get(route, middleware, handler);
  } else {
    this.app.get(route, handler);
  }
};

/**
 * Initializes the server.
 * @memberof Scroll
 * @private
 */
Scroll.prototype._setup = function() {
  // load the express extentions/shims
  require('./lib/express_ext')(this.app);

  // load some required/common middleware
  this.app.use(require('body-parser')());
  this.app.use(passport.initialize());

  // set up the view configuration
  var view = this.config.view;
  this.app.use(express.static('./public'));             // application
  this.app.use(express.static(view.path + '/public')); // theme

  this.app.engine(view.ext, view.engine);
  this.app.set('view engine', view.ext);
  this.app.set('views', [
    './views',             // application
    view.path + '/views', // theme
  ]);


  // set up passport to use basic auth
  var DigestStrategy = require('passport-http').DigestStrategy;

  passport.use(new DigestStrategy({qop:'auth'},
    function(username, done) {
      done(null, this, this.password);
    }.bind(this.config.authentication)
  ));

  // convenience for passport digest authentication
  this.restrict = passport.authenticate('digest', {session:false});
};

/**
 * Loads in the view layer and sets up the view configuration.
 * @memberof Scroll
 * @private
 */
Scroll.prototype._loadView = function() {
  if(typeof this.config.view === 'string') {
    this.config.view = {
      module: this.config.view,
      path: __dirname + '/node_modules/' + this.config.view
    };

    var view = require(this.config.view.module)(this.config);
    for(var p in view) {
      this.config.view[p] = view[p];
    }
  }
};

/**
 * Parses a scroll's content. Defaults to markdown parsing.
 * @param content {string} - The text to parse.
 */
Scroll.prototype.parse = function(scroll) {
  scroll.raw = scroll.body;
  scroll.body = marked(scroll.body);

  return scroll;
};

/**
 * Starts the Scroll server.
 * @memberof Scroll
 * @param port - The port the server should listen on.
 * @param callback {startCallback} - Callback called when the server has
 * started.
 */
Scroll.prototype.start = function(port, callback) {
  // add the server routes
  require('./routes/routes')(this);

  this.app.listen(port, null, null, function() {
    console.log('Scroll Server listening on port %s', port);

    if(typeof callback === 'function') {
      callback();
    }
  });
};

/**
 * Scroll factory
 * @param [config] {object} - Configuration based to the scroll server
 * created.
 */
module.exports = function(config) {
  return new Scroll(config);
};
