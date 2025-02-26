
const masterEL = document.querySelector(".master")
const GameOver = document.querySelector("h2")
const OrdsRunde = document.querySelector("p")

let ordbok = ["WHITE", "BRAVE", "CANDY", "DELTA", "PENIS", "FLAME", "GRAPE", "HASTE", "IVORY", "CRAWL",
    "KNOCK", "LEMON", "MANGO", "NOBLE", "OCEAN", "PRIDE", "QUILT", "RAVEN", "SPINE", "TOAST",
    "UMBRA", "MINER", "WHALE", "WHERE", "YIELD", "ZEBRA", "ADORE", "BEAST", "CHARM", "DRAIN",
    "WHITE", "FANCY", "GLOVE", "HEART", "INDEX", "JUMBO", "KNIFE", "LIGHT", "MIRTH", "NEXUS",
    "ORBIT", "PEARL", "QUACK", "RUSTY", "SAUCE", "TRICK", "URBAN", "VOWEL", "WITTY", "CARDS",
    "YOUTH", "ZESTY", "ANGRY", "BLAZE", "CRAFT", "SIXTH", "FROST", "GIANT", "LOSES",
    "INBOX", "JOINT", "SOUTH", "LATCH", "MIRTH", "NORTH", "OPERA", "PLUCK", "QUERY", "ROAST",
    "DANCE", "TIGER", "UNDER", "VIRUS", "WAIVE", "YACHT", "ZONAL", "AMBER", "BRISK",
    "CLIMB", "THINK", "FLOCK", "GRASP", "JUDGE", "IMAGE", "JUMPY", "STAND", "LUCKY",
    "MOTEL", "NOVEL", "OPTIC", "PIANO", "QUIRK", "RISKY", "SHINY", "TOUGH", "UNCLE", "MOTIV", "TRACE", "CARGO", "BLACK"]

let boksID = []
let antallBokser = 30

let RundensOrd = ""

let GjelendeBokstav = 0
let NyLinje = 0

let spillFerdig = false



function startSpill() {
    masterEL.innerHTML = ""
    GameOver.innerHTML = ""
    OrdsRunde.innerHTML = ""

    boksID = []
    GjelendeBokstav = 0
    NyLinje = 0
    spillFerdig = false

    document.activeElement.blur()

    let tidfeldigTall = Math.floor(Math.random() * ordbok.length)
    RundensOrd = ordbok[tidfeldigTall]

    for (let i = 0; i < antallBokser; i++) {
        const divEl = document.createElement("div")
        divEl.id = "boks" + i
        divEl.innerText = ""
        divEl.className = ""
        masterEL.appendChild(divEl)
        boksID.push(divEl)
    }
}




document.addEventListener("keydown", function (event) {
    if (spillFerdig) return

    let bokstav = event.key.toUpperCase()


    if (bokstav.match(/^[A-Z]$/) && GjelendeBokstav < NyLinje + 5) {
        boksID[GjelendeBokstav].innerText = bokstav
        GjelendeBokstav++
    }

    else if (event.key == "Backspace" && GjelendeBokstav > NyLinje) {
        GjelendeBokstav--
        boksID[GjelendeBokstav].innerText = ""
    }

    else if (event.key === "Enter" && GjelendeBokstav === NyLinje + 5) {
        sjekkOrd()
        NyLinje += 5
        GjelendeBokstav = NyLinje
    }

})


function sjekkOrd() {
    let RiktigBokstaver = RundensOrd.split("")
    let gjettetOrd = []


    for (let i = 0; i < 5; i++) {
        gjettetOrd.push(boksID[i + NyLinje].innerText)
    }

    let riktigAntall = 0

    for (let i = 0; i < 5; i++) {
        let boks = boksID[i + NyLinje]
        boks.classList.remove("riktig", "feilplassert", "feil")

        if (gjettetOrd[i] === RiktigBokstaver[i]) {
            boks.classList.add("riktig")
            riktigAntall++
        } else if (RiktigBokstaver.includes(gjettetOrd[i])) {
            boks.classList.add("feilplassert")
        } else {
            boks.classList.add("feil")
        }
    }
    if (NyLinje >= 25) {
        GameOver.innerHTML = "Game Over"
        GameOver.classList.add("taper")

        spillFerdig = true

        OrdsRunde.innerHTML = RundensOrd
        OrdsRunde.classList.add("")



    }
    if (riktigAntall == 5) {
        spillFerdig = true

        GameOver.innerHTML = "Du vant"
        GameOver.classList.add("taper")

    }
    
}

startSpill()
