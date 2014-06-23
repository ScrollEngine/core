var clic = require('cli-color'),
    grey = clic.blackBright,
    cyan = clic.cyanBright,
    yellow = clic.yellowBright,
    red = clic.redBright;

module.exports = logger = {
  level: 2,
  color: true
};

var prepend = function(text, pre) {
  var lines = text.split('\n'),
      str = '';

  lines.forEach(function(line, idx) {
    str += pre + ' ' + (logger.color ? grey(line) : line);

    if(idx < lines.length - 1) {
      str += '\n';
    }
  });

  return str;
};

var write = function(level, pre, text, data) {
  if(logger.level < level) {
    return;
  }

  console.log(prepend(text, pre));

  if(data) {
    console.log(prepend(JSON.stringify(data, null, 2), pre));
  }
};

logger.error = function(text, data) {
  write(0, (logger.color ? red('ERROR:') : 'ERROR:'), text, data);
};

logger.warning = function(text, data) {
  write(1, (logger.color ? yellow('WARNING:') : 'WARNING:'), text, data);
};

logger.info = function(text, data) {
  write(2, (logger.color ? cyan('INFO:') : 'INFO:'), text, data);
};

logger.debug = function(text, data) {
  write(3, (logger.color ? grey('DEBUG:') : 'DEBUG:'), text, data);
};
