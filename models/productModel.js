const connection = require('./connection');

const getAll = async () => {
const [products] = await connection.execute(
    `
    SELECT  *
        FROM StoreManager.products
        ORDER BY id;
    `,
);

return products;
};

const getById = async (id) => {
    const [result] = await connection.execute(
        `
        SELECT *
            FROM StoreManager.products
                WHERE id = ?;
        `,
        [id],
        );

    if (result.length === 0) return false;

    const founded = result.map((product) => product)[0]; 
    
    return founded;
};

const destroy = async (id) => {
    const [{ affectedRows: wasDeleted }] = await connection.execute(
        `
            DELETE FROM StoreManager.products
                WHERE id = ?;
        `,
        [id],
    );
    
    return wasDeleted;
};

const create = async ({ name, quantity }) => {
    const [{ insertId }] = await connection.execute(
    `
    INSERT INTO StoreManage.products(name, quantity)
        VALUES (?, ?);
    `,
    [name, quantity],
    );

    return {
        id: insertId,
        name,
        quantity,
    };
};

module.exports = {
    getAll,
    getById,
    destroy,
    create,
};