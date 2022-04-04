const ProductModel = require('../models/productModel');

const getAll = async () => {
    const products = await ProductModel.getAll();
    return products;
};

const getById = async (id) => {
    const founded = await ProductModel.getById(id);
    
    return founded; 
};

module.exports = {
    getAll,
    getById,
};