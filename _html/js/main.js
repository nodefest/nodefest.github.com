(function ($, window, document, undefined) {

  'use strict';

  var app = {

    run: function () {
      this.$window = $(window);
      this.$header = $('.l-header');
      this.$intro  = $('.l-intro');
      this.$fireworks  = $('.l-fireworks');

      this.windowHeight = window.innerHeight;
      this.headerHeight = this.$header.height();

      this.useEaseScrollable();
      this.resizeContentsHeight();

      this.eventify();
    },

    eventify: function () {
      var self = this;

      self.$window.on('resize', $.proxy(self.resizeContentsHeight, self));
    },

    resizeContentsHeight: function () {
      var height;

      this.windowHeight = window.innerHeight;
      height = this.windowHeight - this.headerHeight;

      this.$intro.css('min-height', height);
      this.$fireworks.css('min-height', height);
    },

    useEaseScrollable: function () {
      $('a[href^=#]').easescrollable({
        easing: 'easeInOutExpo',
        changehash: false,
        adjustEndY: -this.headerHeight,
        dontAdjustEndYIfSelectorIs: '#all'
      });
    }

  };

  window.app = app;

  $(function () {
    app.run();

    
  });

})(jQuery, this, this.document);
