/*
 * Loads the controllers for use
 * @param app - The scroll application instance.
 */
module.exports = function(app) {
  var controllers = {},
      models = require('./data')(app);

  controllers.scroll = require('./scroll')(models.scroll);

  // return the loaded controllers
  return controllers;
};
