// PRINT WELCOME MESSAGE
console.log("Welcome to Rock - Paper - Scissors game !");

// WHILE USER WANT TO PLAY

//    ASK USER NUMBER OF ROUNDS TO PLAY
//    SET VAR rounds FOR ROUNDS TO PLAY WITH USER INPUT
//    SET VAR score FOR SCORE
//    WHILE NOT rounds ROUNDS ARE PLAYED
//      PLAY ROUND BY CALLING playRound() FUNCTION
//    END WHILE
// PRINT score SCORE
// ASK USER TO REPLAY OR QUIT
// IF QUIT
//    BREAK LOOP
// END WHILE
// PRINT QUIT MESSAGE

function getComputerChoice() {
    // randomly return rock, paper or scissors
    let computerChoice;
    let randomNumber = Math.random();
    if (randomNumber < 1/3) {  // Divide [0;1] range in 3 parts and look where randomNumber is 
        computerChoice = "rock";
    } else if (randomNumber < 2/3) {
        computerChoice = "paper";
    } else {
        computerChoice = "scissors";
    }
    return computerChoice;
}
