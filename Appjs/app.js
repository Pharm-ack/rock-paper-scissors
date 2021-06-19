const buttons = document.querySelectorAll(".pick");
const scoreEL = document.getElementById("score");
const main = document.getElementById("main");
const selection = document.getElementById("selection");
const reset = document.getElementById("reset");
const user_select = document.getElementById("user_select");
const computer_select = document.getElementById("computer_select");
const winner = document.getElementById("winner");
const showRules = document.getElementById("show-rules");
const closeRules = document.getElementById("close-rules");
const openRules = document.getElementById("open-rules");

const choices = ["paper", "rock", "scissors"];

let score = 0;
let userChoice = undefined;

Array.from(buttons).forEach((button) => {
  button.addEventListener("click", () => {
    userChoice = button.getAttribute("data-choice");

    checkWinner();
  });
});

openRules.addEventListener("click", () => {
  showRules.style.display = "flex";
});
closeRules.addEventListener("click", () => {
  showRules.style.display = "none";
});

reset.addEventListener("click", () => {
  main.style.display = "flex";
  selection.style.display = "none";
});

function pickRandomChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function checkWinner() {
  const computerChoice = pickRandomChoice();

  updateSelection(user_select, userChoice);
  updateSelection(computer_select, computerChoice);

  if (userChoice === computerChoice) {
    winner.innerText = "you draw";
  } else if (
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    updateScore(+1);
    winner.innerText = "you win";
  } else {
    winner.innerText = "you lose";
    updateScore(-1);
  }

  main.style.display = "none";
  selection.style.display = "flex";
}

function updateSelection(selectionEl, choice) {
  selectionEl.classList.remove("btn-paper");
  selectionEl.classList.remove("btn-rock");
  selectionEl.classList.remove("btn-scissors");

  const img = selectionEl.querySelector("img");
  selectionEl.classList.add(`btn-${choice}`);
  img.src = `./images/icon-${choice}.svg`;
  img.alt = choice;
}

function updateScore(value) {
  score += value;

  scoreEL.innerText = score;
}
