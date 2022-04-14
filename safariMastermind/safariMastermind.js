//constants
const maxGuesses = 10;
const full = '⚫'
const half = '🔴'
const empty = '⚪'
const animalsArr = ['🐘', '🐅', '🐆', '🦓', '🦒', '🦘', '🐍', '🦋']
//variable values
let randomAnimals = [];
let guessesCount = 0;
let currentGuess = [];
let currentMatch = [];
let previousGuesses = [];
let previousMatches = [];
let guessMatch = [];

//elements by id
const startNewGame = document.getElementById('start-game');
const playAgain = document.getElementById('play-again');
const numbers = document.querySelectorAll(".number")
let backspace = document.getElementById("backspace")
let currentGuessDisplay = document.getElementById("current-guess")
let guessesRemainingDisplay = document.getElementById("guesses-remaining")
let previousGuessesDisplay = document.getElementById("previous-guesses")
let previousMatchesDisplay = document.getElementById("previous-matches")

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

function getRandomAnimals(){
    let shuffledAnimals = animalsArr.sort(() => 0.5 - Math.random());
    randomAnimals = shuffledAnimals.slice(0, 4);
    console.log(randomAnimals)
}

function guessAnswer(guess){
    //first only allow number eventListener to work if we have randomAnimals
    if (randomAnimals.length > 0){
        currentGuess.push(guess)
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
    getRandomAnimals();
    //make sure no variables stored from last game
    resetValues();
}

function resetValues(){
    randomAnimals = []
    previousGuesses = []
    previousMatches = []
    currentGuess = [];
    currentMatch = [];
    guessesCount = 0;
    previousGuessesDisplay.innerHTML = previousGuesses;
    previousMatchesDisplay.innerHTML = previousMatches;
    currentGuessDisplay.innerHTML = currentGuess;
    guessesRemainingDisplay.innerHTML = maxGuesses - guessesCount
}

function displayHistory(){
    //conditional values in currentGuess compared to randomAnimals
    randomAnimals.forEach((num, idx) => {
        if (currentGuess[idx].codePointAt(0) === num.codePointAt(0)){
            currentMatch.push(full)
        } else if (currentGuess.includes(num.codePointAt(0))){
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
    console.log(currentGuess, randomAnimals)
    //first check if guess matches--as game is over with win until max is reached
    if (currentGuess.every((val, idx) => val === randomAnimals[idx])){
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