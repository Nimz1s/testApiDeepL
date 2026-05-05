document.addEventListener('DOMContentLoaded', () => {
    loadDecks();
});

//////////////////////////
// 🔥 ЗАВАНТАЖЕННЯ З БД
//////////////////////////



async function loadDecks() {
    const res = await fetch('/getDecks');
    const decks = await res.json();

    renderDecks(decks);
}

function renderDecks(decks){
    const container = document.getElementById('decks');
    container.innerHTML = ""; // очистка

    decks.forEach(deck => {
        createDeckElement(deck);
    });
}

//////////////////////////
// 🔥 СТВОРЕННЯ 1 DECK
//////////////////////////

function createDeckElement(deck){
    const container = document.getElementById('decks');

    const menu = document.createElement('div');
    menu.classList.add('decksDiv');

    const btn = document.createElement('button');
    btn.textContent = deck.name; // ✅ правильно
    btn.classList.add('deckButton');
    btn.id = `deckInfo-${deck.id}`; // ✅ ID з БД

    btn.addEventListener('click', () => {
        openModalInfo(deck); // 👈 передаємо весь об'єкт
    });

    menu.appendChild(btn);
    container.appendChild(menu);
}

//////////////////////////
// 🔥 МОДАЛКА ІНФО
//////////////////////////

function openModalInfo(deck){
    const modal = document.getElementById('modal-deck-info');
    modal.classList.remove('hidden');

    // заповнюємо дані
    const title = document.getElementById('deck-name');
    title.textContent = deck.name;

    const container = document.getElementById('deck-info-window');
    container.innerHTML = "";

    const info = document.createElement('p');
    info.textContent = `Deck ID: ${deck.id}`;

    const btn = document.createElement('button');
    btn.textContent = "Open";
    btn.classList.add('newDeckButton');

    btn.addEventListener('click', () => {
        window.location.href = `/deck/${deck.id}`;
    });

    container.appendChild(info);
    container.appendChild(btn);
}

// закриття модалки
document.getElementById('modal-deck-info').addEventListener('click', (e) => {
    if (e.target.id === 'modal-deck-info') {
        e.currentTarget.classList.add('hidden');
    }
});

//////////////////////////
// 🔥 МОДАЛКА СТВОРЕННЯ
//////////////////////////

const modalCreate = document.getElementById('modal-create-deck');
const openBtn = document.getElementById('addMenu');

openBtn.addEventListener('click', () => {
    modalCreate.classList.remove('hidden');
});

function closeModalWindow() {
    modalCreate.classList.add('hidden');
}

modalCreate.addEventListener('click', (e) => {
    if (e.target === modalCreate) {
        modalCreate.classList.add('hidden');
    }
});



//////////////////////
const container = document.getElementById('modal-deck-settings');
const btn = document.getElementById('open-modal-settings');
const closeBtn = document.getElementById('close-modal-settings');
btn.addEventListener('click', () => {
        container.classList.remove('hidden');
    });
closeBtn.addEventListener('click', () => {
        container.classList.add('hidden');
    });
//////////////////////

//////////////////////////
// 🔥 СТВОРЕННЯ DECK
//////////////////////////

const inputNewDeck = document.getElementById('newDeckText');
const btnPostNewDeck = document.getElementById('sentNewDeck');

inputNewDeck.addEventListener('input', () => {
    btnPostNewDeck.disabled = inputNewDeck.value.trim().length === 0;
});

btnPostNewDeck.addEventListener('click', async () => {

    const newDeckName = inputNewDeck.value;

    const res = await fetch("/addNewDeck", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            newDeckName
        })
    });

    const data = await res.json();

    if(data.ok === true){
        closeModalWindow();
        inputNewDeck.value = "";

        await loadDecks(); // 🔥 ВАЖЛИВО — перезавантаження з БД
    }
});