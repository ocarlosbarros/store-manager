const ProductModel = require('../models/productModel');


const getAll = async (_request, response, next) => {
    try {

        const products = await ProductModel.getAll();
        return response.status(200).json(products);

    } catch (error) {

        next(error);
    }

  
};

const getById = async (request, response) => {
    const { id } = request.params;
    const product = await ProductModel.getById(id);
  
    return response.status(200).json(product);
};


module.exports = {
    getAll,
    getById,
}