const defaults = [
  {
    q: "What is HTML?",
    a: "HTML (HyperText Markup Language) is used to structure content on web pages."
  },
  {
    q: "What is CSS?",
    a: "CSS (Cascading Style Sheets) is used to style and format web pages."
  },
  {
    q: "What does JavaScript add to a web page?",
    a: "JavaScript adds behavior and interactivity to web pages."
  },
  {
    q: "What is localStorage?",
    a: "localStorage lets a web app save data in the browser between sessions."
  }
];

let cards =
  JSON.parse(localStorage.getItem("codealpha_flashcards") || "null") ||
  defaults;

let index = 0;
let editing = false;

const $ = (id) => document.getElementById(id);

function save() {
  localStorage.setItem(
    "codealpha_flashcards",
    JSON.stringify(cards)
  );
}

function render() {
  if (!cards.length) {
    $("question").textContent = "No cards available";
    $("counter").textContent
