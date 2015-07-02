"use strict";
/* global hljs, RELATIVE_PATH, require */

$(document).ready(function() {

  // use only mathml in stripped tags summary
  $("annotation").remove();
  $("katex").contents().filter(function() {
    return this.nodeType === 3;
  }).remove();

  //$(window).on('action:composer.preview', {
  //	selector: '.composer .preview'
  //}, Markdown.highlight);

  require(['composer/formatting', 'composer/controls', 'components'], function(formatting, controls, components) {

    $(window).on('action:posts.loaded action:topic.loaded action:posts.edited', function() {
      //Markdown.highlight(components.get('post/content').find('pre code'));
    });

    formatting.addButtonDispatch('usd', function(textarea, selectionStart, selectionEnd) {
      if (selectionStart === selectionEnd) {
        controls.insertIntoTextarea(textarea, '$inline maths$');
        controls.updateTextareaSelection(textarea, selectionStart + 1, selectionStart + 13);
      } else {
        controls.wrapSelectionInTextareaWith(textarea, '$');
        controls.updateTextareaSelection(textarea, selectionStart + 1, selectionEnd + 1);
      }
    });
  });
});
