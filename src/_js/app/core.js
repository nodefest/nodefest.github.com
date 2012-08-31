(function() {

var Nodefest = window.Nodefest = {
  Model: {},
  Collection: {},
  View: {}
};

Nodefest.socket = io.connect('http://localhost:8080');

})();
