const http = require('http');
const cluster = require('cluster');

if (cluster.isMaster) {
  createCluster();
} else {
  createServer();
}

function createCluster() {
  const requestsCount = {};

  const workersCount = 6;

  createWorkers(workersCount, requestsCount);

  console.log(`Master ${process.pid} is running`);

  process.on('SIGINT', () => {
    console.log('\n');
    Object.entries(requestsCount).forEach(([pid, requestCount]) =>
      console.log(`Worker with pid ${pid} handled ${requestCount} requests.`)
    );
    process.exit();
  });

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} killed`);
  });
}

function createServer() {
  http.createServer((req, res) => {
    process.send({type: 'request'});
    res.writeHeader(200, {'Content-Type': 'application/json'});
    res.end(`Worker ${process.pid} handled request`);
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}

function createWorkers(workersCount, requestsCount) {
  for (let i = 0; i < workersCount; i++) {
    const worker = cluster.fork();
    requestsCount[worker.process.pid] = 0;
    worker.on('message', (message) => {
      if(message.type === 'request') {
        requestsCount[worker.process.pid] += 1;
      }
    })
  }
}
