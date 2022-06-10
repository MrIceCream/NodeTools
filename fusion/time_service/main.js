var http = require('http');
const { time } = require('console');

http.createServer(function (request, response) {

   response.writeHead(200, {'Content-Type': 'text/plain'});

   var data = {"status":200, "responseTimestamp": Math.floor(Date.now() / 1000)}
   
   console.log(data);
   response.end(JSON.stringify(data));

}).listen(80);