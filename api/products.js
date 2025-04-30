const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '../data/products.json');

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'GET') {
    const { search } = req.query;
    let products = [];
    if (fs.existsSync(dataFilePath)) {
      const raw = fs.readFileSync(dataFilePath);
      products = JSON.parse(raw);
    }
    if (search) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return res.status(200).json(products);
  }

  if (req.method === 'POST') {
    const { name, calories, proteins, fats, carbs } = req.body;
    let products = [];
    if (fs.existsSync(dataFilePath)) {
      products = JSON.parse(fs.readFileSync(dataFilePath));
    }
    products.push({ name, calories, proteins, fats, carbs });
    fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2));
    return res.status(201).json({ message: 'Продукт додано' });
  }

  res.status(405).end();
};
