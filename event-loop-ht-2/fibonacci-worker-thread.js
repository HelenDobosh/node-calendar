const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads');


function fibonacci(n) {
  let fib = [0, 1];
  for(let i = fib.length; i <= n; i++) {
    fib[i] = fib[i-2] + fib[i-1];
  }
  return {input: n, res: fib[n]};
}

if (isMainThread) {
  const element = process.argv.slice(2);

  const worker = new Worker(__filename, { workerData: { value: element}});

  worker.on('error', (err) => { throw err; });
  worker.on('exit', () => {
    console.log('Thread exiting');
  });
  worker.on('message', (msg) => {
    console.log(msg);
  });

} else {
  const result = fibonacci(workerData.value);
  parentPort.postMessage(`Fibonacci(${result.input}) = ${result.res}`);
}
