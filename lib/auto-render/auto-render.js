var katex = require('katex');
var splitAtDelimiters = require('./splitAtDelimiters');
var winston = require('winston');

var Renderer = {};

Renderer.render = function(text, delimiters) {
  'use strict';
  var data = [{type: 'text', data: text}];
  var i;
  for (i = 0; i < delimiters.length; i++) {
    var delimiter = delimiters[i];
    data = splitAtDelimiters(data, delimiter.left, delimiter.right, delimiter.display || false);
  }

  var output = '';
  for (i = 0; i < data.length; i++) {
    if (data[i].type === 'text') {
      output += data[i].data;
    } else {
      var math = data[i].data;
      try {
        // render maths with katex and wrap it into a katex tag to make client
        // post-treatment easier
        output += '<katex>';
        output += katex.renderToString(math, {displayMode: data[i].display});
        output += '</katex>';
        winston.verbose('nodebb-plugin-katex: Successfully parsed `' + data[i].data);
      } catch (e) {
        if (!(e instanceof katex.ParseError)) {
          throw e;
        }
        winston.verbose('nodebb-plugin-katex: Failed to parse `' + data[i].data + '` with ', e);
        output += data[i].rawData;
        continue;
      }
    }
  }
  return output;
};

module.exports = Renderer;
