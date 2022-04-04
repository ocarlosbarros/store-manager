const SaleService = require('../services/saleService');

const getAll = async (_request, response, next) =>  {
    try {
        const sales = await SaleService.getAll();
        return response.status(200).json(sales);

    } catch (error) {
        next(error);
    }
}

const getById = async (request, response, next) => {
    const { id } = request.params;
    try {
        const founded = await SaleService.getById(id);
        
        if(!founded) return response.status(404).json({ message: 'Sale not found'});

        return response.status(200).json(founded);
        
    } catch (error) {
        next(error);
    }

}

module.exports = {
    getAll,
    getById,
}