/*
 * Loads the scroll object controller
 * @param model - The scroll object data model
 */
module.exports = function(model, parse) {

  /**
   * Gets a scroll based a type and slug.
   * @param type {string} - The type of scroll to retrieve.
   * @param slug {string} - The slug for the scroll to retrieve.
   * @param callback {scrollFindOneCallback} - The callback that is called
   * when a reponse is recieved.
   */
  var findOne = function(type, slug, callback) {
    model.read({type:type,slug:slug}, function(err, scrolls) {
      if(err) {
        return callback(err, null);
      }

      if(scrolls.length === 0) {
        return callback(null, null);
      }

      callback(null, parse(scrolls[0]));
    });
  };

  /**
   * Gets a set of scrolls limited by type and query options.
   * @param type {string} - The type of scroll to retrieve.
   * @param options {string} - The query options to use with the qurey.
   * @param callback {scrollFindCallback} - The callback that is called when
   * a reponse is recieved.
   */
  var find = function(type, options, callback) {
    model.read({type:type}, options, function(err, scrolls) {
      if(err) {
        return callback(err, null);
      }

      if(scrolls.length === 0) {
        return callback(null, []);
      }

      scrolls.forEach(function(scroll) {
        scroll = parse(scroll);
      });

      callback(null, scrolls);
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
    findOne: findOne,
    find: find,
    save: save
  };
};
