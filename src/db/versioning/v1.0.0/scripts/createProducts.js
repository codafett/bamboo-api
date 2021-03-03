import { Product } from '../../../../models/models';

export default async function createProducts() {
  const productArray = new Array(100).fill();
  await productArray.reduce(async (promise, _, index) => {
    await promise;
    const dbProduct = new Product({
      name: `product ${index}`,
      price:  Math.floor(Math.random() * 100).toFixed(2).toString(),
    });
    return dbProduct.save();
  }, Promise.resolve())
}
