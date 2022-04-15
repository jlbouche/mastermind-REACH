//constants
const maxGuesses = 10;
const full = '⚫'
const half = '🔴'
const empty = '⚪'
const colorsArr = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤎']
//variable values
let randomNumbers = [];
let guessesCount = 0;
let currentGuess = [];
let currentMatch = [];
let previousGuesses = [];
let previousMatches = [];
let guessMatch = [];
let previousGuessesMatches = new Map();

//elements by id
const startNewGame = document.getElementById('start-game');
const playAgain = document.getElementById('play-again');
const numbers = document.querySelectorAll(".number")
let backspace = document.getElementById("backspace")
let currentGuessDisplay = document.getElementById("current-guess")
let guessesRemainingDisplay = document.getElementById("guesses-remaining")
let previousGuessesMatchesDisplay = document.getElementById("previous-guesses-matches")

//event listeners
startNewGame.addEventListener('click', startGame);
playAgain.addEventListener('click', startGame);
backspace.addEventListener('click', deleteGuess);
numbers.forEach((number) => {
    let guess = number.innerHTML
    number.addEventListener('click', () => guessAnswer(guess));
})

//functions
startGame();
guessesRemainingDisplay.innerHTML = maxGuesses - guessesCount

function getRandomColors(){
    let shuffledColors = colorsArr.sort(() => 0.5 - Math.random());
    randomColors = shuffledColors.slice(0, 4);
    console.log(randomColors)
}

function guessAnswer(guess){
    //first only allow number eventListener to work if we have randomNumbers
    if (randomColors.length > 0){
        currentGuess.push(guess)
        currentGuessDisplay.innerHTML = currentGuess.join("")
        console.log(currentGuess)
        //don't want to run the below before we hit 4 numbers in guess
        if (currentGuess.length === 4){
            if (previousGuesses.includes(currentGuess.join(''))){
                $('#alreadyGuessedModal').modal({show:true});
                deleteGuess()
            } else {
                //increase number of guesses by 1
                guessesCount++;
                //check whether won/lost/continue
                checkGameState();
            }
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
    getRandomColors();
    //make sure no variables stored from last game
    resetValues();
}

function resetValues(){
    randomNumbers = []
    previousGuesses = []
    previousMatches = []
    currentGuess = [];
    currentMatch = [];
    previousGuessesMatches = new Map()
    guessesCount = 0;
    currentGuessDisplay.innerHTML = currentGuess;
    guessesRemainingDisplay.innerHTML = maxGuesses - guessesCount
    previousGuessesMatchesDisplay.innerHTML = ''
}

function displayHistory(){
    //conditional values in currentGuess compared to randomNumbers
    randomColors.forEach((num, idx) => {
        if (currentGuess[idx].codePointAt(0) === num.codePointAt(0)){
            currentMatch.push(full)
        } else if (currentGuess.some((elem) => elem.codePointAt(0) === num.codePointAt(0))){
            currentMatch.push(half)
        } else {
            currentMatch.push(empty)
        }
    })
    currentMatch.sort().reverse();
    //add currentGuess array to previousGuesses, currentMatch to previousMatches
    previousGuesses.push(currentGuess.join(''));
    previousMatches.push(currentMatch.join(''));
    previousGuessesMatchesDisplay.innerHTML = ''
    currentGuessDisplay.innerHTML = ''
    //reset currentGuess/Match for next guess input
    currentGuess = [];
    currentMatch = [];
    //change display to show updated previousGuesses and Matches
    previousGuesses.forEach((elem, idx) => {
        previousGuessesMatches.set(elem, previousMatches[idx]);
    })
    console.log(previousGuessesMatches)
    for (const [guess, match] of previousGuessesMatches.entries()) {
        let prevGuessMatchDiv = document.createElement('div');
        prevGuessMatchDiv.classList.add('col')
        prevGuessMatchDiv.innerHTML = `${guess} <br> ${match}`
        previousGuessesMatchesDisplay.appendChild(prevGuessMatchDiv)
    } 
}

function checkGameState(){
    console.log(currentGuess, randomColors)
    //first check if guess matches--as game is over with win until max is reached
    if (currentGuess.every((val, idx) => val === randomColors[idx])){
        //show victory modal
        $('#victoryModal').modal({show:true});

        //reset values for new game
        resetValues();
    //next check if maxGuesses reached--as that is the other condition that ends the game
    } else if (guessesCount === maxGuesses){
        //show lost modal
        $('#lostModal').modal({show:true});
        //reset values for new game
        resetValues();
    //finally, when guess is made that doesn't match but also haven't reached maxGuesses
    } else {
        displayHistory();
        guessesRemainingDisplay.innerHTML = maxGuesses - guessesCount
    }
}