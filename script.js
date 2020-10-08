const body = document.querySelector("body");
const flashcardFront = document.querySelector(".flashcard-front");
const flashcardBack = document.querySelector(".flashcard-back");
const kanji = document.querySelector(".flashcard-front h1");
const hiragana = document.querySelector(".flashcard-front h2");
const romaji = document.querySelector(".flashcard-back p:first-child");
const english = document.querySelector(".flashcard-back p:nth-child(2)");
const lightswitch = document.querySelector("#lightswitch");
const flashcardContainer = document.querySelector(".flashcard-container");
const button = document.querySelector("button");
const progressInner = document.querySelector(".progress-bar-inner");
const progressOuter = document.querySelector(".progress-bar");

// Event handler to change light/dark mode
lightswitch.addEventListener("click", function() {
    body.classList.toggle("dark");
    flashcardFront.classList.toggle("dark");
    flashcardBack.classList.toggle("dark");
    lightswitch.classList.toggle("dark");
    progressInner.classList.toggle("dark");
    progressOuter.classList.toggle("dark");
}); 

// Writing the darkmode function this way breaks the next button for some reason

/* lightswitch.addEventListener("click", function() {
    let elems = document.querySelectorAll("*");
    for (i = 0; i < elems.length; i++) {
        elems[i].classList.toggle("dark");
    }
}); */

// Event handler for flip card animation
flashcardContainer.addEventListener("click", function() {
    flashcardContainer.classList.toggle("flip");
});

// Define card constructor
function Card(kanji, hiragana, romaji, english) {
    this.kanji = kanji;
    this.hiragana = hiragana;
    this.romaji = romaji;
    this.english = english; 
}

// Define random integer function
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Define shuffling function
function shuffle(deck) {
    for (i = deck.length - 1; i > -1; i--) {
        j = getRandomInt(i + 1);
        [deck[i], deck[j]] = [deck[j], deck[i]]
    }
    return deck;
}

// Create unshuffled default list of cards
let cardObjectList = [{"kanji": "\u3044\u3044\u5b50", "hiragana": "\u3044\u3044\u3053", "romaji": "iiko", "english": "good child"}, {"kanji": "\u8272", "hiragana": "\u3044\u308d", "romaji": "iro", "english": "color"}, {"kanji": "\u304a\u5f01\u5f53", "hiragana": "\u304a\u3079\u3093\u3068\u3046", "romaji": "obentou", "english": "boxed lunch"}, {"kanji": "\u6b4c\u821e\u4f0e", "hiragana": "\u304b\u3076\u304d", "romaji": "kabuki", "english": "Kabuki"}, {"kanji": "\u53bb\u5e74", "hiragana": "\u304d\u3087\u306d\u3093", "romaji": "kyonen", "english": "last year"}, {"kanji": "\u85ac", "hiragana": "\u304f\u3059\u308a", "romaji": "kusuri", "english": "medicine"}, {"kanji": "\u85ac\u3092\u98f2\u3080", "hiragana": "\u304f\u3059\u308a\u3092\u306e\u3080", "romaji": "kusuri o nomu", "english": "to take medicine"}, {"kanji": "\u4eca\u5ea6", "hiragana": "\u3053\u3093\u3069", "romaji": "kondo", "english": "near future"}, {"kanji": "\u4f5c\u6587", "hiragana": "\u3055\u304f\u3076\u3093", "romaji": "sakubun", "english": "essay; composition"}, {"kanji": "\u8a66\u9a13", "hiragana": "\u3057\u3051\u3093", "romaji": "shiken", "english": "exam"}, {"kanji": "\u75c5\u6c17", "hiragana": "\u3073\u3087\u3046\u304d", "romaji": "byouki", "english": "illness; sickness"}, {"kanji": "\u9752\u3044", "hiragana": "\u3042\u304a\u3044", "romaji": "aoi", "english": "blue"}, {"kanji": "\u8d64\u3044", "hiragana": "\u3042\u304b\u3044", "romaji": "akai", "english": "red"}, {"kanji": "\u9ed2\u3044", "hiragana": "\u304f\u308d\u3044", "romaji": "kuroi", "english": "black"}, {"kanji": "\u5bc2\u3057\u3044", "hiragana": "\u3055\u3073\u3057\u3044", "romaji": "sabishii", "english": "lonely"}, {"kanji": "\u767d\u3044", "hiragana": "\u3057\u308d\u3044", "romaji": "shiroi", "english": "white"}, {"kanji": "\u82e5\u3044", "hiragana": "\u308f\u304b\u3044", "romaji": "wakai", "english": "young"}, {"kanji": "\u610f\u5730\u60aa(\u306a)", "hiragana": "\u3044\u3058\u308f\u308b(\u306a)", "romaji": "ijiwaru(na)", "english": "mean-spirited"}, {"kanji": "\u8e0a\u308b", "hiragana": "\u304a\u3069\u308b", "romaji": "odoru", "english": "to dance"}, {"kanji": "\u7d42\u308f\u308b", "hiragana": "\u304a\u308f\u308b", "romaji": "owaru", "english": "(something) ends"}, {"kanji": "\u4eba\u6c17\u304c\u3042\u308b", "hiragana": "\u306b\u3093\u304d\u304c\u3042\u308b", "romaji": "ninki ga aru", "english": "to be popular"}, {"kanji": "\u59cb\u307e\u308b", "hiragana": "\u306f\u3058\u307e\u308b", "romaji": "hajimaru", "english": "(something) begins"}, {"kanji": "\u5f3e\u304f", "hiragana": "\u3072\u304f", "romaji": "hiku", "english": "to play (string instrument or piano)"}];

let cardList = [];

for (let i = 0; i < cardObjectList.length; i++) {
    cardList.push(new Card(cardObjectList[i]["kanji"], cardObjectList[i]["hiragana"], cardObjectList[i]["romaji"], cardObjectList[i]["english"]));
}

// Event handler for next button
let i = 0;
button.addEventListener("click", function() {
    if (i === cardList.length - 1) {
        i = 0;
    } else {
        i++;
    }
    if (flashcardContainer.classList.contains("flip")) {
        flashcardContainer.classList.remove("flip");
    }
    
    kanji.textContent = cardList[i].kanji;
    hiragana.textContent = cardList[i].hiragana;
    romaji.textContent = cardList[i].romaji;
    english.textContent = cardList[i].english;
    
    progressLength = (i / cardList.length) * 100;
    progressInner.style.width = progressLength + "%";
});

// Shuffle the deck

cardList = shuffle(cardList);

kanji.textContent = cardList[0].kanji;
hiragana.textContent = cardList[0].hiragana;
romaji.textContent = cardList[0].romaji;
english.textContent = cardList[0].english;