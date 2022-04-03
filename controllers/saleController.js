const SaleService = require('../services/saleService');

const getAll = async (_request, response, next) =>  {
    try {
        const sales = await SaleService.getAll();
        return response.status(200).json(sales);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAll,
}