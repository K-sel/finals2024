import { Answer } from "./answer";

export class Game {
  tries;
  #answers = [];
  #current;

  constructor(tries) {
    this.tries = tries;
    this.createGame();
  }

  get tries (){
    return this.tries;
  }

  stop(){
    document.querySelector("main").setAttribute("inert", true);
    
  }

  createGame() {
    for (let i = 0; i < this.tries; i++) {
      this.#answers.unshift(new Answer(i, this));
    }
    this.#answers.forEach((el) => {
      el.generateAnswer();
    });
    this.#answers.reverse();
    this.#answers[0].open();
    document.querySelector("input.letter").focus();
    console.log(this.#answers);
  }

  tracking(e, word) {
    let id = e.target.getAttribute("id").slice(4, 5);

    this.#current = id;
    let html = e.target;

    this.#answers[id].submit(word, id);

    e.target.nextElementSibling?.removeAttribute("inert");
    e.target.previousElementSibling?.setAttribute("inert", true);
    e.target.nextElementSibling[0].focus();
  }

  message(message) {
    document.querySelector("p.message").textContent = message;
  }
}
