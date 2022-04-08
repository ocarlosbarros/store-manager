const saleRouter = require('express').Router();
const SaleController = require('../controllers/saleController');

saleRouter.get('/', SaleController.getAll);
saleRouter.post('/', SaleController.create);
saleRouter.get('/:id', SaleController.getById);
saleRouter.delete('/:id', SaleController.destroy);
saleRouter.put('/:id', SaleController.update);

module.exports = saleRouter;