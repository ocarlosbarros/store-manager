const productRouter = require('express').Router();
const ProductController = require('../controllers/productController');
const ProductValidation = require('../middleware/productValidation');

productRouter.get('/', ProductController.getAll);
productRouter.post('/', ProductValidation.validate, ProductController.create);
productRouter.get('/:id', ProductController.getById);
productRouter.delete('/:id', ProductController.destroy);
productRouter.put('/:id', ProductController.update);

module.exports = productRouter;