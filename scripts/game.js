// PRINT WELCOME MESSAGE
console.log("_".repeat(50));
console.log("Welcome to Rock - Paper - Scissors game !");
console.log("_".repeat(50));

let userGameStart = parseInt(prompt("Enter 1 to play."));
let gameState = userGameStart == 1 ? true : false;
// WHILE USER WANT TO PLAY
while (gameState) {
//    ASK USER NUMBER OF ROUNDS TO PLAY
//    SET VAR rounds FOR ROUNDS TO PLAY WITH USER INPUT
//    SET VARS FOR SCORE
    var userScore = 0;
    var computerScore = 0;
    let rounds = parseInt(prompt("How many rounds do you want to play ? "));
//    WHILE NOT {rounds} ROUNDS ARE PLAYED
    while(rounds > 0) {
        //PLAY ROUND BY CALLING playRound() FUNCTION
        playRound();
        rounds--;
    }
//  END WHILE
// PRINT score SCORE
// ASK USER TO REPLAY OR QUIT
// IF QUIT
//    BREAK LOOP
}
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

function getUserChoice() {
    let userChoice = "notValid"
    while (userChoice === "notValid") { //ask while user input is not valid
        userChoice = prompt("Rock, Paper or Scissors ? ");
        userChoice = userChoice.trim().toLowerCase(); //remove space and lowerCase to compare
        if (userChoice == "rock" || userChoice == "paper" || userChoice == "scissors") { //if valid return, else set input to notValid
            return userChoice;
        } else {
            console.log("Invalid answer. Please select a valid one.");
            userChoice = "notValid";
        }
    }
}

function playRound() {
    /* Play a round :
    Get user choice, Get computer choice
    Compare user & computer choice and update score
    Print result & score */

    let computerChoice = getComputerChoice();
    let userChoice = getUserChoice();

    //Format text for output
    let userChoiceOut = get_formated_choice_text_for_output(userChoice);
    let computerChoiceOut = get_formated_choice_text_for_output(computerChoice);

    console.log("User choice : " + userChoiceOut + " | Computer choice : " + computerChoiceOut);
    console.log(userChoiceOut + " vs " + computerChoiceOut + " !");

    //Compare situation, determin winner, set score and print formatted text
    if (userChoice === computerChoice) {
        console.log("It's a draw!");
    } else {
        if((userChoice === "paper" && computerChoice === "rock") || 
           (userChoice === "scissors" && computerChoice === "paper") ||
           (userChoice === "rock" && computerChoice === "scissors")) {
            console.log("User win ! " + userChoiceOut + " > " + computerChoiceOut);
            userScore++;
        } else {
            console.log("Computer win ! " + computerChoiceOut + " > " + userChoiceOut);
            computerScore++;
        }
    }
    printScore(userScore, computerScore);
    console.log("_".repeat(30));
    console.log(" ");
    
}


function get_formated_choice_text_for_output(choice) {
    return choice.slice(0,1).toUpperCase() + choice.slice(1);
}

function printScore(userScore, computerScore) {
    console.log(" ".repeat(10) + "| Score |" + " ".repeat(10));
    console.log(" ".repeat(5) + "User : " + userScore + " | Computer : " + computerScore);
}
