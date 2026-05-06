require("dotenv").config();
const express = require("express"); //дозволяє отримувати запити з браузера
const path = require("path"); //для робіт з лінукс і віндовс(конвертує \ в /)


const app = express(); //створює сервер
app.use(express.json());  // перетворює JSON в JS обєкт
app.use(express.static(path.join(__dirname, "../public"))); // ці файли будуть доступні для браузера

const db = require('./bd-js/bd'); // імпорт дб


const routes = require('./routes/pages');
app.use('/', routes); // підключаєш роутер


// ініціалізація таблиці
db.initDB();

const DEEPL_KEY = process.env.DEEPL_KEY; 

app.post("/translate", async (req, res) => {
    const { text, sourceLang, targetLang } = req.body;

    try {
        const body = new URLSearchParams({
            text: text,
            target_lang: targetLang
        });

        // якщо мову вказали — додаємо
        if (sourceLang) {
            body.append("source_lang", sourceLang);
        }

        const response = await fetch("https://api-free.deepl.com/v2/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `DeepL-Auth-Key ${DEEPL_KEY}`
            },
            body
        });

        const data = await response.json();

        res.json({
            translated: data.translations[0].text
        });

    } catch (err) {
        res.json({ error: err.message });
    }
});


app.post("/learningCardFromId", (req, res) => {
    const { btnId } = req.body;

    console.log("btn ids ", btnId);

    res.json({idFromBG: btnId});
});


app.post("/addNewDeck", async (req, res) => {
    try {
        const { newDeckName } = req.body;

        const name = await db.addDeck(newDeckName);

        res.json({ ok: true, name });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/getDecks', async (req, res) => {
    try {
        const decks = await db.getDecks();  

        res.json(decks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/deleteDeck', async (req, res) => {
    try {
        const { id } = req.body;

        const result = await db.deleteDeck(id);

        res.json({
            success: result > 0,
            deleted: result
        });

        console.log("Deletet rows: ", result, "ID(", id, ")");

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/deck/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/pages/deck.html'));
});


app.listen(5000, () => {
    console.log("Server running on port 5000");
});