const http = require('http');

const app = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hey');
});

const port = 3001;
app.listen(port);
console.log('Yeah');