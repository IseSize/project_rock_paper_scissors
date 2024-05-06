// WELCOME

const divGame = document.querySelector("#game");
const playButton = document.querySelector("#playButton");

playButton.addEventListener("mouseover", () => {
    playButton.style.top = "-10px";
    playButton.style.cursor = "pointer";
    playButton.style.color = "#3A2C22";
    console.log('hover');
});
playButton.addEventListener("mouseout", () => {
    playButton.style.top = "0px";
    playButton.style.color = "#684F3A";
    console.log('hover');
});


// let userGameStart = parseInt(prompt("Enter 1 to play."));
// let gameState = userGameStart == 1 ? true : false;

///////////GAME LOOP/////////////////////////////
while (gameState) {
    var userScore = 0;
    var computerScore = 0;
    let rounds = parseInt(prompt("How many rounds do you want to play ? "));
    while(rounds > 0) {
        playRound();
        rounds--;
    }
    console.log("End !");
// PRINT SCORE
    console.log("Final score :");
    printScore(userScore, computerScore);
    if (userScore == computerScore) {
        console.log("Oh ! It's a Draw. ");
    } else if (userScore > computerScore) {
        console.log("You win ! Congrats !");
    } else {
        console.log("You lose... Maybe next time ?");
    }
    console.log(" ".repeat(20));
// REPLAY OR QUIT
    let replay = prompt("Do you want to play again ? YES / NO").trim().toLowerCase();
    if(replay === "no") {
        break;
    }

}
console.log(" ".repeat(20));
console.log("Thanks for playing ! See you. ")

////////////////////////////////////////////////


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

    console.log("Your choice : " + userChoiceOut + " | Computer choice : " + computerChoiceOut);
    console.log(userChoiceOut + " vs " + computerChoiceOut + " !");

    //Compare situation, determine winner, set score and print formatted text
    if (userChoice === computerChoice) {
        console.log("It's a draw!");
    } else {
        if((userChoice === "paper" && computerChoice === "rock") || 
           (userChoice === "scissors" && computerChoice === "paper") ||
           (userChoice === "rock" && computerChoice === "scissors")) {
            console.log("You win ! " + userChoiceOut + " > " + computerChoiceOut);
            userScore++;
        } else {
            console.log("You loose ... " + computerChoiceOut + " > " + userChoiceOut);
            computerScore++;
        }
    }
    printScore(userScore, computerScore);
    console.log("_".repeat(30));
    console.log(" ");
    
}


function get_formated_choice_text_for_output(choice) {
    //return choice capitalize first letter
    return choice.slice(0,1).toUpperCase() + choice.slice(1);
}


function printScore(userScore, computerScore) {
    console.log(" ".repeat(10) + "| Score |" + " ".repeat(10));
    console.log(" ".repeat(5) + "You : " + userScore + " | Computer : " + computerScore);
}
