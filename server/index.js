const next = require('next');
const express = require('express');
const helmet = require('helmet');


const app = express();
const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = nextApp.getRequestHandler();


app.use(helmet.contentSecurityPolicy({
  directives: {
    scriptSrc: ["'self'"],
  },
}));

app.get('*', (req, res) => {
  return handle(req, res);
})

nextApp.prepare().then(() => {
  app.listen(8080, (err) => {
    if (err) throw err;
    console.log('App is running on 8080');
  });
});