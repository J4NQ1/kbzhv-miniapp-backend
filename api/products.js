const db = require('../lib/db');
module.exports = async (req, res) => {
    const { method } = req;
    
    if (method === 'POST') {
        const { name, calories, proteins, fats, carbs } = req.body;
        await db.run(`INSERT INTO products (name, calories, proteins, fats, carbs)
                      VALUES (?, ?, ?, ?, ?)`,
                      [name, calories, proteins, fats, carbs]);
        return res.status(200).json({ message: 'Product added' });
    }

    if (method === 'GET') {
        const { search } = req.query;
        let products;
        if (search) {
            products = await db.all(`SELECT * FROM products WHERE name LIKE ?`, [`%${search}%`]);
        } else {
            products = await db.all(`SELECT * FROM products`);
        }
        return res.status(200).json(products);
    }

    res.status(405).end();
};
