// var express = require('express');
// var router = express.Router();

import { Product } from '../models/models';
import { wrap } from './routeUtils';

// /* GET home page. */
// router.get('/products', async function(_req, res) {
//   res.send(await Product.find());
// });

// module.exports = router;

const ProductRouter = (server) => {
  server.get('/products', wrap(async function(_req, res) {
    res.send(await Product.find());
  }));  
  server.get('/product/:productId', wrap(async function(req, res) {
    res.send(await Product.findById(req.params.productId));
  }));  
}

export default ProductRouter;