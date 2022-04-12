//define constants
const startNewGame = document.getElementById('start-game');
const playAgain = document.getElementById('play-again');
const maxGuesses = 10;
const numbers = document.querySelectorAll(".number")

//define variable values
let randomNumbers = [];
let guessesCount = 0;
let currentGuess = [];
let currentMatch = [];
let previousGuesses = [];
let previousMatches = [];
let guessMatch = [];
let winCount = 0;
let lossCount = 0;

//get elements by id
let winHistory = document.getElementById("win-history")
let lossHistory = document.getElementById("loss-history")
let previousGuessesDisplay = document.getElementById("previous-guess")
let previousMatchesDisplay = document.getElementById("previous-match")

//event listeners
startNewGame.addEventListener('click', startGame);
playAgain.addEventListener('click', startGame)
for (let number of numbers){
    let guess = number.innerHTML
    number.addEventListener('click', () => guessAnswer(guess));
}


//functions
winHistory.innerText = localStorage.getItem("win_count")
lossHistory.innerText = localStorage.getItem("loss_count")

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
}

function displayHistory(){
    //add currentGuess array to previousGuesses, currentMatch to previousMatches
    previousGuesses.push(currentGuess);
    //conditional values in currentGuess compared to randomNumbers
    currentGuess.forEach((num, idx) => {
        if (randomNumbers[idx] === num){
            currentMatch.push('full')
        } else if (randomNumbers.includes(num)){
            currentMatch.push('half')
        } else {
            currentMatch.push('empty')
        }
    })
    previousMatches.push(currentMatch);
    //change display to show updated previousGuesses and Matches
    previousGuessesDisplay.innerHTML = previousGuesses.join('<br>');
    previousMatchesDisplay.innerHTML = previousMatches.join('<br>');
    //reset currentGuess for next guess input
    currentGuess = [];
    currentMatch = [];
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