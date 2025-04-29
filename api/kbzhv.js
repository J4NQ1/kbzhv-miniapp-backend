const db = require('../lib/db');
module.exports = async (req, res) => {
    const { method } = req;
    const { userId, calories, proteins, fats, carbs, date } = req.body;

    if (method === 'POST') {
        await db.run(`INSERT INTO kbzhv (userId, calories, proteins, fats, carbs, date)
                      VALUES (?, ?, ?, ?, ?, ?)`,
                      [userId, calories, proteins, fats, carbs, date]);
        return res.status(200).json({ message: 'KБЖВ entry added' });
    }

    if (method === 'GET') {
        const { userId, fromDate, toDate } = req.query;
        const kbzhv = await db.all(`SELECT * FROM kbzhv WHERE userId = ? AND date BETWEEN ? AND ?`,
                                   [userId, fromDate, toDate]);
        return res.status(200).json(kbzhv);
    }

    res.status(405).end();
};
