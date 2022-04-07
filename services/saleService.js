const SaleModel = require('../models/saleModel');

const allSerialize = (sale) => ({
            saleId: sale.id,
            date: sale.date,
            productId: sale.product_id,
            quantity: sale.quantity,
        });

const getAll = async () => {
    const sales = await SaleModel.getAll();
    const newSales = sales.map(allSerialize);

    return newSales;
};

const serialize = (sale) => ({
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
});

const getById = async (id) => {
    const founded = await SaleModel.getById(id);
    
    if (!founded) return founded;

    const newSale = founded.map(serialize);

    return newSale;
};

const destroy = async (id) => {
    const wasDeleted = await SaleModel.destroy(id);

    if (!wasDeleted) return false;
    
    return wasDeleted; 
};

const create = async (sales) => {
    const created = await SaleModel.create(sales);
    
    return created; 
};

module.exports = {
    getAll,
    getById,
    allSerialize,
    serialize,
    destroy,
    create,
};