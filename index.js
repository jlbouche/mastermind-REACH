//define constants
const startNewGame = document.getElementById('start-game');
const maxGuesses = 10;
const numbers = document.querySelectorAll("#numbers-grid")

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
    let guess = number
    number.addEventListener('click', () => guessAnswer(guess));
}

async function getRandomNumbers(){
    axios.get("https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new")
        .then((response) => {
            let data = response.data.split("");
            randomNumbers = data.filter(el => el !== '\n')
            console.log(randomNumbers)
        })
}

function guessAnswer(guess){
    currentGuess.push(guess)
    console.log(`hitting guessAnswer function pre 4 guesses, currentGuess updated to ${currentGuess}`)
    if (currentGuess.length === 4){
        guessesCount++;
        console.log(`hitting guessAnswer conditional of 4 numbers in guess, guessesCount now ${guessesCount}`)
        winLoss();
        currentGuess = [];
    }
}

function startGame(){
    getRandomNumbers();
}

function winLoss(){
    if (currentGuess === randomNumbers){
        //won game modal
        console.log('hitting winLoss won game condition')
    } else if (guessesCount === maxGuesses){
        //lost game modal
        console.log('hitting winLoss lost game condition')
    } else {
        previousGuesses.push(currentGuess);
        console.log(`hitting winLoss add history of guesses, previousGuesses updated to: ${previousGuesses} and guessesCount increased to ${guessesCount}`)
    }
}