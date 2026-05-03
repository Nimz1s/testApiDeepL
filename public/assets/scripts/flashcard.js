let menuId = 1; // унікальний ID для кожного меню

function updateUserDecks(nameForDeck){
    const container = document.getElementById('decks');

    const currentId = menuId++; // зберігаємо ID цього меню

    // створюємо блок меню
    const menu = document.createElement('div');
    menu.classList.add('decksDiv')

    // текст
    // const title = document.createElement('p');
    // title.textContent = `Меню ${currentId}`;

    // кнопка всередині меню
    const btn = document.createElement('button');
    btn.textContent = `${nameForDeck} ${currentId}`;
    btn.classList.add('deckButton')

    // 🔥 головне — кожна кнопка має свій ID
    btn.addEventListener('click', async() => {
        const btnId = currentId;

        const res = await fetch("/learningCardFromId", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                btnId
            })
        });

        const data = await res.json();
    }); 

    // додаємо все в меню
    // menu.appendChild(title);
    menu.appendChild(btn);

    // додаємо меню на сторінку
    container.appendChild(menu);
}
// addMenu
// document.getElementById('openModal').addEventListener('click', () => {
    
// });








const modal = document.getElementById('modal');
const openBtn = document.getElementById('addMenu');
const closeBtn = document.getElementById('closeModal');

// відкрити
openBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

// закрити
function closeModalWindow() {
    modal.classList.add('hidden');
}


// закриття по кліку на фон
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});


const inputNewDeck = document.getElementById('newDeckText');
const btnPostNewDeck = document.getElementById('sentNewDeck');

inputNewDeck.addEventListener('input', () => {
    if (inputNewDeck.value.trim().length > 0) {
        btnPostNewDeck.disabled = false;
    } else {
        btnPostNewDeck.disabled = true;
    }
});


btnPostNewDeck.addEventListener('click', async() => {

    const newDeckName = inputNewDeck.value;

    const res = await fetch("/addNewDeck", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            newDeckName: newDeckName
        })
    });

    const data = await res.json();

    console.log(data);

    if(data.ok === true){
        closeModalWindow();
        updateUserDecks(newDeckName)
        inputNewDeck.value = "";
    }

});

