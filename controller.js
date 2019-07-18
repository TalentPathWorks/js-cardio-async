const db = require('./db.js');
exports.getHome = (request,response) => {
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
exports.reset = () => {
  return db.reset()
}
exports.get = (query,response)=>{
  return db.get(query.file,query.key)
    .then(
       response.end("ALL COMPLETED WELL")
    )
    .catch(
       response.end("ERROR")
    )
}
exports.set = (query,response) => {
return db.set(query.file,query.key,query.value)
    .then(
      response.end("ALL COMPLETED WELL")
    )
    .catch(
      response.end("ERROR")
    )
}
exports.remove = (query,response) => {
  return db.remove(query.file,query.key)
  .then(
    response.end("ALL COMPLETED WELL")
  )
  .catch(
    response.end("ERROR")
  )
}
exports.deletefile = (query,response) => {
  return db.deleteFile(query.file,query.key)
  .then(
    response.end("ALL COMPLETED WELL")
  )
  .catch(
    response.end("ERROR")
  )
}
exports.createfile = (query,response) =>{
  return db.createFile(query.filename)
  .then(
    response.end('File Created')
  )
}