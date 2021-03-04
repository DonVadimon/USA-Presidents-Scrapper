const http = require('http');
const fs = require('fs');
const scrapper = require('./scrapper');

const hostname = '127.0.0.1';
const port = 3000;

const getPresidents = async () => {
  const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
  const data = await scrapper(url);
  return data;
};

const routerPaths = [
  {
    url: '/scrapper',
    handler: getPresidents,
  },
];

const server = http.createServer((req, res) => {
  let { url } = req;
  if (url === '/') url = '/index.html';
  const fileExtension = url.split('.').pop();
  let route;
  switch (fileExtension) {
    case 'html':
      url = `./public${url}`;
      fs.readFile(url, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      });
      break;
    case 'css':
      url = `./public${url}`;
      fs.readFile(url, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/css' });
          res.end(data);
        }
      });
      break;
    case 'js':
      url = `./server${url}`;
      fs.readFile(url, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/javascript' });
          res.end(data);
        }
      });
      break;
    default:
      route = routerPaths.find((e) => e.url === url);
      if (route) {
        route.handler().then((presidents) => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(presidents));
          res.end();
        });
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      }
      break;
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
