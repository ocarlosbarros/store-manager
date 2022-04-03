const SaleModel = require('../models/saleModel');

const getAll = async () => {
    const sales = await SaleModel.getAll();
    return sales;
}

module.exports = {
    getAll,
}