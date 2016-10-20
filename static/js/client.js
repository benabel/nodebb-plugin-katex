'use strict';
/* global document $*/

$(document).ready(function() {
  // Add the $ composer button
  var Katex = {};

  $(window).on('action:composer.enhanced', function() {
    Katex.prepareFormattingTools();
  });

  /**
  * Add a dollar button to the composer
  */
  Katex.prepareFormattingTools = function() {
    require(
        ['composer/formatting', 'composer/controls'],
        function(formatting, controls) {
          if (Katex.dollarInline === 'on') {
            formatting.addButtonDispatch('usd', function(textarea, selectionStart, selectionEnd) {
              if (selectionStart === selectionEnd) {
                controls.insertIntoTextarea(textarea, '$inline maths$');
                controls.updateTextareaSelection(textarea, selectionStart + 1, selectionStart + 13);
              } else {
                controls.wrapSelectionInTextareaWith(textarea, '$');
                controls.updateTextareaSelection(textarea, selectionStart + 1, selectionEnd + 1);
              }
            });
          } else {
            formatting.addButtonDispatch('usd', function(textarea, selectionStart, selectionEnd) {
              if (selectionStart === selectionEnd) {
                controls.insertIntoTextarea(textarea, '\\\\(inline maths\\\\)');
                controls.updateTextareaSelection(textarea, selectionStart + 3, selectionStart + 15);
              } else {
                controls.wrapSelectionInTextareaWith(textarea, '\\\\(', '\\\\)');
                controls.updateTextareaSelection(textarea, selectionStart + 4, selectionEnd + 4);
              }
            });
          }
        });
  };

  // use only mathml in stripped tags summary
  $('div.post-preview-content annotation').remove();
  $('katex')
      .contents()
      .filter(function() {
        return this.nodeType === 3;
      })
      .remove();
});
