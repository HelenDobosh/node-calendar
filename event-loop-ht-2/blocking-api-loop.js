const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello, World'));
app.get('/block', (req, res) => {

  let date = Date.now();
  let end = Date.now() + 10000;
  while (date < end) {
    date = Date.now()
  }
  res.send('I am done with block!');
});

app.get('/non-block', (req, res) => {
  setTimeout(() => res.send('I am done without block!'), 5000);
});

app.listen(3200, () => console.log('app listening on port 3200'));
