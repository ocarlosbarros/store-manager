const saleRouter = require('express').Router();
const SaleController = require('../controllers/saleController');

saleRouter.get('/', SaleController.getAll);
saleRouter.get('/:id', SaleController.getById);

module.exports = saleRouter;