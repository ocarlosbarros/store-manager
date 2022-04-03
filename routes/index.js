const routes = require('express').Router();
const ProductRouter = require('./productRouter');
const SaleRouter = require('./saleRouter');
routes.use('/products', ProductRouter);
routes.use('/sales', SaleRouter);


module.exports = routes;