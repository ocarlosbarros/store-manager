const saleRouter = require('express').Router();
const SaleController = require('../controllers/saleController');

saleRouter.get('/', SaleController.getAll);
saleRouter.get('/:id', SaleController.getById);
saleRouter.delete('/:id', SaleController.destroy);

module.exports = saleRouter;