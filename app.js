var util = require('./lib/util'),
    config = require('./config'),
    express = require('express'),
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

  // a few proxies for convenience
  this.post = this.app.post.bind(this.app);
  this.get = this.app.get.bind(this.app);
  this.put = this.app.put.bind(this.app);
  this.delete = this.app.delete.bind(this.app);

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
 * Initializes the server.
 * @memberof Scroll
 * @private
 */
Scroll.prototype._setup = function() {
  // load the express extentions/shims
  require('./lib/express_ext')(this.app);

  // load some required/common middleware
  this.app.use(express.json());
  this.app.use(express.urlencoded());

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

  // create a simple middleware for using HTTP basic authenication
  this.restrict = express.basicAuth(
    this.config.authentication.username,
    this.config.authentication.password
  );
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

  this.app.listen(port, null, null, callback);
};

/**
 * Scroll factory
 * @param [config] {object} - Configuration based to the scroll server
 * created.
 */
module.exports = function(config) {
  return new Scroll(config);
};
