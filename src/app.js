import { Answer } from "./modules/answer";
import { Game } from "./modules/game";

const board = document.querySelector("main.board");
const game = new Game(5);

const isAlphaNumericKey = (key) => {
  return /^([\x30-\x39]|[\x61-\x7a])$/i.test(key);
};

//Event Listener
board.addEventListener("keyup", (e) => {
  if (e.target.tagName === "INPUT" && e.target.classList.contains("letter")) {
    if (isAlphaNumericKey(e.key) || e.key === "ArrowRight") {
      e.target.nextElementSibling.focus();
    } else if (e.key === "ArrowLeft") {
      e.target.previousElementSibling?.focus();
    }
  }
});

board.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.tagName === "FORM") {
    let formData = new FormData(e.target);
    let word = "";
    for (var value of formData.values()) {
      word += value;
    }
    game.tracking(e, word);
  }
});
