var logger = require('koa-logger');
var serve = require('koa-static');
var parse = require('co-busboy');
var koa = require('koa');
var fs = require('fs');
var app = koa();
var os = require('os');
var path = require('path');
var rootPath = path.join(__dirname, '..');
console.log(rootPath);

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
  if ('POST' != this.method) return yield next;

  if (!this.request.is('multipart/*')) return yield next;
  console.log('multipart upload');
  // multipart upload
  var parts = parse(this);
  var part;

  try {
    while (part = yield parts) {
      var tempFileName = `${Date.now()}_${Math.floor(Math.random()*1000000)}.jpg`;
      if (part.length) { // fields
        console.log(part);
      }
      else { // stream
        var stream = fs.createWriteStream(path.join(rootPath, 'src_server', 'uploads', tempFileName));
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
