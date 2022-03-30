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


module.exports = {
    getAll,
}