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
  // multipart upload
  let parts = parse(this, {
    autoFields: true,
    checkField: function(name, value) {
      if (name === '_csrf' && !checkCSRF(ctx, value)) {
        var err = new Error('invalid csrf token')
        err.status = 400
        return err
      }
    },
    // only allow upload `.jpg` files
    checkFile: function(fieldname, file, filename) {
      if (path.extname(filename) !== '.jpg' && path.extname(filename) !== '.jpeg') {
        var err = new Error('invalid jpeg image')
        err.status = 400
        return err
      }
    }
  });
  let part;
  // .field holds all the fields in key/value form
  console.log(parts.field._csrf);

  let response = [];

  try {
    while (part = yield parts) {
      let fileName = `${Date.now()}_${Math.floor(Math.random()*1000000)}.jpg`;
      let writePath = path.join(rootPath, 'src_server', 'uploads', fileName);
      if (part.length) { // fields
        console.log('fields: %s', part);
      } else { // stream
        let stream = fs.createWriteStream(writePath);
        part.pipe(stream);
        console.log('uploading: %s -> %s', part.filename, stream.path);
        response.push(path.basename(stream.path));
      }
    }
    this.status = 200;
    this.body = response;
  } catch (exception) {
    console.log(exception);
    this.status = 500;
  }
});


app.listen(3000);
console.log('listening on port 3000');
