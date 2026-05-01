require("dotenv").config();
const express = require("express"); //дозволяє отримувати запити з браузера
const path = require("path"); //для робіт з лінукс і віндовс(конвертує \ в /)

const app = express(); //створює сервер

app.use(express.json());  // перетворює JSON в JS обєкт
app.use(express.static(path.join(__dirname, "../public"))); // ці файли будуть доступні для браузера

app.post("/log", (req, res) => { //?апі ендпоінт \\ /log адреса
    const { message } = req.body; // отримує дані з запиту

    console.log("Log from frontend: ", message);

    res.json({ok: tsrue}); //відправка відповіді в браузер
});

///////////////////////////////
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

app.listen(5000, () => {
    console.log("Server running on port 5000");
});