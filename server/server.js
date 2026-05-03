require("dotenv").config();
const express = require("express"); //дозволяє отримувати запити з браузера
const path = require("path"); //для робіт з лінукс і віндовс(конвертує \ в /)


const app = express(); //створює сервер
const routes = require('./routes/pages');

app.use(express.json());  // перетворює JSON в JS обєкт
app.use(express.static(path.join(__dirname, "../public"))); // ці файли будуть доступні для браузера

// app.post("/link", (req, res) => { //?апі ендпоінт \\ /log адреса
//     const { currentId } = req.body; // отримує дані з запиту

//     console.log("Log from frontend: ", currentId);

//     res.json({ok: true}); //відправка відповіді в браузер
// });



///////////////////////////////

app.use('/', routes); // підключаєш роутер

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

    res.json({ok: true});
});


app.post("/addNewDeck", (req, res) => {
    const { newDeckName } = req.body;

    console.log("name ", newDeckName);

    res.json({ok: true});
});


app.listen(5000, () => {
    console.log("Server running on port 5000");
});