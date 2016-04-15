'use strict';

const fs = require('fs');
const path = require('path');
// const os = require('os');
const koa = require('koa');
const serve = require('koa-static');
const logger = require('koa-logger');
const parse = require('co-busboy');

const rootPath = path.join(__dirname, '..');
const app = koa();
// logging
//app.use(logger());

// redirect to homepage
app.use(function*(next) {
  yield next;
  if (this.body || !this.idempotent) return;
  console.log('error this:', this);
  //this.redirect(path.join('/src/'));
});

// serve static files
app.use(serve(rootPath));

// handle uploads
app.use(function*(next) {
  // ignore non-POSTs
  if (this.method !== 'POST' && !this.request.is('multipart/*')) return yield next;
  console.log('multipart upload');
  // multipart upload
  var parts = parse(this), part;

  try {
    while (part = yield parts) {
      let fileName = `${Date.now()}_${Math.floor(Math.random()*1000000)}.jpg`;
      let writePath = path.join(rootPath, 'src_server', 'uploads', fileName);
      if (part.length) { // fields
        console.log(part);
      } else { // stream
        let stream = fs.createWriteStream(writePath);
        part.pipe(stream);
        console.log('uploading %s -> %s', part.filename, stream.path);
      }
    }
    this.status = 200;
  } catch (exception) {
    console.log(exception);
    this.status = 500;
  }
});


app.listen(3000);
console.log('listening on port 3000');
