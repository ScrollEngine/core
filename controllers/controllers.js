/*
 * Loads the controllers for use
 * @param app - The scroll application instance.
 */
module.exports = function(app) {
  var controllers = {},
      models = require('./data')(app),
      appControllers = app.util.getJSFiles(
        app.config.__path + '/' + app.config.controller.folder
      );

  controllers.scroll = require('./scroll')(models.scroll, app.parse);

  var controller = null;
  for(var c in appControllers) {
    controller = require(appControllers[c]);

    if(typeof controller === 'function') {
      controllers[c] = controller(models[c], controllers);
    } else if(typeof controller === 'object') {
      controllers[controller.name] =
        controller.load(models[controller.name], controllers);
    }
  }

  // return the loaded controllers
  return controllers;
};
