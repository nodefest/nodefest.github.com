(function() {

/**
 * アバターを描画するフィールドを管理するView
 *
 * @class Nodefest.View.AvatarsField
 * @constructor
 */
Nodefest.View.AvatarsField = Backbone.View.extend({
  initialize: function(opts) {
    var self = this;

    self.collection.on('add', self.addAvatar, self);
  },

  /**
   * 描画領域にアバター一体を追加する
   *
   * @method addAvatar
   */
  addAvatar: function(avatarModel) {
    var viewClass = avatarModel.isMe() ? 'AvatarMe' : 'Avatar';

    var avatarView = new Nodefest.View[viewClass]({
      model: avatarModel
    });

    this.$el.append(avatarView.el);
  }
});

})();
