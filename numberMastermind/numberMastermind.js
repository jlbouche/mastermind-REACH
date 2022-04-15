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
let previousGuessesMatches = new Map();
let guessMatch = [];

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
    previousGuessesMatches = new Map()
    currentGuessDisplay.innerHTML = currentGuess;
    guessesRemainingDisplay.innerHTML = maxGuesses - guessesCount
    previousGuessesMatchesDisplay.innerHTML = ''
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
    previousGuessesMatchesDisplay.innerHTML = ''
    currentGuessDisplay.innerHTML = ''
    currentGuess = [];
    currentMatch = [];
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
    console.log(currentGuess, randomNumbers)
    //first check if guess matches--as game is over with win until max is reached
    if (currentGuess.every((val, idx) => val === randomNumbers[idx])){
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