//define constants
const maxGuesses = 10;
const apiURL = "https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new";

//define variable elements
let guessesCount = 0;
let currentGuess = [];
let prevousGuesses = [];
let scoreCount = {
    wins: 0,
    losses: 0,
}

async function getRandomNumbers(url){
    axios.get("https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new")
    .then((response) => {
        console.log(response.data)
    })
}


function winLoss(){
    if (guessesCount === maxGuesses){
        //lost game modal
    } else if (currentGuess === correctAnswer){
        //won game modal
    }
}