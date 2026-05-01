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

    document.getElementById("translatedText").innerText = data.translated;
});