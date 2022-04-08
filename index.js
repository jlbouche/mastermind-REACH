//define constants
const startNewGame = document.getElementById('start-game');
const maxGuesses = 10;

//define variable elements
let randomNumbers = [];
let guessesCount = 0;
let currentGuess = [];
let prevousGuesses = [];
let scoreCount = {
    wins: 0,
    losses: 0,
}

//event listeners
startNewGame.addEventListener('click', startGame);

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
    if (currentGuess.length === 4){
        winLoss();
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
        console.log(`hitting winLoss add history of guesses, previousGuesses updated to: ${previousGuesses}`)
    }
}