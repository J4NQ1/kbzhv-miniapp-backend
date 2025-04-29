const db = require('../lib/db');

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { method } = req;

  if (method === 'POST') {
    const { userId, calories, proteins, fats, carbs, date } = req.body;
    await db.run(
      `INSERT INTO kbzhv (userId, calories, proteins, fats, carbs, date)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, calories, proteins, fats, carbs, date]
    );
    return res.status(200).json({ message: 'KБЖВ entry added' });
  }

  if (method === 'GET') {
    const { userId, fromDate, toDate } = req.query;
    const rows = await db.all(
      `SELECT * FROM kbzhv WHERE userId = ? AND date BETWEEN ? AND ? ORDER BY date`,
      [userId, fromDate, toDate]
    );
    return res.status(200).json(rows);
  }

  res.status(405).end();
};
