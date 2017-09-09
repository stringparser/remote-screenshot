
const rm = require('rimraf');
const express = require('express');
const webpack = require('webpack');
const base64Img = require('base64-img');
const bodyParser = require('body-parser');
const webpackDevMiddleWare = require('webpack-dev-middleware');

const app = express();
const port = 3000;

/**
 * clean up
**/
rm.sync('./public');
rm.sync('./uploads');

/**
 * build stuff
 */
const config = require('../webpack.config');
const compiler = webpack(config);
const devMiddleware = webpackDevMiddleWare(compiler, {
  stats: { colors: true },
  publicPath: '/'
});

app.use(devMiddleware);

// parse images sent from the browser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/remote', function (req, res) {
  res.setHeader('Content-Type', 'text/html');

  res.send(`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>remote screenshot</title>
      </head>
      <body>
        <div style="color: white; background: black">
          Hello yellow marshmellow ${req.url}
        </div>
      </body>
    </html>
  `);
});

// save the image somewhere
app.post('/image', function (req, res, next) {
  base64Img.img(req.body.img, 'uploads', 'test', function (writeError) {
    if (writeError) {
      next(writeError);
    } else {
      res.send('ok');
    }
  });
});

// start the server
app.listen(port, function () {
  console.log('express server listening on port %s', port);
});
