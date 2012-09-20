(function() {

var Nodefest = window.Nodefest = {
  Model: {},
  Collection: {},
  View: {}
};

if (window.io) {
  Nodefest.socket = io.connect('http://' + window.socketHost + '/');
}
else {
  Nodefest.socket = {
    on: function() {},
    emit: function() {}
  };
}

})();
