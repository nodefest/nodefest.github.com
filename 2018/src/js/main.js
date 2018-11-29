/**
 * npmにあるのはjQueryべったりの古いやつなので、コピペで。
 * そして各モジュールで個別に呼んでもグローバルに吐き出すおてんば娘なので、
 * ここでPolyfill的に使う・・。
 *
 */
require('es6-promise').polyfill(); // for IE!!!
require('./vendor/velocity');

// 幅狭い画面で動くやつ
require('./module/navigation')();
// するするスクロール
require('./vendor/hashChange').initElements();
document.addEventListener('DOMContentLoaded', function () {
  new (require('./vendor/sscroll'))();
});


var main = location.pathname.split('/2018')[1].toLowerCase();
var scripts = {
  '/':              require('./page/index'),
  '/index.html':    require('./page/index'),
  '/venues.html':   require('./page/venues'),
  '/speakers.html': require('./page/speakers'),
  '/schedule.html': require('./page/schedule'),
  '/room.html': require('./page/room'),
};

(scripts[main] || function() {})({});
