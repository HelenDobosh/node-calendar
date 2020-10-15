const http = require('http');

function blockServer(time) {
  let date = Date.now();
  const end = Date.now() + time;
  while (date < end) {
    console.log('Server is blocked');
    date = Date.now();
  }
}

http.createServer((req, res) => {
  console.log('New incoming request');
  res.writeHeader(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({message: 'Hello world!'}));
  blockServer(1000000);
}).listen(3200, () => {
  console.log('Listening on port 3200');
});
