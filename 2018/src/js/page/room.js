var hashChange = require('../vendor/hashChange');

module.exports = function() {
hashChange.addListener(function (hash) {
    var parts = /^[\/|#]?(([^-]+)(-(.+))?)/.exec(hash);})
};