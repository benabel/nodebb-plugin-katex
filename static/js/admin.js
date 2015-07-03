define('admin/plugins/katex', ['settings'], function(Settings) {
  'use strict';
  /* globals $, app, socket, require */

  var ACP = {};

  ACP.init = function() {
    Settings.load('katex', $('.katex-settings'));

    $('#save').on('click', function() {
      Settings.save('katex', $('.katex-settings'), function() {
        app.alert({
          type: 'success',
          alert_id: 'katex-saved',
          title: 'Settings Saved',
          message: 'Please reload your NodeBB to apply these settings',
          clickfn: function() {
            socket.emit('admin.reload');
          }
        });
      });
    });
  };

  return ACP;
});
