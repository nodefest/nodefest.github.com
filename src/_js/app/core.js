(function() {

var Nodefest = window.Nodefest = {
  Model: {},
  Collection: {},
  View: {}
};

if (window.io) {
  Nodefest.socket = io.connect('http://49.212.31.180:9000/');
}
else {
  Nodefest.socket = {
    on: function() {},
    emit: function() {}
  };
}

})();
