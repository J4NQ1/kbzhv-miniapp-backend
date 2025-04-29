const db = require('../lib/db');
module.exports = async (req, res) => {
    const { method } = req;
    const { userId, firstName, lastName, height, weight, calorieGoal, stepGoal } = req.body;

    if (method === 'POST') {
        await db.run(`INSERT OR REPLACE INTO users (userId, firstName, lastName, height, weight, calorieGoal, stepGoal)
                      VALUES (?, ?, ?, ?, ?, ?, ?)`,
                      [userId, firstName, lastName, height, weight, calorieGoal, stepGoal]);
        return res.status(200).json({ message: 'User saved' });
    }

    if (method === 'GET') {
        const user = await db.get(`SELECT * FROM users WHERE userId = ?`, [req.query.userId]);
        return res.status(200).json(user);
    }

    res.status(405).end();
};
