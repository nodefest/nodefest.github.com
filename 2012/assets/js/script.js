(function() {

var Nodefest = window.Nodefest = {
  Model: {},
  Collection: {},
  View: {}
};

if (window.io) {
  Nodefest.socket = io.connect('http://' + window.socketHost + '/');
}
else {
  Nodefest.socket = {
    on: function() {},
    emit: function() {}
  };
}

})();

/**
 * ユーティリティクラス
 *
 * @class Nodefest.Utils
 * @static
 */
Nodefest.Utils = {

  /**
   * fromからtoまでの間のランダムな整数を返す
   *
   * @method getRand
   * @static
   * @param {Number} from
   * @param {Number} to
   * @return {Number}
   */
  getRand: function(from, to) {
    return from + Math.floor( Math.random() * (to - from + 1) );
  }
};

(function() {

var socket = Nodefest.socket;
var MOVE_ARROW_KEY_DIST = 20;
var TOP_LIMIT = 10000;
var LEFT_LIMIT = 5000;

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
   * Backbone.Model.prototype.setを上書き
   *
   * @method set
   * @param key {String}
   * @param value {Mixed}
   * @param options {Object}
   * @return {String}
   */
  set: function(key, value, options) {
      var attrs, attr, val;

      if (_.isObject(key) || key === null || key === undefined) {
        attrs = key;
        options = value;
      } else {
        attrs = {};
        attrs[key] = value;
      }

      var top, left;
      if (attrs.position) {
        top = parseInt(attrs.position.top, 10) || 0;
        left = parseInt(attrs.position.left, 10) || 0;

        if (top < 0) top = 0;
        if (top > TOP_LIMIT) top = TOP_LIMIT;

        if (left < 0) left = 0;
        if (left > LEFT_LIMIT) left = LEFT_LIMIT;

        attrs.position = { top: top, left: left };
      }

      return Backbone.Model.prototype.set.call(this, attrs, options);
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
        top: getRand(100, 400),
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

    // appendだと重なり順で自分が一番下になるのでprepend
    this.$el.prepend(avatarView.el);
  }
});

})();

jQuery.fn.headerNavi = function() {
  var $imgs = this;

  $imgs.setCurrent = function() {
    var url = location.href;
    if (url.match(/\/$/)) url += 'index.html';

    var $img = $imgs.filter(function() {
      return url.match($(this).parent().attr('href'));
    });

    $imgs.each(function() {
      var $img = $(this);
      $img.attr('src', $img.data('orig-src'));
      $img.data('selected', false);
    });
    $img.data('selected', true);
    $img.attr('src', $img.data('select-src'));
  };

  return $imgs.each(function() {
    var $img = $(this);

    var origSrc;
    var hoverSrc;
    var selectSrc;

    var src = $img.attr('src');

    if (src.match(/_n\.png$/)) {
      origSrc = $img.attr('src');
      hoverSrc = origSrc.replace(/_n/,'_r');
      selectSrc = origSrc.replace(/_n/,'_a');
      (new Image()).src = selectSrc;
    }
    else {
      selectSrc = $img.attr('src');
      origSrc = selectSrc.replace(/_a/,'_n');
      hoverSrc = selectSrc.replace(/_a/,'_r');
      $img.data('selected', true);
      (new Image()).src = origSrc;
    }

    (new Image()).src = hoverSrc;

    // save
    $img.data('orig-src', origSrc);
    $img.data('hover-src', hoverSrc);
    $img.data('select-src', selectSrc);

    $img.on('mouseover', function() {
      if (!$img.data('selected')) {
        $img.attr('src', $img.data('hover-src'));
      }
    });

    $img.on('mouseout', function() {
      if (!$img.data('selected')) {
        $img.attr('src', $img.data('orig-src'));
      }
    });

    $img.on('click', function() {
      $imgs.setCurrent();
    });
  });
};

$(function() {
  // ヘッダ画像のロールオーバー
  $imgs = $('.mod-pageHeader nav img');
  $imgs.headerNavi();

  // ページ遷移の設定
  $.LazyJaxDavis(function(router) {
    var $content = $('.mod-pageBody-main');

    router.bind('everyfetchstart', function(page) {
      window.scrollTo(0, 0);
      $content.css('opacity', 0.6);
    });

    router.bind('everyfetchsuccess', function(page) {
      var newcontent = page.rip('content');
      var $newcontent = $('<div>').append(newcontent).hide();
      $content.css('opacity', 1).empty().append($newcontent); 
      $imgs.setCurrent();
      $newcontent.slideDown(500, function() {
        page.trigger('pageready');
      });
    });
  });

  // アバター画像の設定
  Nodefest.Model.Avatar.images = [
    './assets/img/mod-avatar/boy01.gif',
    './assets/img/mod-avatar/boy02.gif',
    './assets/img/mod-avatar/boy03.gif',
    './assets/img/mod-avatar/boy04.gif',
    './assets/img/mod-avatar/boy05.gif',
    './assets/img/mod-avatar/boy02.gif',
    './assets/img/mod-avatar/girl01.gif',
    './assets/img/mod-avatar/girl02.gif',
    './assets/img/mod-avatar/girl03.gif',
    './assets/img/mod-avatar/girl04.gif',
    './assets/img/mod-avatar/girl05.gif',
    './assets/img/mod-avatar/sp.gif'
  ];

  var avatars = new Nodefest.Collection.Avatars();

  var avatarsField = new Nodefest.View.AvatarsField({
    collection: avatars,
    el: '#avatarField'
  });

  avatars.createMe();
  avatars.sync();
});
