var connect = require('connect');

var port = process.env.PORT || 3000;
connect(
  connect.basicAuth('node', 'fest2011'),
  connect.static(__dirname)
).listen(port);

console.log('Server running port %d', port);
