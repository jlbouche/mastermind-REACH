//constants
const maxGuesses = 10;
const full = '⚫'
const half = '🔴'
const empty = '⚪'

//variable values
let randomNumbers = [];
let guessesRemaining = maxGuesses;
let nextNumber = 0;
let currentGuess = [];
let currentMatch = [];
let previousGuesses = [];
let previousMatches = [];
let guessMatch = [];
let winCount = 0;
let lossCount = 0;

//elements by id
const startNewGame = document.getElementById('start-game');
const numbers = document.querySelectorAll(".number");
const backspace = document.getElementById("backspace");
const submit = document.getElementById("submit");
let gameBoard = document.getElementById("game-board")
let winHistory = document.getElementById("win-history")
let lossHistory = document.getElementById("loss-history")
let previousGuessesDisplay = document.getElementById("previous-guesses")
let previousMatchesDisplay = document.getElementById("previous-matches")

//event listeners
startNewGame.addEventListener('click', startGame);
backspace.addEventListener('click', deleteGuess);
submit.addEventListener('click', checkGameState);

for (let number of numbers){
    let guess = number.innerHTML
    number.addEventListener('click', () => guessAnswer(guess));
}

//functions
winHistory.innerText = localStorage.getItem("win_count")
lossHistory.innerText = localStorage.getItem("loss_count")

init()

function init(){
    $(document).ready(function(){
        if(!Cookies.get('alert')) {
            $('#infoModal').modal({show:true});
            Cookies.set('alert', true);
        }
    })
    for (let i = 0; i < maxGuesses; i++){
        let guessRow = document.createElement('div')
        guessRow.className = 'row guess-row'
        for (let j = 0; j < 4; j++){
            let numberBox = document.createElement("div")
            numberBox.className = 'col number-box'
            guessRow.appendChild(numberBox)
        }
        gameBoard.append(guessRow)
    }
    startGame();
}

async function getRandomNumbers(){
    axios.get("https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new")
        .then((response) => {
            let data = response.data.split("");
            let stringNumbers = data.filter(el => el !== '\n')
            randomNumbers = stringNumbers.map(function (x){
                return parseInt(x);
            })
            console.log(randomNumbers)
        })
}

function guessAnswer(guess){
    //don't want to run the below after we hit 4 numbers in guess
    if (nextNumber === 4) {
        return
    }
    let guessRow = document.getElementsByClassName("guess-row")[10 - guessesRemaining]
    let numberBox = guessRow.children[nextNumber]
    numberBox.textContent = parseInt(guess)
    currentGuess.push(parseInt(guess))
    nextNumber += 1
}

function deleteGuess(){
    if (currentGuess.length >=1){
        let guessRow = document.getElementsByClassName('guess-row')[10 - guessesRemaining]
        let numberBox = guessRow.children[nextNumber - 1]
        numberBox.textContent = ""
        nextNumber -= 1;
        currentGuess.pop()
    }
}

function startGame(){
    //get random numbers first
    getRandomNumbers();
    //double-check values reset
    resetValues();
}

function resetValues(){
    randomNumbers = []
    previousGuesses = []
    previousMatches = []
    currentGuess = [];
    currentMatch = [];
    guessesRemaining = maxGuesses;
    nextNumber = 0;
}

function checkMatches(){
    //conditional values in currentGuess compared to randomNumbers
    randomNumbers.forEach((num, idx) => {
        if (currentGuess[idx] === num){
            currentMatch.push(full)
        } else if (currentGuess.includes(num)){
            currentMatch.push(half)
        } else {
            currentMatch.push(empty)
        }
    })
    currentMatch.sort().reverse();
    //add currentGuess array to previousGuesses, currentMatch to previousMatches
    previousGuesses.push(currentGuess.join(''));
    previousMatches.push(currentMatch.join(''));
}

function checkGameState(){
    console.log(currentGuess, randomNumbers)
    //first check that guess is valid length
    if (currentGuess.length < 4){
        $('#missingNumbersModal').modal({show: true});
    //next check if guess matches--as game is over with win until max is reached
    } else if (currentGuess.every((val, idx) => val === randomNumbers[idx])){
        //show victory modal
        $('#victoryModal').modal({show:true});
        //increase winCount by 1
        winCount++;
        // //update localStorage for updated winCount
        localStorage.setItem("win_count", winCount)
        //reset values for new game
        resetValues();
    //next check if maxGuesses reached--as that is the other condition that ends the game
    } else if (guessesRemaining === 0){
        //show lost modal
        $('#lostModal').modal({show:true});
        //increase lossCount by 1
        lossCount++;
        // //update localStorage for updated lossCount
        localStorage.setItem("loss_count", lossCount)
        //reset values for new game
        resetValues();
    //finally, when guess is made that doesn't match but also haven't reached maxGuesses
    } else {
        nextLetter = 0;
        //decrease number of guesses left by 1
        guessesRemaining -= 1;
        //reset currentGuess/Match for next guess input
        currentGuess = [];
        currentMatch = [];
    }
}