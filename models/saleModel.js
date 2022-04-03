const connection = require('./connection');

const getAll = async () => {
    const [sales] = await connection.execute(
    `
    SELECT S.id, S.date, SP.product_id, SP.quantity
        FROM StoreManager.sales as S
        INNER JOIN StoreManager.sales_products AS SP ON SP.sale_id = S.id
        ORDER BY S.id, SP.product_id;
    `
    );

    return sales;
}

module.exports = {
    getAll,
}