const ProductModel = require('../models/productModel');

const getAll = async () => {
    const products = await ProductModel.getAll();
    return products;
};

const getById = async (id) => {
    const founded = await ProductModel.getById(id);
    
    return founded; 
};

const destroy = async (id) => {
    const wasDeleted = await ProductModel.destroy(id);
    
    return wasDeleted; 
};

const create = async (product) => {
    const { name } = product;

    const productExists = await ProductModel.getByName(name);

    if (productExists) return false;

    const created = await ProductModel.create(product);
    
    return created; 
};

const update = async (product) => {
    const { id } = product;
    
    const founded = await ProductModel.getById(id);
    
    if (!founded) return false;
    
    const updated = await ProductModel.update(product);

    return updated;
  };

module.exports = {
    getAll,
    getById,
    destroy,
    create,
    update,
};