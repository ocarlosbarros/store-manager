const saleRouter = require('express').Router();
const SaleController = require('../controllers/saleController');

saleRouter.get('/', SaleController.getAll);

module.exports = saleRouter;