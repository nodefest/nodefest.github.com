;(function(global) {
  'use strict';

  global.NF = global.NF || {};

  var RhinoStatus = function() {
    this.$paintBarA = document.getElementById('js-nf-paint-bar-a');
    this.$paintBarB = document.getElementById('js-nf-paint-bar-b');
    this.$paintStatA = document.getElementById('js-nf-paint-stat-a');
    this.$paintStatB = document.getElementById('js-nf-paint-stat-b');
  };

  RhinoStatus.prototype = {
    constructor: RhinoStatus,
    updatePaintStat: function(a, b) {
      this.$paintBarA.style.width = a + '%';
      this.$paintBarB.style.width = b + '%';
      this.$paintStatA.textContent = a;
      this.$paintStatB.textContent = b;
    }
  };

  global.NF.RS = RhinoStatus;

}(window));

