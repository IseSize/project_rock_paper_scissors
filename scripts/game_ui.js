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
const versusMenu = document.querySelector("#versusMenu");
const vsBar = document.querySelector("#vsBar");
const userCharacter = document.querySelector("#userCharacter");
const computerCharacter = document.querySelector("#computerCharacter");

const winUserCharacter = document.querySelector("#winUserCharacter");
const winComputerCharacter = document.querySelector("#winComputerCharacter");
const loseUserCharacter = document.querySelector("#loseUserCharacter");
const loseComputerCharacter = document.querySelector("#loseComputerCharacter");
const drawUserCharacter = document.querySelector("#drawUserCharacter");
const drawComputerCharacter = document.querySelector("#drawComputerCharacter");

const winMenu = document.querySelector("#win");
const loseMenu = document.querySelector("#lose");
const drawMenu = document.querySelector("#draw");

const finalMenu = document.querySelector("#finalMenu");
const userFinalScore = document.querySelector("#userFinalScore");
const computerFinalScore = document.querySelector("#computerFinalScore");
const finalIcone = document.querySelector("#finalIcone");
const finalText = document.querySelector("#finalText");
const replayButton = document.querySelector("#replayButton");

var userScore = 0;
var computerScore = 0;
var rounds = 0;
var actualRound = 1;
var roundState = "";
var computerChoice = "";
var userChoice ="";

playButton.addEventListener("mouseover", () => {
    playButton.style.top = "-10px";
    playButton.style.cursor = "pointer";
    playText.style.color = "#3A2C22";
});
playButton.addEventListener("mouseout", () => {
    playButton.style.top = "0px";
    playText.style.color = "#684F3A";
});

playButton.addEventListener("click", (e) => {
    game("init");
    e.stopPropagation();
});

characterSelection.forEach((elem) => {
    elem.addEventListener("click", (e) => {
        userChoice = elem.id;
        computerChoice = getComputerChoice();
        game("versusScreen",selectMenu);
        e.stopPropagation();
    });
});

replayButton.addEventListener("click", (e) => {
    game("restart", finalMenu);
    e.stopPropagation();
});

function game(gameState, previousMenu) {
    switch(gameState) {
        case "restart":
            hideMenu(previousMenu);
            showMenu(mainMenu);
            break;
        case "init":
            startGame();
            game("selectChar", mainMenu);
            break;
        case "selectChar":
            hideMenu(previousMenu);
            showSelectMenu(actualRound, rounds, userScore, computerScore);
            break;
        case "versusScreen":
            hideMenu(previousMenu);
            showMenu(versusMenu);
            playRound(userChoice, computerChoice);
            actualRound++;
            waitOrClic("resultScreen", versusMenu, 2000);
            break;
        case "resultScreen":
            hideMenu(previousMenu);
            let menuToHide;
            switch(roundState) {
                case "win":
                    showMenu(winMenu); 
                    menuToHide = winMenu;
                    break;
                case "lose":
                    showMenu(loseMenu); 
                    menuToHide = loseMenu;
                    break;
                case "draw":
                    showMenu(drawMenu); 
                    menuToHide = drawMenu;
                    break;
            }

            if(actualRound <= rounds) {
                waitOrClic("selectChar", menuToHide, 2000);
            } else {
                waitOrClic("finalScreen", menuToHide, 2000);
            }
            break;
        case "finalScreen":
            hideMenu(previousMenu);
            showMenu(finalMenu);
            userFinalScore.textContent = userScore;
            computerFinalScore.textContent = computerScore;
            if(userScore > computerScore) {
                finalIcone.setAttribute("src", "assets/images/ui/trophy.svg");
                finalText.textContent = "You win !";
                finalText.style.color = "#F2CF66";
            } else if(userScore < computerScore) {
                finalIcone.setAttribute("src", "assets/images/character/"+userChoice+"Lose.svg");
                finalText.textContent = "You lose ...";
            } else {
                finalIcone.setAttribute("src", "assets/images/ui/whiteFlag.svg");
                finalText.textContent = "Draw !";
            }
            break;
    }
}
function startGame() {
    userScore = 0;
    computerScore = 0;
    rounds = parseInt(roundSelection.value);
    actualRound = 1;   
}

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
    
    computerCharacter.setAttribute("src", "assets/images/character/"+computerChoice+".svg");
    userCharacter.setAttribute("src", "assets/images/character/"+userChoice+".svg");

    if (userChoice === computerChoice) {
        drawUserCharacter.setAttribute("src", "assets/images/character/"+userChoice+".svg");
        drawComputerCharacter.setAttribute("src", "assets/images/character/"+computerChoice+".svg");
        roundState = "draw";
        
    } else {
        if((userChoice === "paper" && computerChoice === "rock") || 
           (userChoice === "scissors" && computerChoice === "paper") ||
           (userChoice === "rock" && computerChoice === "scissors")) {
            winUserCharacter.setAttribute("src", "assets/images/character/"+userChoice+".svg");
            winComputerCharacter.setAttribute("src", "assets/images/character/"+computerChoice+"Lose.svg");
            userScore++;
            roundState = "win";
        } else {
            loseUserCharacter.setAttribute("src", "assets/images/character/"+userChoice+"Lose.svg");
            loseComputerCharacter.setAttribute("src", "assets/images/character/"+computerChoice+".svg");
            computerScore++;
            roundState = "lose";
        }
    }    
}

function hideMenu(menu) {
    if(menu !== undefined) {
        menu.style.display = "none";
    }
}
function showMenu(menu) {
    if(menu !== undefined) {
        menu.style.display = "block";
    }
}

function showSelectMenu(actualRound, round, userScore, computerScore) {
    selectMenu.style.display = "block";
    actualRoundText.textContent = actualRound;
    numberRoundText.textContent = round;
    userScoreText.textContent = userScore;
    computerScoreText.textContent = computerScore;
}

function waitOrClic(nextGameState, actualMenu, timeInMs) {
    let timeOutId;
    function clickToPass() {
        clearTimeout(timeOutId);
        document.removeEventListener('click', clickToPass);
        game(nextGameState, actualMenu);
    }
    document.addEventListener("click", clickToPass);

    timeOutId = setTimeout(() => {
            game(nextGameState, actualMenu);
            document.removeEventListener('click', clickToPass);
        }, timeInMs);
}

