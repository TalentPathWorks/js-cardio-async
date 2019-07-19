const url = require('url');
const {getHome, set, getKeyValue, remove, deletefile, createfile,reset, notFound,postWrite, getFile, mergeAllFiles,union,intersect,difference} = require('./controller.js');

/**
 * Handles the routes incoming
 */
exports.routeHandler = (request,response) => {
  const {pathname, query} = url.parse(request.url, true);

  if(pathname === '/' && request.method === 'GET'){
    return getHome(request,response);
  }
  if(pathname === '/reset' && request.method === 'GET'){
    reset(request,response);
    return response.end("Files reset");
  }
  if(pathname === '/getvalue' && request.method === 'POST'){
    return getKeyValue(query,response);
  }
  if(pathname === '/set' && request.method === 'PATCH'){
    return set(query,response);
  }
  if(pathname === '/remove' && request.method === 'DELETE'){
   return remove(query,response);
  }
  if(pathname === '/deletefile' && request.method === 'DELETE'){
    return deletefile(query,response);
  }
  if(pathname === '/createfile' && request.method === 'POST'){
    return createfile(query,response);
  }
  if(pathname === '/mergealldata' && request.method === 'GET'){
    return mergeAllFiles(request,response);
  }
  if(pathname === '/union' && request.method === 'POST'){
    return union(request,response,query)
  }
  if(pathname === '/intersect' && request.method === 'POST'){
    return intersect(request,response,query)
  }
  if(pathname === '/difference' && request.method === 'POST'){
    return difference(request,response,query)
  }
  //-----------------------------------------------------------
  if(pathname.startsWith('/write')&& request.method === 'POST'){
    return postWrite(pathname,request,response);
  }
  if(pathname.startsWith('/get') && request.method === 'GET'){
    return getFile(pathname,request,response);
  }
  notFound(request,response)
}
