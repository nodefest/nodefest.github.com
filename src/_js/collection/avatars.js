(function() {

var Avatar = Nodefest.Model.Avatar;
var socket = Nodefest.socket;

/**
 * アバター一覧を管理するCollection
 *
 * @class Nodefest.Collection.Avatars
 * @constructor
 */
Nodefest.Collection.Avatars = Backbone.Collection.extend({
  model: Avatar,

  initialize: function() {
    var self = this;

    socket.on('read', function(avatars) {
      self.add(_.values(avatars));
    });

    socket.on('create', function(attrs) {
      self.add(attrs);
    });

    socket.on('update:position', function(avatarId, position) {
      var model = self.get(avatarId);
      if (model) model.set('position', position);
    });

    socket.on('update:text', function(avatarId, text) {
      var model = self.get(avatarId);
      if (model) model.set('text', text);
    });

    socket.on('destroy', function(avatarId) {
      self.remove(avatarId);
    });
  },

  /**
   * 自分のアバターを作成する
   *
   * @method createMe
   */
  createMe: function() {
    var imageLength = Avatar.images.length;
    var getRand = Nodefest.Utils.getRand;

    this.me = new Avatar({
      position: { 
        top: getRand(0, 300),
        left: getRand(0, 300)
      },
      type: getRand(0, imageLength - 1),
      me: true
    });

    this.add(this.me);
  },

  /**
   * サーバーと同期する。このメソッドを実行するとcreateMe()でつくった
   * モデルをサーバーに送信し、サーバーはcreateが成功するとreadイベントを
   * 発火し、接続中のアバターのデータを送る
   *
   * @method sync
   */
  sync: function() {
    socket.emit('create', this.me.toJSON());
  }
});

})();
