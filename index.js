var restify = require('restify');
const { default: configureDb } = require('./src/db/db');
const { Product } = require('./src/models/models');
const { default: createLogger } = require('./src/utils/logger/Logger');

const logger = createLogger('server');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer();

// Set up db
configureDb();

const corsMiddleware = require('restify-cors-middleware');
const { default: ProductRouter } = require('./src/routes/ProductRouter');
 
const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: [/^https?:\/\/localhost(:[\d]+)?$/],
  allowHeaders: ['API-Token'],
  exposeHeaders: ['API-Token-Expiry']
});
 
server.pre(cors.preflight);
server.use(cors.actual);

ProductRouter(server)

server.listen(3000, function() {
  logger.log('%s listening at %s', server.name, server.url);
});