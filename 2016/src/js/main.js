const main = location.pathname.split('/2016')[1];

const scripts = {
  '/':           require('./index'),
  '/index.html':  require('./index'),
  '/venues.html': require('./index'),
  // 'coc.html':   require('./coc')
};

console.info(main, scripts[main]);
(scripts[main] || function() {})();
