let playerScore = 0;
let computerScore = 0;
let rounds = 0;
let bestOf = 3;
let winnerScore = 2;
let gameOver = false;
let playerMode = "computer";
let currentPlayer = 1;
let player1Choice = "";

function setBestOf(value) {
    bestOf = parseInt(value);
    winnerScore = Math.floor(bestOf / 2) + 1;
    restartGame();
}
function setPlayerMode(value) {
    playerMode = value;
    if (value === "computer") {
        document.getElementById("player1-label").innerHTML = "Player: <span id='player-score'>0</span>";
        document.getElementById("player2-label").innerHTML = "Computer: <span id='computer-score'>0</span>";
        document.getElementById("nameInputs").style.display = "none";
    } else {   
        document.getElementById("player1-label").innerHTML = "Player 1: <span id='player-score'>0</span>";
        document.getElementById("player2-label").innerHTML = "Player 2: <span id='computer-score'>0</span>";
        document.getElementById("nameInputs").style.display = "block";
    }
    restartGame();
}
function play(choice) {
    if (gameOver) return;
    if (playerMode === "computer") {
        playVsComputer(choice);
    } else {
        playTwoPlayers(choice);
    }
}
function playVsComputer(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    let result = "";

    if (playerChoice === computerChoice) {
        result = `Draw! You both chose ${playerChoice}.`;
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerScore === 'paper')
    ) {
        playerScore++;
        result = `You win! ${playerChoice} beats ${computerChoice}.`;
    } else {
        computerScore++;
        result = `You lose! ${computerChoice} beats ${playerChoice}.`;
    }
    rounds++;
    updateUI(result);
    checkWinner();
}
function playTwoPlayers(choice) {
    if (currentPlayer === 1) {
        player1Choice = choice;

        document.getElementById("result").textContent = `Player 2, make your move!`;
        currentPlayer = 2;
    } else {
        const player2Choice = choice;
        let result = "";

        if (player1Choice === player2Choice) {
            result = `Draw! You both chose ${player1Choice}.`;
        } else if (
            (player1Choice === 'rock' && player2Choice === 'scissors') ||
            (player1Choice === 'paper' && player2Choice === 'rock') ||
            (player1Choice === 'scissors' && player2Choice === 'paper')
        ) {
         playerScore++;
         result = `Player 1 wins! ${player1Choice} beats ${player2Choice}.`; 
    } else {
        computerScore++;
        result = `Player 2 wins! ${player2Choice} beats ${player1Choice}.`;
    }
    rounds++;
    updateUI(result);
    checkWinner();
    currentPlayer = 1;
  }

}
function updateUI(message) {
    document.getElementById('result').textContent = message;
    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('computer-score').textContent = computerScore;
    document.getElementById('rounds').textContent = rounds;
    }
function checkWinner() {
    if (playerScore === winnerScore) {
        showModal(playerMode === "computer" ? "🎉You are the Champion!" : "🎉Player 1 Wins!");
        // Show confetti only if player wins in PvC or PvP
        launchConfetti();
        gameOver = true;
    } else if (computerScore === winnerScore) {
        showModal(playerMode === "computer" ? "💻Computer Wins the Game!" : "🎉Player 2 Wins!");
        // Only show confetti for PvP mode when Player 2 wins
        if (playerMode !== "computer") {
            launchConfetti();
        }
        gameOver = true;
    }
}

function showModal(message) {
    document.getElementById("winnerMessage").textContent = message;
    document.getElementById("winnerModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("winnerModal").style.display = "none";
    restartGame();
}

function restartGame() {
    playerScore = 0;
    computerScore = 0;
    rounds = 0;
    gameOver = false;
    currentPlayer = 1;

    document.getElementById('result').textContent = 'Make your move!';
    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('computer-score').textContent = computerScore;
    document.getElementById('rounds').textContent = rounds;
}

function launchConfetti() {
    for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.width = "5px";
    confetti.style.height = "5px";
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.animationDuration = (Math.random() * 2 + 2) + "s";
    // confetti.style.top = "-20px";
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
    }

}