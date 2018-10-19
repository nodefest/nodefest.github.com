var hashChange = require('../vendor/hashChange');

module.exports = function() {
  var overlays = require('../module/speaker-overlay')();
  hashChange.addListener(function (hash) {
    var id = /^[\/|#]?(.*)/.exec(hash)[1]
    overlays.showOverlay(id, '!');
  })
};
