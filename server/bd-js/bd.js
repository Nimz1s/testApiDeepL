// db.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error("DB error:", err.message);
    } else {
        console.log("Connected to SQLite");
    }
});

// функція для створення таблиці
function initDB() {
    db.run(`
        CREATE TABLE IF NOT EXISTS decks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT
        )
    `);
}

// функція додавання
function addDeck(name) {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO decks (name) VALUES (?)`,
            [name],
            function (err) {
                if (err) return reject(err);
                resolve(this.lastID);
            }
        );
    });
}

// отримати всі
function getDecks() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM decks`, [], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

// отримати по ID
function getDeckById(id) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM decks WHERE id = ?`, [id], (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
    });
}

// експортуємо все
module.exports = {
    initDB,
    addDeck,
    getDecks,
    getDeckById
};