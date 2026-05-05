let score = 0;
let gameActive = false;
let targetColor = '';
let startTime = 0;

document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-game');
    const colorDisplay = document.getElementById('color-display');
    const scoreDisplay = document.getElementById('score');
    const messageDisplay = document.getElementById('message');

    startButton.addEventListener('click', startGame);
    colorDisplay.addEventListener('click', checkClick);

    function startGame() {
        score = 0;
        scoreDisplay.textContent = 'Score: 0';
        messageDisplay.textContent = 'Preparing your session...';
        startButton.disabled = true;
        gameActive = true;

        setTimeout(() => {
            showRandomColor();
        }, 1800);
    }

    function showRandomColor() {
        if (!gameActive) return;

        const colors = ['red', 'blue', 'green', 'yellow'];
        targetColor = colors[Math.floor(Math.random() * colors.length)];
        colorDisplay.style.backgroundColor = targetColor;
        startTime = Date.now();

        messageDisplay.textContent = 'Click only when the target is green.';

        setTimeout(() => {
            if (gameActive) {
                colorDisplay.style.backgroundColor = '#e2e8f0';
                messageDisplay.textContent = 'Time elapsed. Session ended.';
                endGame();
            }
        }, 2200);
    }

    function checkClick() {
        if (!gameActive) return;

        const reactionTime = Date.now() - startTime;

        if (targetColor === 'green') {
            score += Math.max(0, 100 - Math.floor(reactionTime / 10));
            scoreDisplay.textContent = `Score: ${score}`;
            messageDisplay.textContent = `Great reaction: ${reactionTime} ms`;
            colorDisplay.style.backgroundColor = '#e2e8f0';

            setTimeout(() => {
                if (gameActive) showRandomColor();
            }, 900);
        } else {
            messageDisplay.textContent = 'Incorrect move. Wait for green only.';
            colorDisplay.style.backgroundColor = '#e2e8f0';
            setTimeout(() => {
                if (gameActive) showRandomColor();
            }, 1400);
        }
    }

    function endGame() {
        gameActive = false;
        startButton.disabled = false;
        messageDisplay.textContent = `Session completed. Final score: ${score}`;
    }
});

