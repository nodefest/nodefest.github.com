'use strict';
const connect     = require('connect');
const serveStatic = require('serve-static');

const app = connect();
const port = process.env.PORT || 3000;

app.use(serveStatic(__dirname));
app.listen(port);
console.log('Server running port %d', port);
