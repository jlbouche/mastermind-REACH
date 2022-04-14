//constants
const maxGuesses = 10;
const full = '⚫'
const half = '🔴'
const empty = '⚪'

//variable values
let randomNumbers = [];
let guessesCount = 0;
let currentGuess = [];
let currentMatch = [];
let previousGuesses = [];
let previousMatches = [];
let guessMatch = [];
let winCount = 0;
let lossCount = 0;

//elements by id
const startNewGame = document.getElementById('start-game');
const playAgain = document.getElementById('play-again');
const numbers = document.querySelectorAll(".number")
let backspace = document.getElementById("backspace")
let winHistory = document.getElementById("win-history")
let lossHistory = document.getElementById("loss-history")
let currentGuessDisplay = document.getElementById("current-guess")
let previousGuessesDisplay = document.getElementById("previous-guesses")
let previousMatchesDisplay = document.getElementById("previous-matches")

//event listeners
startNewGame.addEventListener('click', startGame);
playAgain.addEventListener('click', startGame);
backspace.addEventListener('click', deleteGuess);
for (let number of numbers){
    let guess = number.innerHTML
    number.addEventListener('click', () => guessAnswer(guess));
}

//functions
startGame();

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
    //first only allow number eventListener to work if we have randomNumbers
    if (randomNumbers.length > 0){
        currentGuess.push(parseInt(guess))
        currentGuessDisplay.innerHTML = currentGuess.join("")
        console.log(currentGuess)
        //don't want to run the below before we hit 4 numbers in guess
        if (currentGuess.length === 4){
            //increase number of guesses by 1
            guessesCount++;
            //check whether won/lost/continue
            checkGameState();
        }
    }
}

function deleteGuess(){
    if (currentGuess.length >=1){
        currentGuess.pop();
        currentGuessDisplay.innerHTML = currentGuess.join("")
    }
}

function startGame(){
    //get random numbers first
    getRandomNumbers();
    //make sure no variables stored from last game
    resetValues();
}

function resetValues(){
    randomNumbers = []
    previousGuesses = []
    previousMatches = []
    currentGuess = [];
    currentMatch = [];
    guessesCount = 0;
    previousGuessesDisplay.innerHTML = previousGuesses;
    previousMatchesDisplay.innerHTML = previousMatches;
    currentGuessDisplay.innerHTML = currentGuess;
}

function displayHistory(){
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
    //reset currentGuess/Match for next guess input
    currentGuess = [];
    currentMatch = [];
    //change display to show updated previousGuesses and Matches
    previousGuessesDisplay.innerHTML = ''
    previousMatchesDisplay.innerHTML = ''
    previousGuesses.forEach((elem) => {
        let guessDiv = document.createElement('div');
        guessDiv.classList.add('col')
        guessDiv.textContent = elem;
        previousGuessesDisplay.appendChild(guessDiv)
    })
    previousMatches.forEach((elem) => {
        let matchDiv = document.createElement('div');
        matchDiv.classList.add('col', 'previous-match')
        matchDiv.textContent = elem;
        previousMatchesDisplay.appendChild(matchDiv)
    })
}

function checkGameState(){
    console.log(currentGuess, randomNumbers)
    //first check if guess matches--as game is over with win until max is reached
    if (currentGuess.every((val, idx) => val === randomNumbers[idx])){
        //show victory modal
        $('#victoryModal').modal({show:true});
        //increase winCount by 1
        winCount++;
        // //update localStorage for updated winCount
        localStorage.setItem("win_count", winCount)
        //reset values for new game
        resetValues();
    //next check if maxGuesses reached--as that is the other condition that ends the game
    } else if (guessesCount === maxGuesses){
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
        displayHistory();
    }
}