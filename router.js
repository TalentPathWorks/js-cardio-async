const url = require('url');
const {getHome, set, get, remove, deletefile, createfile,reset, notFound,postWrite, getFile, mergeAllFiles} = require('./controller.js');


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
    return get(query,response);
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
  if(pathname.startsWith('/write')&& request.method === 'POST'){
    return postWrite(pathname,request,response);
  }
  if(pathname.startsWith('/get') && request.method === 'GET'){
    return getFile(pathname,request,response);
  }
  if(pathname === '/mergealldata' && request.method === 'GET'){
    return mergeAllFiles(request,response);
  }
  notFound(request,response)
}
