const http = require(`http`);
const {routeHandler} = require('./router.js');

const server = http.createServer();
const PORT = 5000;

server.on('request',(request,response)=>{
  routeHandler(request,response);
  server.end();
})

server.listen(PORT,() => console.log(`Now listening on port ${PORT}`));