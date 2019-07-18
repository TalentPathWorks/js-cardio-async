const db = require('./db.js');
const fs = require('fs').promises;
/**
 * 404 Error Message
 * @returns {response} Returns html of a 404 page
 */
exports.notFound = async (request,response)=>{
  const html = await fs.readFile('404.html')

  response.writeHead(404,{'Content-Type': 'text/html'});
  response.end(html);
}
/**
 * A test controller
 * @returns {response} A stringified JSON
 */
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
/**
 * Resets the database 
 * Recreates scott.json ,andrew.json, post.json, and clears the log.txt files
 * @returns {response} A simple message informing user that the database has been reset
 */
exports.reset = (request,response) => {
  db.reset()
  response.writeHead(200,{
    'Content-type': 'text/html'
  })
  return response.end(`Database has been reset.`)
}
/**
 * Gets a value from a file
 * @param {query,response} query containing a filename and key value
 * @returns {value} Returns the value of that key
 */
exports.get = (query,response)=>{
  if(!query.file|| !query.key){
    response.writeHead(400);
    return response.end(`An error has occured, Missing values.`);
  }
  return db.get(query.file,query.key)
    .then((keyValue)=>{
      response.writeHead(200,{
        'Content-type': 'text/html'
      })
      response.end(keyValue)
    })
    .catch(err =>{
      console.error(err);
      response.end(`An error has occured, ${err}`)
    })
}
/**
 * Sets a value to a key in a file
 * @param {query, response} query containing a filename, key, and value
 * @returns {response} Whether it succeeded or not
 */
exports.set = (query,response) => {
  if(!query.file|| !query.key|| !query.value){
    response.writeHead(400);
    return response.end(`An error has occured, Missing values`);
  }
  return db.set(query.file,query.key,query.value)
    .then(()=>{
      response.end("Success! Value has been updated for that key.")
    })
    .catch(err =>{
      console.error(err);
      response.writeHead(400,{
        'Content-Type': 'text/html',
      })
      response.end(`An error has occured, ${err}.`)
    })
}
/**
 * Removes a key from the file
 * @param {query, response} query contains a filename and a key
 * @returns {string} If it succeeded or not
 */
exports.remove = (query,response) => {
  if(!query.file|| !query.key){
    response.writeHead(400);
    return response.end(`An error has occured, Missing values`);
  }
  return db.remove(query.file,query.key)
  .then(()=>{
    response.end(`Success! Key has been removed.`);
  })
  .catch(err =>{
    console.error(err);
    response.end(`An error has occured, ${err}`);
  })
}
/**
 * 
 */
exports.deletefile = (query,response) => {
  return db.deleteFile(query.file,query.key)
  .then(()=>{
    response.end(`Success! File has been deleted.`);
  })
  .catch(err =>{
    console.error(err);
    response.end(`An error has occured, ${err}`);
  })
}
/**
 * 
 */
exports.createfile = (query,response) =>{
  return db.createFile(query.filename)
  .then(()=>{
    response.end('File Created')
  })
  .catch(err =>{
    console.error(err);
    response.end("ERROR")
  })
}
/**
 * 
 */
exports.postWrite = (pathname,request,response) => {
  const data = [];
  request.on('data',chunk=>{
    data.push(chunk);
  });
  request.on('end',async ()=>{
    const body = JSON.parse(data)
    return await db.createFile(pathname.split('/')[2],body)
    .then(()=>{
      response.writeHead(201,{
        'Content-Type': 'text/html'
      });
      return response.end(`Success: File has been created`)
    })
    .catch(err=>{
      console.error(err);
      response.end(`An error has occured while creating file. ${err} `)
    })
  });
}
/**
 * 
 */
exports.getFile = (pathname, request, response) =>{
  return db.getFile(pathname.split('/')[2])
    .then((data)=>{
      console.log(data);
      response.writeHead(201,{
        'Content-Type': 'application/json'
      });
      response.end(data)
    })
    .catch(err =>{
      console.error(err);
      response.end(`An error has occured while retrieving file. ${err}`)
    })
}