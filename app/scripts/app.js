(function(global) {
  'use strict';

  global.NF = global.NF || {};

  // See https://github.com/Polymer/polymer/issues/1381
  global.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
    global.NF.paintoon = new global.NF.RP();
    new global.NF.TPC();
    new global.NF.LTC();

  });

})(window);
