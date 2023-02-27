const https = require('https');
const sass = require('node-sass');
const fs = require('fs');
const moment = require('moment');
const express = require('express');
const app = express();
const PORT = 3000;
const ejs = require('ejs');
const {google} = require('googleapis');
require('dotenv').config();

app.use(express.urlencoded({extended: true }));
app.use(express.json());

/* sassを表示始行 */
sass.render({
  file: __dirname + '/src/sass/app.scss',
  outputStyle: 'compressed',
  outFile: __dirname + '/public/css/app.css'
},
(err, result) => {
  if (err) throw err;
  fs.writeFile(__dirname + '/public/css/app.css', result.css, (err) => {
    if(err) throw err;
    console.log('Sassがコンパイルできたよ');
  });
});
/* sassを表示終行 */

/* ビューファイル使用可能始行 */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views/pages/');
/* ビューファイル使用可能終行 */

/* 静的ファイルを使用可能にしている */
app.use(express.static('public'));
app.locals.ROOT_PATH = `https://localhost:${PORT}`;

/* SSL認証（httpsを使えるようにするためらしい） */
const options = {
  key: fs.readFileSync(__dirname + '/key.pem'),
  cert: fs.readFileSync(__dirname + '/cert.pem')
}

/* サーバー起動確認 */
const server = https.createServer(options, app);
server.listen(PORT, () => {
  console.log('起動したよ');
  console.log(`Server started on port 3000 at ${moment().format('YYYY/MM/DD/HH:mm:ss')}`);
});