const ProductSchema = require('../schemas/productSchema');

const validate = (request, response, next) => {
  const { name, quantity } = request.body;

  const { code, message } = ProductSchema.validate(name, quantity);

  if (message) return response.status(code).json({ message });
  return next();
};

module.exports = {
  validate,
};