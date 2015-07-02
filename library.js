(function() {
	"use strict";

	var	fs = require('fs'),
		path = require('path'),
		url = require('url'),
		katex = require('katex'),
		mathRenderer = require('./lib/auto-render/auto-render'),
		meta = module.parent.require('./meta'),
		nconf = module.parent.require('nconf'),
		plugins = module.parent.exports,
		parser,
		delimiters = [
		    {left: "$$", right: "$$", display: true},
		    {left: "\\[", right: "\\]", display: true},
		    {left: "\\(", right: "\\)", display: false},
		    // LaTeX uses this, but it ruins the display of normal `$` in text:
		    {left: "$", right: "$", display: false}
		],
		Markdown = {
			config: {},
			onLoad: function(params, callback) {
				function render(req, res, next) {
					res.render('admin/plugins/katex', {
						themes: Markdown.themes
					});
				}

				params.router.get('/admin/plugins/katex', params.middleware.admin.buildHeader, render);
				params.router.get('/api/admin/plugins/katex', render);
				//params.router.get('/markdown/config', function(req, res) {
				//	res.status(200).json({
				//		highlight: Markdown.highlight ? 1 : 0,
				//		theme: Markdown.config.highlightTheme || 'railscasts.css'
				//	});
				//});

				Markdown.init();
				callback();
			},

			init: function() {
				// Load saved config
				var	_self = this,
					fields = [
						'html', 'xhtmlOut', 'breaks', 'langPrefix', 'linkify', 'typographer', 'externalBlank', 'nofollow'
					],
					defaults = {
						'html': false,
						'xhtmlOut': true,
						'breaks': true,
						'langPrefix': 'language-',
						'linkify': true,
						'typographer': false,
						'highlight': true,
						'highlightTheme': 'railscasts.css',
						'externalBlank': false,
						'nofollow': true
					};

				meta.settings.get('markdown', function(err, options) {
					for(var field in defaults) {
						// If not set in config (nil)
						if (!options.hasOwnProperty(field)) {
							_self.config[field] = defaults[field];
						} else {
							if (field !== 'langPrefix' && field !== 'highlightTheme' && field !== 'headerPrefix') {
								_self.config[field] = options[field] === 'on' ? true : false;
							} else {
								_self.config[field] = options[field];
							}
						}
					}

				});
			},

			parsePost: function(data, callback) {
				if (data && data.postData && data.postData.content) {
					data.postData.content = mathRenderer.render(data.postData.content, delimiters);
				}
				callback(null, data);
			},

			parseSignature: function(data, callback) {
				if (data && data.userData && data.userData.signature) {
					data.userData.signature = parser.render(data.userData.signature);
				}
				callback(null, data);
			},

			parseRaw: function(raw, callback) {
				callback(null, raw ? parser.render(raw) : raw);
			},

			registerFormatting: function(payload, callback) {
				var formatting = ['usd'];

				formatting.reverse();
				formatting.forEach(function(format) {
					payload.options.unshift({ name: format, className: 'fa fa-' + format });
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

	module.exports = Markdown;
})();
