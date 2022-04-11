const SaleSchema = require('../schemas/saleSchema');

const validate = (request, response, next) => {
  const [product] = request.body;
  const { code, message } = SaleSchema.validate(product.productId, product.quantity);
  
  if (message) return response.status(code).json({ message });

  next();
};

module.exports = {
  validate,
};