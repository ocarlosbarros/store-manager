const ProductModel = require('../models/productModel');

const addQuantity = async (items) => {
  await Promise.all(items.map(async (item) => {
    const { name, quantity } = await ProductModel.getById(item.product_id);
    if (name) {
      const operation = quantity + item.quantity;
      await ProductModel.update({ id: item.product_id, name, quantity: operation });
    }
  }));
};

module.exports = {
  addQuantity,
};