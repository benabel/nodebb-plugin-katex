(function() {
    "use strict";

  var fs = require('fs'),
    path = require('path'),
    url = require('url'),
    katex = require('katex'),
    mathRenderer = require('./static/lib/auto-render/auto-render'),
    meta = module.parent.require('./meta'),
    nconf = module.parent.require('nconf'),
    plugins = module.parent.exports,
    parser,
    delimiters = [{
      left: "$$",
      right: "$$",
      display: true
    }, {
      left: "\\[",
      right: "\\]",
      display: true
    }, {
      left: "\\(",
      right: "\\)",
      display: false
    }],
    Katex = {
      config: {},
      onLoad: function(params, callback) {
        function render(req, res, next) {
          res.render('admin/plugins/katex');
        }

        params.router.get('/admin/plugins/katex', params.middleware.admin.buildHeader, render);
        params.router.get('/api/admin/plugins/katex', render);
        Katex.init();
        callback();
      },

      init: function() {
        // Load saved config
        var _self = this,
          fields = ['dollarInline'],
          defaults = {
            'dollarInline': false
          };

        meta.settings.get('katex', function(err, options) {
          for (var field in defaults) {
            // If not set in config (nil)
            if (!options.hasOwnProperty(field)) {
              _self.config[field] = defaults[field];
            } else {
              _self.config[field] = options[field];
            }
          }
          // manage dollar parsing from admincontrol panel
          if (_self.config.dollarInline === 'on' && delimiters.length < 4) {
            delimiters.push({
              left: "$",
              right: "$",
              display: false
            });
          } else {
            delimiters.slice(0, 2);
          }
        });
      },

      parsePost: function(data, callback) {
        if (data && data.postData && data.postData.content) {
          data.postData.content = mathRenderer.render(data.postData.content, delimiters);
        }
        callback(null, data);
      },

      parseRaw: function(raw, callback) {
        callback(null, raw ? mathRenderer.render(raw, delimiters) : raw);
      },

      registerFormatting: function(payload, callback) {
        var formatting = ['usd'];

        formatting.reverse();
        formatting.forEach(function(format) {
          payload.options.unshift({
            name: format,
            className: 'fa fa-' + format
          });
        });

        callback(null, payload);
      },

      admin: {
        menu: function(custom_header, callback) {
          custom_header.plugins.push({
            "route": '/plugins/katex',
            "icon": 'fa-usd',
            "name": 'katex'
          });

          callback(null, custom_header);
        }
      }
    };

  module.exports = Katex;
})();
