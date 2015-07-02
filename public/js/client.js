"use strict";
/* global hljs, RELATIVE_PATH, require */

$(document).ready(function() {

	//$(window).on('action:composer.preview', {
	//	selector: '.composer .preview'
	//}, Markdown.highlight);

	require(['composer/formatting', 'composer/controls', 'components'], function(formatting, controls, components) {

		$(window).on('action:posts.loaded action:topic.loaded action:posts.edited', function() {
			//Markdown.highlight(components.get('post/content').find('pre code'));
		});

		formatting.addButtonDispatch('usd', function(textarea, selectionStart, selectionEnd){
			if(selectionStart === selectionEnd){
				controls.insertIntoTextarea(textarea, '$inline maths$');
				controls.updateTextareaSelection(textarea, selectionStart + 1, selectionStart + 13);
			} else {
				controls.wrapSelectionInTextareaWith(textarea, '$');
				controls.updateTextareaSelection(textarea, selectionStart + 1, selectionEnd + 1);
			}
		});

		formatting.addButtonDispatch('italic', function(textarea, selectionStart, selectionEnd){
			if(selectionStart === selectionEnd){
				controls.insertIntoTextarea(textarea, "*italicised text*");
				controls.updateTextareaSelection(textarea, selectionStart + 1, selectionStart + 16);
			} else {
				controls.wrapSelectionInTextareaWith(textarea, '*');
				controls.updateTextareaSelection(textarea, selectionStart + 1, selectionEnd + 1);
			}
		});

		formatting.addButtonDispatch('list', function(textarea, selectionStart, selectionEnd){
			if(selectionStart === selectionEnd){
				controls.insertIntoTextarea(textarea, "\n* list item");

				// Highlight "list item"
				controls.updateTextareaSelection(textarea, selectionStart + 3, selectionStart + 12);
			} else {
				controls.wrapSelectionInTextareaWith(textarea, '\n* ', '');
				controls.updateTextareaSelection(textarea, selectionStart + 3, selectionEnd + 3);
			}
		});

		formatting.addButtonDispatch('link', function(textarea, selectionStart, selectionEnd){
			if(selectionStart === selectionEnd){
				controls.insertIntoTextarea(textarea, "[link text](link url)");

				// Highlight "link url"
				controls.updateTextareaSelection(textarea, selectionStart + 12, selectionEnd + 20);
			} else {
				controls.wrapSelectionInTextareaWith(textarea, '[', '](link url)');

				// Highlight "link url"
				controls.updateTextareaSelection(textarea, selectionEnd + 3, selectionEnd + 11);
			}
		});
	});
});
