const http = require('http');
const { config } = require('./config');
const { logger } = require('./logger');

const {PORT, ENV} = config;

http.createServer((req, res) => {
  console.log('New incoming request');
  res.writeHeader(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({message: 'Hello world'} ));
}).listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log(`Current environment is ${ENV}`);
});
