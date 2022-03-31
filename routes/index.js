const routes = require('express').Router();
const ProductRouter = require('./productRouter');

routes.use('/products', ProductRouter);


module.exports = routes;