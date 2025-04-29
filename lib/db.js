const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

async function openDB() {
  return open({
    filename: path.join(__dirname, '../data/data.db'),
    driver: sqlite3.Database
  });
}

const dbPromise = openDB();

async function run(sql, params) {
  const db = await dbPromise;
  return db.run(sql, params);
}

async function get(sql, params) {
  const db = await dbPromise;
  return db.get(sql, params);
}

async function all(sql, params) {
  const db = await dbPromise;
  return db.all(sql, params);
}

module.exports = { run, get, all };
