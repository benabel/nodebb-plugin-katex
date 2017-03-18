(function pluginKatex() {
  const mathRenderer = require('./auto-render/auto-render'); // eslint-disable-line global-require
  const meta = module.parent.require('./meta');
  const winston = module.parent.require('winston');
  const delimiters = [
    { left: '$$', right: '$$', display: true }, { left: '\\[', right: '\\]', display: true },
    { left: '\\(', right: '\\)', display: false },
  ];
  const Katex = {
    config: {},
    onLoad(params, callback) {
      function render(req, res) {
        res.render('admin/plugins/katex');
      }

      params.router.get('/admin/plugins/katex', params.middleware.admin.buildHeader, render);
      params.router.get('/api/admin/plugins/katex', render);
      Katex.init();
      callback();
    },

    init() {
      // Load saved config
      const that = this;
      const defaults = { dollarInline: false };

      meta.settings.get('katex', (err, options) => {
        if (err) {
          winston.error(err);
        }
        Object.keys(defaults).forEach((field) => {
          // use default if not set in config
          if (Object.prototype.hasOwnProperty.call(options, field)) {
            that.config[field] = options[field];
          } else {
            that.config[field] = defaults[field];
          }
        });

        // manage dollar parsing from admincontrol panel
        if (that.config.dollarInline === 'on' && delimiters.length < 4) {
          delimiters.push({ left: '$', right: '$', display: false });
        } else {
          delimiters.slice(0, 2);
        }
      });
    },

    parsePost(data, callback) {
      const post = data;
      if (data && data.postData && data.postData.content) {
        post.postData.content = mathRenderer.render(data.postData.content, delimiters);
      }
      callback(null, post);
    },

    parseRaw(raw, callback) {
      callback(null, raw ? mathRenderer.render(raw, delimiters) : raw);
    },

    registerFormatting(payload, callback) {
      const formatting = ['usd'];

      formatting.reverse();
      formatting.forEach((format) => {
        payload.options.unshift({ name: format, className: `fa fa-${format}` });
      });

      callback(null, payload);
    },

    admin: {
      menu(customHeader, callback) {
        customHeader.plugins.push({ route: '/plugins/katex', icon: 'fa-usd', name: 'katex' });

        callback(null, customHeader);
      },
    },
  };

  module.exports = Katex;
}());
