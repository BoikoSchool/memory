const cards = [
  "img/Alice.jpeg",
  "img/Alice.jpeg",
  "img/Caterpillar.jpeg",
  "img/Caterpillar.jpeg",
  "img/Cheshire Cat.jpeg",
  "img/Cheshire Cat.jpeg",
  "img/Mad Hatter.jpeg",
  "img/Mad Hatter.jpeg",
  "img/Queen of Hearts.jpeg",
  "img/Queen of Hearts.jpeg",
  "img/White Rabbit.jpeg",
  "img/White Rabbit.jpeg",
  "img/Tweedledum and Tweedledee.jpg",
  "img/Tweedledum and Tweedledee.jpg",
  "img/Mad March Hare.jpg",
  "img/Mad March Hare.jpg",
  "img/The White Queen.jpg",
  "img/The White Queen.jpg",
];

const gameContainer = document.querySelector(".game-container");
const gameBoard = document.querySelector(".game-board");
const newGameButton = document.querySelector(".new-game-button");
const gameCompleteAnimation = document.querySelector(
  ".game-complete-animation"
);

const player1Attempts = document.querySelector(".player1-attempts");
const player1PairsGuessed = document.querySelector(
  ".player1-pairs-guessed"
);
const player2Attempts = document.querySelector(".player2-attempts");
const player2PairsGuessed = document.querySelector(
  ".player2-pairs-guessed"
);

let currentPlayer = 1;
let attemptsPlayer1 = 0;
let pairsGuessedPlayer1 = 0;
let attemptsPlayer2 = 0;
let pairsGuessedPlayer2 = 0;
let flippedCards = [];
let lockBoard = false;
let playing = true;

function createCard(value) {
  if (playing) {
    const card = document.createElement("div");
    card.classList.add("card");
    const img = document.createElement("img");
    img.src = value;
    img.classList.add("hidden");
    card.appendChild(img);
    card.addEventListener("click", () => flipCard(card, img));
    return card;
  }
}

function flipCard(card, img) {
  if (playing) {
    if (lockBoard || flippedCards.includes(card)) {
      return;
    }

    img.classList.remove("hidden");
    card.classList.add("flipped");

    flippedCards.push(card);

    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      const currentPlayerAttempts =
        currentPlayer === 1 ? ++attemptsPlayer1 : ++attemptsPlayer2;

      if (card1.firstChild.src === card2.firstChild.src) {
        card1.removeEventListener("click", flipCard);
        card2.removeEventListener("click", flipCard);
        flippedCards = [];
        currentPlayer === 1
          ? ++pairsGuessedPlayer1
          : ++pairsGuessedPlayer2;

        if (
          pairsGuessedPlayer1 + pairsGuessedPlayer2 ===
          cards.length / 2
        ) {
          setTimeout(() => {
            gameCompleteAnimation.style.display = "block";
          }, 500);
          playing = false;
        }
      } else {
        lockBoard = true;
        setTimeout(() => {
          card1.firstChild.classList.add("hidden");
          card2.firstChild.classList.add("hidden");
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          flippedCards = [];
          lockBoard = false;
          currentPlayer = currentPlayer === 1 ? 2 : 1;
        }, 1000);
      }
      updateStats();
    }
  }
}

function updateStats() {
  player1Attempts.textContent = attemptsPlayer1;
  player1PairsGuessed.textContent = pairsGuessedPlayer1;
  player2Attempts.textContent = attemptsPlayer2;
  player2PairsGuessed.textContent = pairsGuessedPlayer2;
}

function createGameBoard() {
  if (playing) {
    gameBoard.innerHTML = "";
    cards.sort(() => 0.5 - Math.random());
    cards.forEach((card) => {
      const element = createCard(card);
      gameBoard.appendChild(element);
    });
  }
}

function resetGame() {
  currentPlayer = 1;
  attemptsPlayer1 = 0;
  pairsGuessedPlayer1 = 0;
  attemptsPlayer2 = 0;
  pairsGuessedPlayer2 = 0;
  flippedCards = [];
  lockBoard = false;
  playing = true;
  gameCompleteAnimation.style.display = "none";
  updateStats();
  createGameBoard();
}

newGameButton.addEventListener("click", resetGame);

createGameBoard();