let playerScore = 0;
let playerWins = 0;
let computerScore = 0;
let computerWins = 0;

const playerChoiceEl = document.getElementById('player-choice');
const computerChoiceEl = document.getElementById('computer-choice');
const playerResultEl = document.getElementById('playerresult');
const computerResultEl = document.getElementById('computerresult');
const pScoreEl = document.getElementById('pscore');
const cScoreEl = document.getElementById('cscore');
const pWinEl = document.getElementById('pwins');
const cWinEl = document.getElementById('cwins');
const possibleChoices = document.querySelectorAll('button');

const choices = ['rock', 'paper', 'scissors'];

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    const playerChoice = e.target.id;
    playerChoiceEl.textContent = playerChoice.toUpperCase();

    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    computerChoiceEl.textContent = computerChoice.toUpperCase();

    // Determine winner
    if (playerChoice === computerChoice) {
        playerResultEl.textContent = 'DRAW';
        computerResultEl.textContent = 'DRAW';
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        playerScore++;
        playerResultEl.textContent = 'YOU WIN';
        computerResultEl.textContent = 'YOU LOSE';

        if (playerScore >= 5) {
            playerWins++;
            playerScore = 0;
            computerScore = 0;
        }
    } else {
        computerScore++;
        playerResultEl.textContent = 'YOU LOSE';
        computerResultEl.textContent = 'YOU WIN';

        if (computerScore >= 5) {
            computerWins++;
            playerScore = 0;
            computerScore = 0;
        }
    }

    // Update UI with actual values
    pScoreEl.textContent = playerScore;
    cScoreEl.textContent = computerScore;
    pWinEl.textContent = playerWins;
    cWinEl.textContent = computerWins;
}));