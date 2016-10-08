/**
 * npmにあるのはjQueryべったりの古いやつなので、コピペで。
 * そして各モジュールで個別に呼んでもグローバルに吐き出すおてんば娘なので、
 * ここでPolyfill的に使う・・。
 *
 */
require('./vendor/velocity');

// 幅狭い画面で動くやつ
require('./module/navigation')();


var main = location.pathname.split('/2016')[1];
var scripts = {
  '/':              require('./page/index'),
  '/index.html':    require('./page/index'),
  '/venues.html':   require('./page/venues'),
  '/speakers.html': require('./page/speakers')
};

(scripts[main] || function() {})();
