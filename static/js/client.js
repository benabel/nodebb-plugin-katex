(function() {
  "use strict";

  $(document).ready(function() {

    // use only mathml in stripped tags summary
    $("div.post-preview-content annotation").remove();
    $("katex").contents().filter(function() {
      return this.nodeType === 3;
    }).remove();

    // add the usd button to the composer
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
})();
