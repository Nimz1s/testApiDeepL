//   window.testLog = async function () {
//     await fetch("/log", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             message: "button pressed"
//         })
//     });
//   }


const btn = document.getElementById("btnTranslate");

btn.addEventListener("click", async () => {
    const text = document.getElementById("sourceText").value;
    const sourceLang = document.getElementById("sourceLang").value;
    const targetLang = document.getElementById("targetLang").value;


    const res = await fetch("/translate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            text,
            sourceLang,
            targetLang
         })
    });

    const data = await res.json();
    
    addToDeckOrCreate();

    document.getElementById("translatedText").innerText = data.translated;
});


function addToDeckOrCreate(){
    // const buttonAddToDeck = document.getElementById('modal-create-deck');
    const AddToDeck = document.getElementById('elem-add-to-deck');
    AddToDeck.classList.remove('hidden');
    // const closeBtn = document.getElementById('closeModal');

    console.log("test");

    // btn.addEventListener('click', () => { // відкрити
        
    // });

    // function closeModalWindow() { // закрити
    //     modal.classList.add('hidden');
    // }

    // modal.addEventListener('click', (e) => { // закриття по кліку на фон
    //     if (e.target === modal) {
    //         modal.classList.add('hidden');
    //     }
    // });
}