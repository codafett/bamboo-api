var express = require('express');
var router = express.Router();

import { Product } from '../models/models';

/* GET home page. */
router.get('/products', async function(_req, res) {
  res.send(await Product.find());
});

module.exports = router;
