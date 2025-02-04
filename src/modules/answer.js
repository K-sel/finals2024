export class Answer {
  #inputs;
  #board;
  #row;
  #game;
  #usersTries;

  constructor(row, game) {
    this.#board = document.querySelector("main.board");
    this.#row = row;
    this.#game = game;
    this.#usersTries = 0;
  }

  generateAnswer() {
    this.#inputs = `<form class="row" id="row-${this.#row}" inert=true>
	        <input class="letter" type="text" name="letter-0" id="row-${
            this.#row
          }--0" maxlength="1">
	        <input class="letter" type="text" name="letter-1" id="row-${
            this.#row
          }--1" maxlength="1">
	        <input class="letter" type="text" name="letter-2" id="row-${
            this.#row
          }--2" maxlength="1">
	        <input class="letter" type="text" name="letter-3" id="row-${
            this.#row
          }--3" maxlength="1">
	        <input class="letter" type="text" name="letter-4" id="row-${
            this.#row
          }--4" maxlength="1">
	        <input type="submit" hidden>
            </form>`;

    this.#board.insertAdjacentHTML("afterbegin", this.#inputs);
    return this;
  }

  open() {
    document.querySelector("form").removeAttribute("inert");
    return this;
  }

  close() {
    document.querySelector("form").setAttribute("inert", false);
    return this;
  }

  async submit(word, id) {
    this.#usersTries++;
    if (this.isAlphaNumeric(word) && word.length == 5) {
      console.log("mot ok");
      let form = { guess: word };
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      };

      let response = await fetch(
        "https://progweb-wwwordle-api.onrender.com/guess",
        options
      );
      let data = await response.json();

      console.log(response);
      console.log(data);

      this.feedback(id, data);
    } else {
      this.message("Mot invalide");
    }
  }
  isAlphaNumeric(word) {
    return /^[a-zA-Z]+$/.test(word);
  }

  feedback(id, data) {

    if(data.message === "Congratulations! You found the word!"){
        console.log(this.#game);
        console.log("gagné");
        this.#game.message("Vous avez gagné !")
    } else if (data.status === "invalid"){
        // if(this.#usersTries == this.#game.tries){
        //     this.#game.message("Vous avez perdu...")
        // }
        this.#game.message("Essayez encore !")
    }

    let line = 0;
    data.feedback.forEach((el)=>{
        document
        .querySelector(`input[id=row-${this.#row}--${line}`)
        .classList.add(el.status);
        line++;
    })

  }
}
