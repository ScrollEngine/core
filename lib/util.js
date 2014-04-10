/*
 * Various general utilities.
 */

module.exports = util = require('util');

/*
 * Simple object cloner.
 * @param obj {object} - The object to copy.
 */
util.copy = function(obj) {
  var cp = {};

  for(var p in obj) {
    if(obj[p] !== null && obj[p] instanceof Array === false && typeof obj[p] === 'object') {
      cp[p] = util.copy(obj[p]);
    } else {
      cp[p] = obj[p];
    }
  }

  return cp;
};

/*
 * Simple add/replace object extend
 * @param obj {object} - The base object.
 * @param ext {object} - The object extentions.
 */
util.extend = function(obj, ext) {
  var cp = util.copy(obj);

  for(var p in ext) {
    if(cp.hasOwnProperty(p) && ext[p] === null) {
      delete cp[p];
    } else if(!cp.hasOwnProperty(p) || ext[p] instanceof Array || typeof ext[p] !== 'object') {
      cp[p] = ext[p];
    } else {
      cp[p] = util.extend(cp[p], ext[p]);
    }
  }

  return cp;
};
