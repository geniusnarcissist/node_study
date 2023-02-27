const fs = require('fs');
const app = require(__dirname + '/app');
const ROOT_PATH = require(__dirname + '/app').locals.ROOT_PATH;

app.get('/', (req, res) => {
  res.render(__dirname + '/src/views/pages/index', {
    ROOT_PATH: ROOT_PATH,
    total: '9000000',
    card: 'VISAクレジット',
    payee: 'AMAZON',
    amountPaid: '50000'
  });
});