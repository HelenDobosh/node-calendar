const args = process.argv.slice(2);

const config = {
  PORT: process.env.PORT,
  ENV: undefined
};

args.forEach(item => {
  const delimiter = item.indexOf('=');
  if(delimiter) {
    config.ENV = item.substring(delimiter+1, item.length)
  }
});

module.exports = { config };
