//define constants
const maxGuesses = 10;


//define variable elements
let guessesCount = 0;
let currentGuess = [];
let prevousGuesses = [];

init();

function init(){
    let correctAnswer; //API call to store random number sequence
    //reset variables for window refresh?
}

function winLoss(){
    if (guessesCount === maxGuesses){
        //lost game modal
    } else if (currentGuess === correctAnswer){
        //won game modal
    }
}