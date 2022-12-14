const SaleService = require('../services/saleService');
const { errors, statusCode } = require('../schemas/globalSchema');

const getAll = async (_request, response, next) => {
    try {
        const sales = await SaleService.getAll();
        return response.status(200).json(sales);
    } catch (error) {
        next(error);
    }
};

const getById = async (request, response, next) => {
    const { id } = request.params;
    try {
        const founded = await SaleService.getById(id);
        
        if (!founded) return response.status(404).json({ message: 'Sale not found' });
        
        return response.status(200).json(founded);
    } catch (error) {
        next(error);
    }
};

const destroy = async (request, response, next) => {
    const { id } = request.params;

    try {
        const wasDeleted = await SaleService.destroy(id);

        if (!wasDeleted) return response.status(404).json({ message: 'Sale not found' });
        
        return response.status(204).end();
    } catch (error) {
        next(error);
    }
};

const create = async (request, response, next) => {
    const sales = request.body;

    const isValid = await SaleService.validate(sales);

    if (!isValid) {
        return response.status(statusCode.UNPROCESSABLE_ENTITY)
      .json({ message: errors.AMOUNT_NOT_PERMITTED }); 
    } 

    try {
        const created = await SaleService.create(sales);
        
        return response.status(201).json(created);
    } catch (error) {
        next(error);
    }
};

const update = async (request, response, next) => {
    const { id } = request.params;
    const sales = request.body;
    
    try {
      const updated = await SaleService.update(id, sales);

      if (!updated) return response.status(404).json({ message: 'Sale not found' });

      return response.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  };

module.exports = {
    getAll,
    getById,
    destroy,
    create,
    update,
};