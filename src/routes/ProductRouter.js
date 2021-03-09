import { Product } from '../models/models';
import { wrap } from './routeUtils';

const ProductRouter = (server) => {
  server.get('/products', wrap(async function(_req, res) {
    res.send(await Product.find());
  }));  
  server.get('/products/:productId', wrap(async function(req, res) {
    res.send(await Product.findById(req.params.productId));
  }));
  server.put('/products', wrap(async function(req, res) {
    const newProduct = await Product.create({
      name: req.body.name,
      price: req.body.price,
    });
    res.send(newProduct);
  }));  
  server.put('/products/:productId/comment', wrap(async function(req, res) {
    const product = await Product.findById(req.params.productId);
    if (product) {
      product.comments.push({
        comment: req.body.comment,
        username: 'user1',
      });
      await product.save();
    }
    res.send(product.comments[product.comments.length - 1]);
  }));  
}

export default ProductRouter;