(function() {

var MOVE_SPEED = 300;

/**
 * アバター一体を管理するView
 *
 * @class Nodefest.View.Avatar
 * @constructor
 */
Nodefest.View.Avatar = Backbone.View.extend({
  tagName: 'div',

  className: 'mod-avatar',

  tmpl: 'avatar',

  initialize: function() {
    this.render();
    this.bindEvent();
  },

  /**
   * モデルのイベントのバインドをおこなう
   *
   * @method bindEvent
   */
  bindEvent: function() {
    var self = this;

    self.model.on('change:position', self.move, self);
    self.model.on('change:text', self.talk, self);
    self.model.on('remove', function() {
      self.$el.remove();
    });
  },

  /**
   * モデルの情報を元にHTMLをつくる
   *
   * @method render
   */
  render: function() {
    var position = this.model.get('position');
    var imagePath = this.model.getImagePath();

    var tmpl = $('#tmpl-' + this.tmpl).html();
    var html = _.template(tmpl, { image: imagePath });

    this.$el.html(html).css(position);
    this.$comment = this.$('.mod-avatar-comment');
    this.$text = $('<span>').appendTo(this.$comment);

    this.talk();
  },

  /**
   * アバターをアニメーションしながら移動させる
   *
   * @method move
   */
  move: function() {
    var position = this.model.get('position');
    var current = {
      top: parseInt(this.$el.css('top'), 10) || 0,
      left: parseInt(this.$el.css('left'), 10) || 0
    };

    // jQuery#animateでdurationを一定にすると移動距離によって移動速度が
    // 変わるので移動速度を一定にするためdurationを移動距離から算出する
    var distTop = Math.abs(current.top - position.top);
    var distLeft = Math.abs(current.left - position.left);
    var dist = Math.sqrt(distTop * distTop + distLeft * distLeft);
    var duration = dist * 1000 / MOVE_SPEED;

    this.$el.stop().animate(position, duration, 'linear');
  },

  /**
   * アバターのセリフのテキストを表示する
   *
   * @method talk
   */
  talk: function() {
    var text = this.model.get('text') || this.defaultText;

    if (text) {
      this.$text.text(text);
      this.$comment.show();
    }
    else {
      this.$comment.hide();
    }
  }
});

})();
