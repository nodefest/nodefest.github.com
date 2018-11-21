var hashChange = require('../vendor/hashChange');

hashChange.addListener(function (hash) {
    var parts = /^[\/|#]?(([^-]+)(-(.+))?)/.exec(hash);})