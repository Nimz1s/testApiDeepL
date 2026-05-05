// db.js
const Database = require('better-sqlite3');

// створення бази
const db = new Database('./database.db');

console.log("Connected to SQLite");

// ініціалізація таблиць
function initDB() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS decks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT
        )
    `);
}

// додати deck
function addDeck(name) {
    const stmt = db.prepare(`INSERT INTO decks (name) VALUES (?)`);
    const result = stmt.run(name);

    return result.lastInsertRowid; // ID нового запису
}

// отримати всі decks
function getDecks() {
    const stmt = db.prepare(`SELECT * FROM decks`);
    return stmt.all();
}

// отримати по ID
function getDeckById(id) {
    const stmt = db.prepare(`SELECT * FROM decks WHERE id = ?`);
    return stmt.get(id);
}

// експортуємо
module.exports = {
    initDB,
    addDeck,
    getDecks,
    getDeckById
};