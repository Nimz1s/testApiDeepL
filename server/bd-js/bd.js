const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(
    path.join(__dirname, '../../database.db'),
    (err) => {
        if (err) console.error(err);
        else console.log("Connected to SQLite");
    }
);

// INIT
function initDB() {
    db.run(`
        CREATE TABLE IF NOT EXISTS decks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT
        )
    `);
}

// ADD
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

// GET ALL (ВАЖЛИВО!)
function getDecks() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM decks`, [], (err, rows) => {

            console.log("DB ROWS:", rows); // 👈 ТУТ МАЄ БУТИ МАСИВ

            if (err) return reject(err);
            resolve(rows);
        });
    });
}

module.exports = {
    initDB,
    addDeck,
    getDecks
};