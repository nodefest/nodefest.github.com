(function() {

/**
 * 自分自身のアバター一体を管理するView
 *
 * @class Nodefest.View.AvatarMe
 * @extend Nodefest.View.Avatar
 * @constructor
 */
Nodefest.View.AvatarMe = Nodefest.View.Avatar.extend({
  defaultText: 'クリックかスペースキーで入力開始',

  events: {
    'click': '_onClick',
    'keydown textarea': '_onKeydownInput',
    'keyup textarea': '_onKeyupInput',
    'focusout textarea': '_onFocusoutInput'
  },

  initialize: function() {
    var self = this;

    self.render();
    self.bindEvent();
    self.$el.addClass('ex-avatar-me');
    self.$input = $('<textarea>')
      .attr('maxlength', 140)
      .appendTo(self.$comment)
      .hide();

    $(document).bind('click', function(e) {
      self._onDocClick(e);
    });

    $(document).bind('keydown', function(e) {
      self._onDocKeydown(e);
    });
  },

  /**
   * 現在インプットモードかどうかを返す
   *
   * @method isInputMode
   * @return {Boolean}
   */
  isInputMode: function() {
    return this.$input.is(':visible');
  },

  /**
   * インプットモードに変更する
   *
   * @method toInputMode
   */
  toInputMode: function() {
    this.$el.addClass('inputMode');
    this.$input.show().focus();
    this.$text.hide();
  },

  /**
   * 現在入力されているデータをモデルにセットしてインプットモードを終了する
   *
   * @method submitText
   */
  submitText: function() {
    this.$el.removeClass('inputMode');
    this.model.set('text', this.$input.val());
    this.$input.hide();
    this.$text.show();
  },

  /**
   * アバターをクリックしたときのイベントハンドラ  
   * インプットモードに移行する
   *
   * @method _onClick
   * @private
   */
  _onClick: function(e) {
    // バブリングをとめることでテキストボックスなどをクリックしたときに
    // 移動しないようにする
    e.stopPropagation();

    if (!this.isInputMode()) {
      this.toInputMode();
    }
  },

  /**
   * テキストボックスでキー入力したときのイベントハンドラ  
   * エンターかescキーが押されたらテキストを確定する
   *
   * @method _onKeydownInput
   * @private
   * @param {event} e
   */
  _onKeydownInput: function(e) {
    var enter = 13;
    var esc = 27;

    if (e.keyCode === enter || e.keyCode === esc) {
      this.submitText();
    }
  },

  /**
   * テキストボックスでキーアップしたときのイベントハンドラ  
   * 入力エリアの高さを計算する
   *
   * @method _onKeyupInput
   * @private
   * @param {event} e
   */
  _onKeyupInput: function(e) {
    var val = this.$input.val();
    if (!val) return;

    this.$text.text(this.$input.val());
    var height = this.$text.height();
    if (height) this.$input.height(height);
  },

  /**
   * テキストボックスからフォーカスが外れた時のイベントハンドラ  
   * フォーカスが外れたらテキストを確定する
   *
   * @method _onFocusoutInput
   * @private
   * @param {event} e
   */
  _onFocusoutInput: function(e) {
    this.submitText();
  },

  /**
   * ドキュメントをクリックしたときのイベントハンドら  
   * スペースキーを押したらインプットモードに移行、矢印キーを押したら押された方向に移動する
   *
   * @method _onDocKeydown
   * @private
   * @param {event} e
   */
  _onDocClick: function(e) {
    this.model.set('position', {
      // TODO:
      // クリックした位置に画像の中央部分がくるように画像の高さと幅を引いて
      // いるけどハードコーディングしてるので外に出す
      top: e.pageY - 40,
      left: e.pageX - 22
    });
  },

  /**
   * ドキュメントでキーを押した時のイベントハンドラ  
   * スペースキーを押したらインプットモードに移行、矢印キーを押したら押された方向に移動する
   *
   * @method _onDocKeydown
   * @private
   * @param {event} e
   */
  _onDocKeydown: function(e) {
    if (this.isInputMode()) return;

    var space = 32;
    var up    = 38;
    var down  = 40;
    var left  = 39;
    var right = 37;

    var targetKeys = [space, up, down, left, right];

    if (_.indexOf(targetKeys, e.keyCode) !== -1) {
      e.preventDefault();
    }

    switch (e.keyCode) {
      case space: this.toInputMode(); this.$input.select(); break;
      case up:    this.model.moveToUp(); break;
      case down:  this.model.moveToDown(); break;
      case left:  this.model.moveToLeft(); break;
      case right: this.model.moveToRight(); break;
    }
  }
});

})();
