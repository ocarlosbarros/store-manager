const connection = require('./connection');

const getAll = async () => {
    const [sales] = await connection.execute(
    `
    SELECT S.id, S.date, SP.product_id, SP.quantity
        FROM StoreManager.sales as S
        INNER JOIN StoreManager.sales_products AS SP ON SP.sale_id = S.id
        ORDER BY S.id, SP.product_id;
    `,
    );

    return sales;
};

const getById = async (id) => {
    const [sales] = await connection.execute(
    `
    SELECT S.id, S.date, SP.product_id, SP.quantity
        FROM StoreManager.sales as S
        INNER JOIN StoreManager.sales_products AS SP ON SP.sale_id = S.id
            WHERE S.id = ? ORDER BY S.id, SP.product_id;
    `,
    [id],
);

    if (sales.length === 0) return false;

    return sales;
};

const destroy = async (id) => {
    const [{ affectedRows: wasDeleted }] = await connection.execute(
    `
    DELETE FROM StoreManager.sales
        WHERE id = ?;
    `,
    [id],
    );

    return wasDeleted;
};

const create = async (sales) => {
    const [{ insertId }] = await connection.query(
    `
    INSERT INTO StoreManager.sales(date)
    VALUES (now());
    `,
);
    if (!insertId) throw new Error('Failed to create sales');

    await Promise.all(sales.map(async (sale) => {
        const { productId, quantity } = sale;
        
        await connection.execute(
        `
        INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) 
            VALUES  (?, ?, ?); 
        `,
        [insertId, productId, quantity],
        );
    }));
    
    return { id: insertId, itemsSold: [...sales] };
};

module.exports = {
    getAll,
    getById,
    destroy,
    create,
};