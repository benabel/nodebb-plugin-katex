var katex = require('katex'),
  S = require('string'),
  splitAtDelimiters = require("./splitAtDelimiters");

var Renderer = {};

Renderer.render = function(text, delimiters) {
  var data = [{
    type: "text",
    data: text
  }];
  for (var i = 0; i < delimiters.length; i++) {
    var delimiter = delimiters[i];
    data = splitAtDelimiters(
      data, delimiter.left, delimiter.right,
      delimiter.display || false);
  }

  var output = '';

  for (var i = 0; i < data.length; i++) {
    if (data[i].type === "text") {
      output += data[i].data;
    } else {
      var math = data[i].data;
      try {
        // render maths with katex and wrap it into a katex tag to make client post-treatment easier
        output += S(katex.renderToString(math, {
          displayMode: data[i].display
        })).wrapHTML('katex').s;
      } catch (e) {
        if (!(e instanceof katex.ParseError)) {
          throw e;
        }
        console.error(
          "KaTeX auto-render: Failed to parse `" + data[i].data +
          "` with ",
          e
        );
        output += data[i].rawData;
        continue;
      }
    }
  }

  return output;
};

module.exports = Renderer;
