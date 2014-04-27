/*
 * Various general utilities.
 */
var fs = require('fs'),
    path = require('path');

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

/**
 * Gets all the javascript files in a directory.
 * @param dir {string} - The directory to search.
 * @param logErrors {boolean} - Whether to log any file system errors.
 */
util.getJSFiles = function(dir, logErrors) {
  try {
    var files = {};
    fs.readdirSync(dir).forEach(function(file) {
      if(path.extname(file) === '.js') {
        files[path.basename(file, '.js')] = path.resolve(file);
      }
    });

    return files;
  } catch(e) {
    if(logErrors) {
      console.log(e.message);
    }

    return {};
  }
};
