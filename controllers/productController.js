const ProductService = require('../services/productService');
const ProductModel = require('../models/productModel');

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
        const product = await ProductService.getById(id);

        if (!product) return response.status(404).json({ message: 'Product not found' });

        return response.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

const destroy = async (request, response, next) => {
    const { id } = request.params;

    try {
        const wasDeleted = await ProductService.destroy(id);

        if (!wasDeleted) return response.status(404).json({ message: 'Product not found' });
        
        return response.status(204).end();
    } catch (error) {
        next(error);
    }
};

const create = async (request, response, next) => {
    const product = request.body;

    try {
        const created = await ProductService.create(product);

        if (!created) return response.status(409).json({ message: 'Product already exists' });

        return response.status(201).json(created);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getById,
    destroy,
    create,
};