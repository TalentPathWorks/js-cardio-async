const http = require(`http`);
const url = require('url');
const {getHome, set, get, remove, deletefile, createfile,reset} = require('./controller.js')

const server = http.createServer();

server.on('request',(request,response)=>{
  if(request.url === '/' && request.method === 'GET'){
    return getHome(request,response)
  }
  const parsedUrl = url.parse(request.url, true);
  const query = parsedUrl.query;
  
  if(parsedUrl.pathname === '/reset' && request.method === 'GET'){
    reset();
    return response.end("Files reset")
  }
  if(parsedUrl.pathname === '/get' && request.method === 'POST'){
    return get(query,response)
  }
  if(parsedUrl.pathname === '/set' && request.method === 'PATCH'){
    return set(query,response);
  }
  if(parsedUrl.pathname === '/remove' && request.method === 'DELETE'){
   return remove(query,response)
  }
  if(parsedUrl.pathname === '/deletefile' && request.method === 'DELETE'){
    return deletefile(query,response)
  }
  if(parsedUrl.pathname === '/createfile' && request.method === 'POST'){
    return createfile(query,response)
  }
  server.end();
})
server.listen(5000,()=>console.log("Server listening on port 5000"))