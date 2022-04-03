const SaleModel = require('../models/saleModel');

const getAll = async () => {
    const sales = await SaleModel.getAll();
    return sales;
}

const getById = async (id) => {
    const founded = await SaleModel.getById(id);
    return founded;
}

module.exports = {
    getAll,
    getById,
}