const SaleModel = require('../models/saleModel');

const serialize = (sale) => ({
            saleId: sale.id,
            date: sale.date,
            productId: sale.product_id,
            quantity: sale.quantity,
        });

const getAll = async () => {
    const sales = await SaleModel.getAll();
    const newSales = sales.map(serialize);

    return newSales;
};

const getById = async (id) => {
    const founded = await SaleModel.getById(id);
    
    if (!founded) return founded;

    const newSale = founded.map((sale) => ({
        date: sale.date,
        productId: sale.product_id,
        quantity: sale.quantity,
    }));

    return newSale;
};

module.exports = {
    getAll,
    getById,
};