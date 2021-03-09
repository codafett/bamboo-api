var restify = require('restify');
var socketio = require('socket.io')(80);
const { default: configureDb } = require('./src/db/db');
const { default: createLogger } = require('./src/utils/logger/Logger');

const logger = createLogger('server');

var server = restify.createServer();
var io = socketio.listen(server.server);

// Set up db
configureDb();

const corsMiddleware = require('restify-cors-middleware');
const { default: ProductRouter } = require('./src/routes/ProductRouter');
 
const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: [/^https?:\/\/localhost(:[\d]+)?$/],
  allowHeaders: ['API-Token'],
  exposeHeaders: ['API-Token-Expiry', 'Access-Control-Allow-Origin'],
});

server.pre(cors.preflight);
server.use(cors.actual);

server.use(restify.plugins.queryParser({
  mapParams: true
 }));
 server.use(restify.plugins.bodyParser({
 mapParams: true
  }));
 server.use(restify.plugins.acceptParser(server.acceptable));

ProductRouter(server)

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

server.listen(3000, function() {
  logger.log('%s listening at %s', server.name, server.url);
});