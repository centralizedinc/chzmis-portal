var app = require('../app')
var http = require('http')

var server = http.createServer(app);

server.listen('8000')
server.on('listening', onListening)

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;

    console.log('on Listening :', bind);
}