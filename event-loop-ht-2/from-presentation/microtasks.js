setTimeout(() => console.log('T'), 0);

process.nextTick(() => console.log('next tick1'));

global.queueMicrotask(() => console.log('queue microtask'));

process.nextTick(() => console.log('next tick2'));

Promise.resolve().then(() => console.log('next promise'));

console.log('simple log');

