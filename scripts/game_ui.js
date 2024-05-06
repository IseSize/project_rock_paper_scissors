// WELCOME

const divGame = document.querySelector("#game");
const playButton = document.querySelector("#playButton");
const playText = document.querySelector("#playText");
const mainMenu = document.querySelector("#mainMenu");


const selectMenu = document.querySelector("#selectMenu");

const roundSelection = document.querySelector("#selectRound");
const actualRoundText = document.querySelector("#actualRound");
const numberRoundText = document.querySelector("#numberRound");
const userScoreText = document.querySelector("#userScore");
const computerScoreText = document.querySelector("#computerScore");
const characterSelection = document.querySelectorAll(".character");
const versus = document.querySelector("#versus");
const userCharacter = document.querySelector("#userCharacter");
const computerCharacter = document.querySelector("#computerCharacter");

var userScore = 0;
var computerScore = 0;
var rounds = 0;
var actualRound = 1;
var gameState = false;
var computerChoice = "";
playButton.addEventListener("mouseover", () => {
    playButton.style.top = "-10px";
    playButton.style.cursor = "pointer";
    playText.style.color = "#3A2C22";
    console.log('hover');
});
playButton.addEventListener("mouseout", () => {
    playButton.style.top = "0px";
    playText.style.color = "#684F3A";
    console.log('hover');
});

playButton.addEventListener("click", () => {
    startGame();
});

characterSelection.forEach((elem) => {
    elem.addEventListener("click", () => {
        userChoice = elem.id;
        computerChoice = getComputerChoice();
        playRound(userChoice, computerChoice);
    });
});


function startGame() {
    userScore = 0;
    computerScore = 0;
    rounds = parseInt(roundSelection.value);
    actualRound = 1;
    hideMainMenu();
    showSelectMenu(actualRound, rounds, userScore, computerScore);
    //     console.log("End !");
    // // PRINT SCORE
    //     console.log("Final score :");
    //     printScore(userScore, computerScore);
    //     if (userScore == computerScore) {
    //         console.log("Oh ! It's a Draw. ");
    //     } else if (userScore > computerScore) {
    //         console.log("You win ! Congrats !");
    //     } else {
    //         console.log("You lose... Maybe next time ?");
    //     }
    //     console.log(" ".repeat(20));
    // // REPLAY OR QUIT
    //     let replay = prompt("Do you want to play again ? YES / NO").trim().toLowerCase();
    //     if(replay === "no") {
    //         break;
    //     }
    
    console.log(" ".repeat(20));
    console.log("Thanks for playing ! See you. ")
    
    ////////////////////////////////////////////////
}

// let userGameStart = parseInt(prompt("Enter 1 to play."));
// let gameState = userGameStart == 1 ? true : false;

///////////GAME LOOP/////////////////////////////



function getComputerChoice() {
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



function playRound(userChoice, computerChoice) {
    /* Play a round :
    Get user choice, Get computer choice
    Compare user & computer choice and update score
    Print result & score */

    //Compare situation, determine winner, set score and print formatted text
    hideSelectMenu();
    showVersusMenu();
    computerCharacter.setAttribute("src", "assets/images/character/"+computerChoice+".svg");
    userCharacter.setAttribute("src", "assets/images/character/"+userChoice+".svg");
    if (userChoice === computerChoice) {
        console.log("It's a draw!");
    } else {
        if((userChoice === "paper" && computerChoice === "rock") || 
           (userChoice === "scissors" && computerChoice === "paper") ||
           (userChoice === "rock" && computerChoice === "scissors")) {
            console.log("You win !");
            userScore++;
        } else {
            console.log("You loose ... ");
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

function showSelectMenu(actualRound, round, userScore, computerScore) {
    selectMenu.style.display = "block";
    actualRoundText.textContent = actualRound;
    numberRoundText.textContent = round;
    userScoreText.textContent = userScore;
    computerScoreText.textContent = computerScore;
}
function hideMainMenu() {
    mainMenu.style.display = "none";
}
function hideSelectMenu() {
    selectMenu.style.display = "none"
}
function showVersusMenu() {
    versus.style.display="block";
}