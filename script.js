const defaults = [
  {
    q: "What is HTML?",
    a: "HTML (HyperText Markup Language) is used to structure content on web pages."
  },
  {
    q: "What is CSS?",
    a: "CSS (Cascading Style Sheets) is used to style and format web pages ."
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
    JSON.stringify(ca…
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
    $("counter").textContent = "0 cards";
    return;
  }

  index = Math.max(0, Math.min(index, cards.length - 1));

  $("question").textContent = cards[index].q;
  $("answer").textContent = cards[index].a;

  $("answerWrap").classList.add("hidden");
  $("showBtn").textContent = "Show Answer";

  $("counter").textContent =
    Card ${index + 1} of ${cards.length};

  $("progressBar").style.width =
    ${((index + 1) / cards.length) * 100}%;

  $("prevBtn").disabled = index === 0;
  $("nextBtn").disabled = index === cards.length - 1;
}

function openModal(edit) {
  editing = edit;

  $("modalTitle").textContent =
    edit ? "Edit Flashcard" : "Add Flashcard";

  $("questionInput").value =
    edit ? cards[index].q : "";

  $("answerInput").value =
    edit ? cards[index].a : "";

  $("modal").classList.remove("hidden");

  $("questionInput").focus();
}

function closeModal() {
  $("modal").classList.add("hidden");
}

$("showBtn").onclick = () => {
  $("answerWrap").classList.toggle("hidden");

  $("showBtn").textContent =
    $("answerWrap").classList.contains("hidden")
      ? "Show Answer"
      : "Hide Answer";
};

$("nextBtn").onclick = () => {
  if (index < cards.length - 1) {
    index++;
    render();
  }
};

$("prevBtn").onclick = () => {
  if (index > 0) {
    index--;
    render();
  }
};

$("addBtn").onclick = () => openModal(false);

$("editBtn").onclick = () => {
  if (cards.length) {
    openModal(true);
  }
};

$("deleteBtn").onclick = () => {
  if (
    cards.length &&
    confirm("Delete this flashcard?")
  ) {
    cards.splice(index, 1);

    index = Math.max(0, index - 1);

    save();
    render();
  }
};

$("saveBtn").onclick = () => {
  const q = $("questionInput").value.trim();
  const a = $("answerInput").value.trim();

  if (!q || !a) {
    alert("Enter both question and answer.");
    return;
  }

  if (editing) {
    cards[index] = { q, a };
  } else {
    cards.push({ q, a });
    index = cards.length - 1;
  }

  save();
  closeModal();
  render();
};

$("cancelBtn").onclick = closeModal;

render();
