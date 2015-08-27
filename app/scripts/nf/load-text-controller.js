(function(global) {
  'use strict';

  global.NF = global.NF || {};

  /**
   * text.jsの内容をfetchして表示する系のコンポーネントを、
   * webComponentReadyのタイミングで一括fetchするオジサン
   *
   */
  var LoadTextController = function() {
    this.targets = document.querySelectorAll('[data-jsLoadText]');
    this.fetch();
  };
  LoadTextController.prototype = {
    constructor: LoadTextController,
    fetch: function() {
      [].slice.call(this.targets).forEach(function(el) { el.fetch(); });
    }
  };

  global.NF.LTC = LoadTextController;

})(window);
