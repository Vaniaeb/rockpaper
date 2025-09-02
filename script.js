const choices = document.querySelectorAll(".choice");
const resultDiv = document.getElementById("result");
const playerScoreSpan = document.getElementById("player-score");
const computerScoreSpan = document.getElementById("computer-score");
const roundsSpan = document.getElementById("rounds");
const restartBtn = document.querySelectorAll(".restart-btn");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const closeModal = document.getElementById("close-modal");
const gameTypeSelect = document.getElementById("game-type");
const roundsSelect = document.getElementById("rounds-select");
const secondPlayerLabel = document.getElementById("second-player-label");

let playerScore = 0;
let computerScore = 0;
let roundsPlayed = 0;
let maxRounds = parseInt(roundsSelect.value);
let gameType = gameTypeSelect.value;
let player1Choice = null;

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    roundsPlayed = 0;
    player1Choice = null;
    playerScoreSpan.textContent = playerScore;
    computerScoreSpan.textContent = computerScore;
    roundsSpan.textContent = roundsPlayed;
    resultDiv.textContent = "Make your move!";
}
restartBtn.addEventListener("click", resetGame);

gameTypeSelect.addEventListener("change", () => {
    gameType = gameTypeSelect.value;
    resetGame();
    if (gameType === 'cpu') {
        secondPlayerLabel.innerHTML = 'Computer: <span id= "computer-score">0</span>';
    } else {
        secondPlayerLabel.innerHTML = 'Player 2: <span id= "computer-score">0</span>';
    }
});

roundsSelect.addEventListener("change", () => {
    maxRounds = parseInt(roundsSelect.value);
    resetGame();
});

function determineWinner (choice1, choice2) {
    if (choice1 === choice2) return "draw";
    if (
        (choice1 === "rock" && choice2 === "scissors") ||
        (choice1 === "paper" && choice2 === "rock") ||
        (choice1 === "scissors" && choice2 === "paper")
    ) {
        return "p1";
    }
    return "p2";
}

choices.forEach(choice => {
    choice.addEventListener("click", () => {
        const playerChoice = choice.dataSet.choice;

        if (gameType === "cpu") {
            const options = ["rock", "paper", "scissors"];
            const computerChoice = options[Math.floor(Math.random() * 3)];
            playRound(playerChoice, computerChoice);
        } else {
            if (!player1Choice) {
                player1Choice = playerChoice;
                resultDiv.textContent = "Player 2, make your move!";
            } else {
                playRound(player1Choice, playerChoice);
                player1Choice = null;
            }
        }
    });
});

function playRound(choice1, choice2) {
    const winner = determineWinner(choice1, choice2);
    roundsPlayed++;
    if (winner === "p1") {
        playerScore++;
        resultDiv.textContent = `Player 1 wins! (${choice1} beats ${choice2})`; 
    } else if (winner === "p2") {
        computerScore++;
        resultDiv.textContent = gameType === "cpu" 
        ? `Computer Wins! (${choice2} beats ${choice1})`
        : `Player 2 Wins! (${choice2} beats ${choice1})`;
    } else {
        resultDiv.textContent = `It's a draw! (both chose ${choice1})`;
    }
    playerScoreSpan.textContent = playerScore;
    computerScoreSpan.textContent = computerScore;
    roundsSpan.textContent = roundsPlayed;

    if (playerScore > maxRounds / 2 || computerScore > maxRounds /2) {
        showModal();
    }
}

function showModal() {
    let message;
    if (playerScore > computerScore) {
        message = gameType === "cpu"
        ? "You are a Champion"
        : "Player 1 wins the match!";
    } else if (computerScore > playerScore) {
        message = gameType === "cpu"
        ? "Computer wins the match!"
        : "Player 2 wins the match!";
    } else {
        message = "It's a tie!";
    }
    modalMessage.textContent = message;
    modal.style.display = "block";
}
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    resetGame();
});

