const connection = require('./connection');

const getAll = async () => {

const [products] = await connection.execute(
    `
    SELECT  *
        FROM StoreManager.products
        ORDER BY id;
    `
);

return products;

}

const getById = async (id) => {
    const [product] = await connection.execute(
        `
        SELECT *
            FROM StoreManager.products
                WHERE id = ?;
        `,
        [id]
        );

    if(product.length === 0) return false;
    
    return product;
}


module.exports = {
    getAll,
    getById,
}