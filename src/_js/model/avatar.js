(function() {

var socket = Nodefest.socket;
var MOVE_ARROW_KEY_DIST = 20;

/**
 * アバター一体を管理するModel
 *
 * @class Nodefest.Model.Avatar
 * @constructor
 */
Nodefest.Model.Avatar = Backbone.Model.extend({
  initialize: function() {
    var self = this;

    self.on('change:position', function() {
      if (self.isMe()) {
        socket.emit('update:position', self.get('position'));
      }
    });

    self.on('change:text', function() {
      if (self.isMe()) {
        socket.emit('update:text', self.get('text'));
      }
    });
  },

  /**
   * 画像のパスを取得する
   *
   * @method getImagePath
   * @return {String}
   */
  getImagePath: function() {
    var type = this.get('type');

    var src = Nodefest.Model.Avatar.images[type];

    if (this.isMe()) {
      src = src.replace(/\.gif$/, 'me.gif');
    }

    return src;
  },

  /**
   * 自分かどうかを真偽値で返す
   *
   * @method isMe
   * @return {Boolean}
   */
  isMe: function() {
    return !!this.get('me');
  },

  /**
   * 上に移動する
   *
   * @method moveToUp
   */
  moveToUp: function() {
    var position = this.get('position');

    this.set('position', {
      top: position.top - MOVE_ARROW_KEY_DIST,
      left: position.left
    });
  },

  /**
   * 下に移動する
   *
   * @method moveToUp
   */
  moveToDown: function() {
    var position = this.get('position');

    this.set('position', {
      top: position.top + MOVE_ARROW_KEY_DIST,
      left: position.left
    });
  },

  /**
   * 左に移動する
   *
   * @method moveToUp
   */
  moveToLeft: function() {
    var position = this.get('position');
    this.set('position', {
      top: position.top,
      left: position.left + MOVE_ARROW_KEY_DIST
    });
  },

  /**
   * 右に移動する
   *
   * @method moveToUp
   */
  moveToRight: function() {
    var position = this.get('position');

    this.set('position', {
      top: position.top,
      left: position.left - MOVE_ARROW_KEY_DIST
    });
  }
},

{
  /**
   * アバターの画像を配列で指定する  
   * アプリケーション側で次のように設定しなければいけない
   *
   *     Nodefest.Model.Avatar.images = [
   *       './avatar1.gif',
   *       './avatar2.gif'
   *     ];
   * 
   * @property images
   * @static
   */
  images: []
});

})();
