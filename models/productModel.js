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
    const [result] = await connection.execute(
        `
        SELECT *
            FROM StoreManager.products
                WHERE id = ?;
        `,
        [id]
        );

    if(result.length === 0) return false;

    const product = result.map(product => product)[0]; 
    
    return product;
}


module.exports = {
    getAll,
    getById,
}