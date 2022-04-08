//define constants
const startNewGame = document.getElementById('start-game');
const maxGuesses = 10;
const numbers = document.querySelectorAll(".number")

//define variable elements
let randomNumbers = [];
let guessesCount = 0;
let currentGuess = [];
let previousGuesses = [];
let scoreCount = {
    wins: 0,
    losses: 0,
}

//event listeners
startNewGame.addEventListener('click', startGame);
for (let number of numbers){
    let guess = number.innerHTML
    number.addEventListener('click', () => guessAnswer(guess));
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
    currentGuess.push(parseInt(guess))
    console.log(currentGuess)
    console.log(`hitting guessAnswer function pre 4 guesses, currentGuess updated to ${currentGuess}`)
    if (currentGuess.length === 4){
        guessesCount++;
        console.log(`hitting guessAnswer conditional of 4 numbers in guess, guessesCount now ${guessesCount}`)
        winLoss();
    }
}

function startGame(){
    getRandomNumbers();
}

function winLoss(){
    console.log(currentGuess, randomNumbers)
    if (currentGuess.every((val, idx) => val === randomNumbers[idx])){
        //won game modal
        console.log('hitting winLoss won game condition')
    } else if (guessesCount === maxGuesses){
        //lost game modal
        console.log('hitting winLoss lost game condition')
    } else {
        previousGuesses.push(currentGuess);
        console.log(`hitting winLoss add history of guesses, previousGuesses updated to: ${previousGuesses} and guessesCount increased to ${guessesCount}`)
        currentGuess = [];
    }
}