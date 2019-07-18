const http = require(`http`);
const url = require('url');
const db = require('./db.js')
const server = http.createServer();

server.on('request',(request,response)=>{
  if(request.url === '/' && request.method === 'GET'){
    const status = {
      up: true,
      owner: 'Roberto Sanchez',
      timestamp: Date.now()
    };
    response.writeHead(200,{
      'Content-type': 'application/json',
      'Another-Header': 'more Things',
    })
    return response.end(JSON.stringify(status));
  }
  const parsedUrl = url.parse(request.url, true);
  if(parsedUrl.pathname === '/get' && request.method === 'POST'){
    return db.get(parsedUrl.query.file,parsedUrl.query.key)
    .then(
      response.end("ALL COMPLETED WELL")
    )
    .catch(
      response.end("ERROR")
    )
    
  }
  if(parsedUrl.pathname === '/set' && request.method === 'PATCH'){
    return db.set(parsedUrl.query.file,parsedUrl.query.key,parsedUrl.query.value)
    .then(
      response.end("ALL COMPLETED WELL")
    )
    .catch(
      response.end("ERROR")
    )
  }
  if(parsedUrl.pathname === '/remove' && request.method === 'DELETE'){
    return db.remove(parsedUrl.query.file,parsedUrl.query.key)
    .then(
      response.end("ALL COMPLETED WELL")
    )
    .catch(
      response.end("ERROR")
    )
  }
  if(parsedUrl.pathname === '/deletefile' && request.method === 'DELETE'){
    return db.deleteFile(parsedUrl.query.file,parsedUrl.query.key)
    .then(
      response.end("ALL COMPLETED WELL")
    )
    .catch(
      response.end("ERROR")
    )
  }
  if(parsedUrl.pathname === '/createfile' && request.method === 'POST'){
    response.end("CREATE FILE")
  }
  
})
server.listen(5000,()=>console.log("Server listening on port 5000"))