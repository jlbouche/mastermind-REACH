//define constants
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

async function getRandomNumbers(){
    axios.get("https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new")
        .then((response) => {
            let data = response.data.split("");
            randomNumbers = data.filter(el => el !== '\n')
            console.log(randomNumbers)
        })
}

getRandomNumbers();


function winLoss(){
    if (currentGuess === correctAnswer){
        //won game modal
    } else if (guessesCount === maxGuesses){
        //lost game modal
    }
}