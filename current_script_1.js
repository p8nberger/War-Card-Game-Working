import Deck from "./current_deck_1.js"

const CARD_VALUE_MAP = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
}

const computerCardSlot = document.querySelector('.computer-card-slot')
const playerCardSlot = document.querySelector('.player-card-slot')
const computerDeckElement = document.querySelector('.computer-deck')
const playerDeckElement = document.querySelector('.player-deck')
const text = document.querySelector('.text')
const playerScoreElement = document.querySelector('.player-score')
const computerScoreElement = document.querySelector('.computer-score')


let playerDeck, computerDeck, inRound, stop

let btnSend = document.getElementById('btn');
let playerScore = 0
let computerScore = 0

btnSend.addEventListener("click", () => {
  if (stop) {
    startGame()
    return
  }

  if (inRound) {
    cleanBeforeRound()
  } else {
    flipCards()
  }
})

startGame()
function startGame() {
  const deck = new Deck()
  deck.shuffle()

  const deckMidpoint = Math.ceil(deck.numberOfCards / 2)
  playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))
  computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))
  inRound = false
  stop = false

  cleanBeforeRound()
}

function cleanBeforeRound() {
  inRound = false
  computerCardSlot.innerHTML = ""
  playerCardSlot.innerHTML = ""
  text.innerText = ""

  updateDeckCount()

}

function flipCards() {
  inRound = true

  const playerCard = playerDeck.shift()
  const computerCard = computerDeck.shift()

  playerCardSlot.appendChild(playerCard.getHTML())
  computerCardSlot.appendChild(computerCard.getHTML())

  if (isRoundWinner(playerCard, computerCard)) {
    text.innerText = 'Player 1 Wins'
    playerScore ++;            
  } else if (isRoundWinner(computerCard, playerCard)) {
    text.innerText = 'Computer Wins'
    computerScore ++;
  } else {
    text.innerText = 'Draw'
  }


  if (playerDeckElement == 0){
    console.log('zero');
  }

  // if (playerDeckElement == 0){
  //   if (isGameOver(computerScore, playerScore)) {
  //     text.innerText = "You Lose!!"
  //     stop = true
  //   } else if (isGameOver(playerScore, computerScore)) {
  //     text.innerText = "You Win!!"
  //     stop = true
  //   } else {
  //     text.innerText = "Tie score, it's a draw"
  //   }
  // } 
  
  updateScore()
}

function updateDeckCount() {
    computerDeckElement.innerText = computerDeck.numberOfCards
    playerDeckElement.innerText = playerDeck.numberOfCards
}
function updateScore() {
    playerScoreElement.innerText = playerScore
    computerScoreElement.innerText = computerScore
}

function isRoundWinner(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
  
}

btnSend.addEventListener('click', () =>{
    btnSend.innerText = 'Play';
    
})

function isGameOver(score1, score2){
  return score1 > score2;
}

// if (playerDeck == 0){
//     isGameOver(computerScore, playerScore)
//   } else {
//     if (inRound) {
//         cleanBeforeRound()
//       } else {
//         flipCards()
//       }
//   }

// if (isGameOver(computerScore, playerScore)) {
//     text.innerText = 'You Lose!!'
//     stop = true
//   } else if (isGameOver(playerScore, computerScore)) {
//     text.innerText = 'You Win!!'
//     stop = true
//   }

// function isGameOver(score1, score2) {
//   return  playerDeck == 0 && score1 > score2;
// }

// isGameOver(computerScore, playerScore)

// function isGameOver(score1, score2) {
//     if (playerDeck == 0 && score1 > score2){
//         text.innerText = 'You Lose!!'
//         stop = true
//     } else if (playerDeck == 0 && score2 > score1){
//         text.innerText = 'You Win!!'
//         stop = true
//     }
//   }


