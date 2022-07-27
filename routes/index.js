const routes = require('express').Router();
const ProductRouter = require('./productRouter');
const SaleRouter = require('./saleRouter');

routes.get('/', (_request, response) => {
    return response.send('Welcome Store Manager API!');
});

routes.use('/products', ProductRouter);
routes.use('/sales', SaleRouter);

module.exports = routes;