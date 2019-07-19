const http = require('http');
const { routeHandler } = require('./router.js');

const server = http.createServer();
const PORT = 5000;

server.on('request', routeHandler);

server.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
