(function() {

var Nodefest = window.Nodefest = {
  Model: {},
  Collection: {},
  View: {}
};

if (window.io) {
  Nodefest.socket = io.connect('http://210.152.156.43:80/');
}
else {
  Nodefest.socket = {
    on: function() {},
    emit: function() {}
  };
}

})();
