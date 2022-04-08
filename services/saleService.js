const SaleModel = require('../models/saleModel');
const InventoryControl = require('../helpers/inventoryControl');

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
    const itemsToDelete = await SaleModel.getById(id);

    if (itemsToDelete.length === 0) return false;

    const wasDeleted = await SaleModel.destroy(id);
        
    if (!wasDeleted) return wasDeleted; 

    await InventoryControl.addQuantity(itemsToDelete);
    
    return wasDeleted;
};

const create = async (sales) => {
    const created = await SaleModel.create(sales);
    
    if (created) {
        await InventoryControl.removeQuantity(created.itemsSold);
    }
    
    return created; 
};

const update = async (id, sales) => {
    await Promise.all(sales.map(async (sale) => {
        await SaleModel.update({ id, ...sale });
    }));
  
    return { saleId: id, itemUpdated: [...sales] };
  };

module.exports = {
    getAll,
    getById,
    allSerialize,
    serialize,
    destroy,
    create,
    update,
};