var main = location.pathname.split('/2016')[1];

var scripts = {
  '/':              require('./index'),
  '/index.html':    require('./index'),
  '/venues.html':   require('./venues'),
  '/speakers.html': require('./speakers')
};

(scripts[main] || function() {})();
require('./_navigation')();
