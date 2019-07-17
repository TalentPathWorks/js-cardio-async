const http = require(`http`);

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
    response.end(JSON.stringify(status));
  }
  
})
server.listen(5000,()=>console.log("Server listening on port 5000"))