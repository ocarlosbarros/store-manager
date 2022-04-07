const productRouter = require('express').Router();
const ProductController = require('../controllers/productController');

productRouter.get('/', ProductController.getAll);
productRouter.get('/:id', ProductController.getById);
productRouter.delete('/:id', ProductController.destroy);

module.exports = productRouter;