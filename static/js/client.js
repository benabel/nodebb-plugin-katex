(function () {
	"use strict";
	/*global socket*/

	// Retrieve config from the plugin socket and then add the composer button
	var Katex = {};
	var deferred = new $.Deferred();

	function callBack(config) {
		Katex.dollarInline = config.dollarInline;
		deferred.resolve(config);
	}
	// do the async call to the socket.
	socket.emit('plugins.Katex.getConfig', callBack);

	function addComposerButton() {
		require(['composer/formatting', 'composer/controls', 'components'], function (formatting, controls, components) {

			if (Katex.dollarInline === 'on') {
				formatting.addButtonDispatch('usd', function (textarea, selectionStart, selectionEnd) {
					if (selectionStart === selectionEnd) {
						controls.insertIntoTextarea(textarea, '$inline maths$');
						controls.updateTextareaSelection(textarea, selectionStart + 1, selectionStart + 13);
					} else {
						controls.wrapSelectionInTextareaWith(textarea, '$');
						controls.updateTextareaSelection(textarea, selectionStart + 1, selectionEnd + 1);
					}
				});
			} else {
				formatting.addButtonDispatch('usd', function (textarea, selectionStart, selectionEnd) {
					if (selectionStart === selectionEnd) {
						controls.insertIntoTextarea(textarea, '\\(inline maths\\)');
						controls.updateTextareaSelection(textarea, selectionStart + 2, selectionStart + 14);
					} else {
						controls.wrapSelectionInTextareaWith(textarea, '\\(', '\\)');
						controls.updateTextareaSelection(textarea, selectionStart + 2, selectionEnd + 2);
					}
				});
			}
		});
	}

	$(document).ready(function () {
		// use only mathml in stripped tags summary
		$("div.post-preview-content annotation").remove();
		$("katex").contents().filter(function () {
			return this.nodeType === 3;
		}).remove();

		// add the usd button to the composer when config caught from socket
		$.when(deferred).then(addComposerButton);
	});
})();
