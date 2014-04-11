/*
 * Loads the scroll object controller
 * @param model - The scroll object data model
 */
module.exports = function(model, parse) {

  /**
   * Gets a scroll based a type and slug.
   * @param type {string} - The type of scroll to retrieve.
   * @param slug {string} - The slug for the scroll to retrieve.
   * @param callback {scrollGetCallback} - The callback that is called when
   * a reponse is recieved.
   */
  var get = function(type, slug, callback) {
    model.read({type:type,slug:slug}, function(err, scrolls) {
      if(err) {
        return callback(err, null);
      }

      if(scrolls.length === 0) {
        return callback(null, null);
      }

      var scroll = scrolls[0];
      scroll.raw = scroll.body;
      scroll.body = parse(scroll.body);

      callback(null, scroll);
    });
  };

  /**
   * Creates or updates a scroll.
   * @param scroll {object} - The scroll to save.
   * @param callback {scrollSaveCallback} - The callback that is called when
   * a reponse is recieved.
   */
  var save = function(scroll, callback) {
    if(typeof scroll.id === 'string') {
      return model.update(scroll, callback);
    }

    model.create(scroll, callback);
  };

  // return the accessors
  return {
    get: get,
    save: save
  };
};