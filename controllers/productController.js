const ProductService = require('../services/productService');


const getAll = async (_request, response, next) => {
    try {

        const products = await ProductService.getAll();
        return response.status(200).json(products);

    } catch (error) {
        next(error);
    }

  
};

const getById = async (request, response, next) => {
    const { id } = request.params;

    try {
        const product = await ProductModel.getById(id);
        return response.status(200).json(product);
    } catch (error) {
        next(error);
    }

  
};


module.exports = {
    getAll,
    getById,
}