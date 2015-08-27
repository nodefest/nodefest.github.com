(function(global) {
  'use strict';

  global.NF = global.NF || {};

  /**
   * 本当は各コンポーネントに閉じ込めたいが、
   * 複数のコンポーネントを協調させるためには外に出す方が楽。
   *
   * ロード時にhashがある -> tab.selected & page.selectedが変わる
   * tab:click -> tab.selectedが変わる + hashchange -> page.selectedが変わる
   *
   * あとは応じてページタイトルが変わる
   *
   */
  var TabPageController = function() {
    this.tabs  = document.querySelector('#js-nf-tabs');
    this.pages = document.querySelector('#js-nf-pages');
    // なんだこれ
    this.pageContainer = this.pages.parentNode.parentNode;
    this.title = document.title;
    // aタグからデータを生成
    this.data  = {
      // hash: { idx, title }
    };

    [].slice.call(this.tabs.querySelectorAll('a')).forEach(function(el, idx) {
      this.data[el.hash] = {
        idx: idx,
        title: el.textContent
      };
    }, this);

    global.addEventListener('hashchange', this, false);
    if (location.hash.length) { this.handleEvent(); }
  };
  TabPageController.prototype = {
    constructor: TabPageController,
    handleEvent: function() {
      var data = this._getPageData();
      this._switchPage(data);
      this._switchTitle(data);
      this._rhinoControl(data);
      // 念のためトップへ
      this.pageContainer.scrollTop = 0;
    },
    _switchPage: function(data) {
      this.pages.selected = this.tabs.selected = data.idx;
    },
    _switchTitle: function(data) {
      // トップは変えない
      if (data.idx !== 0) {
        document.title = data.title + ' | ' + this.title;
      } else {
        document.title = this.title;
      }
    },
    _rhinoControl: function(data) {
      // トップは動かす
      if (data.idx === 0) {
        global.NF.paintoon.play();
      } else {
        global.NF.paintoon.pause();
      }
    },
    _getPageData: function() {
      // 存在しないハッシュはabout: 0と見なす
      return this.data[location.hash] || { idx: 0 };
    }
  };

  global.NF.TPC = TabPageController;

})(window);
