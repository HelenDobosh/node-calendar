setTimeout(() => console.log('timeout 1'));
setTimeout(() => {
  console.log('timeout 2');
  Promise.resolve().then(() => console.log('promise resolve'));
});
setTimeout(() => console.log('timeout 3'));
setTimeout(() => console.log('timeout 4'));
