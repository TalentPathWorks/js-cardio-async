const fs = require('fs').promises;
const db = require('./db.js');

/**
 * A test controller
 * @returns {response} A stringified JSON
 */
exports.getHome = (request, response) => {
  const status = {
    up: true,
    owner: 'Roberto Sanchez',
    timestamp: Date.now(),
  };
  response.writeHead(200, {
    'Content-type': 'application/json',
    'Another-Header': 'more Things',
  });
  return response.end(JSON.stringify(status));
};

/**
 * Resets the database
 * Recreates scott.json ,andrew.json, post.json, and clears the log.txt files
 * @returns {response} A simple message informing user that the database has been reset
 */
exports.reset = (request, response) => {
  db.reset();
  response.writeHead(200, {
    'Content-type': 'text/html',
  });
  return response.end('Database has been reset.');
};
/**
 * Gets a value from a file
 * @param {query,response} query containing a filename and key value
 * @returns {value} Returns the value of that key
 */
exports.getKeyValue = ({ file, key }, response) => {
  if (!file || !key) {
    response.writeHead(400);
    return response.end('An error has occurred, Missing values.');
  }
  return db.get(file, key)
    .then((keyValue) => {
      response.writeHead(200, {
        'Content-type': 'text/html',
      });
      response.end(keyValue);
    })
    .catch((err) => {
      console.error(err);
      response.end(`An error has occurred, ${err}`);
    });
};
/**
 * Sets a value to a key in a file
 * @param {query, response} query containing a filename, key, and value
 * @returns {response} Whether it succeeded or not
 */
exports.set = ({ file, key, value }, response) => {
  if (!file || !key || !value) {
    response.writeHead(400);
    return response.end('An error has occurred, Missing values');
  }
  return db.set(file, key, value)
    .then(() => {
      response.end('Success! Value has been updated for that key.');
    })
    .catch((err) => {
      console.error(err);
      response.writeHead(400, {
        'Content-Type': 'text/html',
      });
      response.end(`An error has occurred, ${err}.`);
    });
};
/**
 * Removes a key from the file
 * @param {query, response} query contains a filename and a key
 * @returns {string} If it succeeded or not
 */
exports.remove = ({ file, key }, response) => {
  if (!file || !key) {
    response.writeHead(400);
    return response.end('An error has occurred, Missing values');
  }
  return db.remove(file, key)
    .then(() => {
      response.end('Success! Key has been removed.');
    })
    .catch((err) => {
      console.error(err);
      response.writeHead(400, {
        'Content-type': 'text/html',
      });
      response.end(`An error has occurred, ${err}`);
    });
};
/**
 * Deletes a file from the diretory
 * @param {filename, response}
 * @returns {String} Success or Failure
 */
exports.deletefile = ({ file }, response) => {
  if (!file) {
    response.writeHead(400);
    return response.end('An error has occurred, Missing values');
  }
  return db.deleteFile(file)
    .then(() => {
      response.end('Success! File has been deleted.');
    })
    .catch((err) => {
      console.error(err);
      response.writeHead(400, {
        'Content-type': 'text/html',
      });
      response.end(`An error has occurred, ${err}`);
    });
};
/**
 * Creates an empty file
 * @param {string,response} filename
 * @returns {response} Success or Failure
 */
exports.createfile = ({ filename }, response) => db.createFile(filename)
  .then(() => {
    response.end('Success! File has been created.');
  })
  .catch((err) => {
    console.error(err);
    response.writeHead(400, {
      'Content-type': 'text/html',
    });
    response.end(`An error has occurred, ${err}`);
  });
/**
 * Creates a file with data passed from client
 * @param {string, request, response}
 * @returns {string} Success or Failure
 */
exports.postWrite = (pathname, request, response) => {
  const data = [];
  request.on('data', (chunk) => {
    data.push(chunk);
  });
  request.on('end', async () => {
    const body = JSON.parse(data);
    // If there isn't a filename in the url
    if (pathname.split('/')[2] === '') {
      response.writeHead(400);
      return response.end('An error has occurred, Missing filename in url.');
    }
    const filename = pathname.split('/')[2];
    console.log('body', body);
    return db.createFile(filename, body)
      .then(() => {
        response.writeHead(201, {
          'Content-Type': 'text/html',
        });
        return response.end('Success: File has been created');
      })
      .catch((err) => {
        console.error(err);
        response.writeHead(400, {
          'Content-type': 'text/html',
        });
        response.end(`An error has occurred while creating file. ${err} `);
      });
  });
};
/**
 * Retrieve a file and sends back the data
 */
exports.getFile = (pathname, request, response) => {
  db.getFile(pathname.split('/')[2])
    .then((data) => {
      console.log(data);
      response.writeHead(201, {
        'Content-Type': 'application/json',
      });
      response.end(data);
    })
    .catch((err) => {
      console.error(err);
      response.writeHead(400, {
        'Content-type': 'text/html',
      });
      response.end(`An error has occurred while retrieving file. ${err}`);
    });
};

exports.mergeAllFiles = (request, response) => db.mergeData()
  .then(() => {
    response.writeHead(201, {
      'Content-Type': 'text/html',
    });
    response.end('Success! All data has been written to mergeData.json');
  })
  .catch(err => response.end(`An error has occurred ${err}`));

exports.union = (request, response, { file1, file2 }) => {
  console.log(`This is file1 ${file1} and file2 ${file2}`);
  return db.union(file1, file2)
    .then(() => {
      response.writeHead(201, {
        'Content-Type': 'text/html',
      });
      response.end('Success! Nothing has been done.');
    })
    .catch((err) => {
      response.end(`An error has occurred ${err}`);
    });
};

exports.intersect = (request, response, { file1, file2 }) => {
  console.log(`This is file1 ${file1} and file2 ${file2}`);
  return db.intersect(file1, file2)
    .then(() => {
      response.writeHead(201, {
        'Content-Type': 'text/html',
      });
      response.end('Success! Nothing has been done.');
    })
    .catch((err) => {
      response.end(`An error has occurred ${err}`);
    });
};

exports.difference = (request, response, { file1, file2 }) => {
  console.log(`This is file1 ${file1} and file2 ${file2}`);
  return db.difference(file1, file2)
    .then(() => {
      response.writeHead(201, {
        'Content-Type': 'text/html',
      });
      response.end('Success! Nothing has been done.');
    })
    .catch((err) => {
      response.end(`An error has occurred ${err}`);
    });
};
/**
 * 404 Error Message
 * @returns {response} Returns html of a 404 page
 */
exports.notFound = async (request, response) => {
  const html = await fs.readFile('404.html');

  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.end(html);
};
