const saleRouter = require('express').Router();
const SaleController = require('../controllers/saleController');
const SaleValidation = require('../middleware/saleValidation');

saleRouter.get('/', SaleController.getAll);
saleRouter.post('/', SaleValidation.validate, SaleController.create);
saleRouter.get('/:id', SaleController.getById);
saleRouter.delete('/:id', SaleController.destroy);
saleRouter.put('/:id', SaleValidation.validate, SaleController.update);

module.exports = saleRouter;