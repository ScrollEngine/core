/*
 * Initializes the model/data layer.
 * @param app - The Scroll app instance
 */
module.exports = function(app) {
  // load the model layer module
  var data = require(app.config.model.module);

  data.connect(app.config.model.connection,
    function() {
      console.log('Connected to ' + app.config.model.connection);
    },
    function(err) {
      console.error(err);
    });

  // return the models for use
  return data.models;
};
