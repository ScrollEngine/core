/**
 * Express Extensions
 * Modifies and shims express to allow a few extra features not available
 * otherwise.
 */

/* @param app - An express application instance. */
module.exports = function(app) {

  /*
   * "monkey patch" to allow multiple view folders to be defined.
   * http://stackoverflow.com/a/17252228/513922
   */
  var lookup_proxy = app.get('view').prototype.lookup;

  app.get('view').prototype.lookup = function(viewName) {
    var context, match;
    if (this.root instanceof Array) {
      for (var i = 0; i < this.root.length; i++) {
        context = {root: this.root[i]};
        match = lookup_proxy.call(context, viewName);
        if (match) {
          return match;
        }
      }
      return null;
    }
    return lookup_proxy.call(this, viewName);
  };
  //--------------------------------------------------------
};
