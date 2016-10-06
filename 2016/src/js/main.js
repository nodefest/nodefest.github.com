var main = location.pathname.split('/2016')[1];

var scripts = {
  '/':              require('./page/index'),
  '/index.html':    require('./page/index'),
  '/venues.html':   require('./page/venues'),
  '/speakers.html': require('./page/speakers')
};

(scripts[main] || function() {})();
require('./module/navigation')();
