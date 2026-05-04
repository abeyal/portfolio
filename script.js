// אין כאן קריאות ל-GitHub API.
// הקובץ הזה נשאר ריק למטרות תחזוקה בלבד.

// משחק תגובה מהירה
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
        scoreDisplay.textContent = 'ניקוד: 0';
        messageDisplay.textContent = 'הכינו את עצמכם...';
        startButton.disabled = true;
        gameActive = true;

        setTimeout(() => {
            showRandomColor();
        }, 2000);
    }

    function showRandomColor() {
        if (!gameActive) return;

        const colors = ['red', 'blue', 'green', 'yellow'];
        targetColor = colors[Math.floor(Math.random() * colors.length)];
        colorDisplay.style.backgroundColor = targetColor;
        startTime = Date.now();

        messageDisplay.textContent = 'לחץ על הכפתור הירוק!';

        setTimeout(() => {
            if (gameActive) {
                colorDisplay.style.backgroundColor = '#ccc';
                messageDisplay.textContent = 'זמן נגמר! המשחק נגמר.';
                endGame();
            }
        }, 2000);
    }

    function checkClick() {
        if (!gameActive) return;

        const clickTime = Date.now();
        const reactionTime = clickTime - startTime;

        if (targetColor === 'green') {
            score += Math.max(0, 100 - Math.floor(reactionTime / 10));
            scoreDisplay.textContent = `ניקוד: ${score}`;
            messageDisplay.textContent = `מעולה! זמן תגובה: ${reactionTime}ms`;
            colorDisplay.style.backgroundColor = '#ccc';

            setTimeout(() => {
                if (gameActive) showRandomColor();
            }, 1000);
        } else {
            messageDisplay.textContent = 'טעית! לחץ רק על הירוק.';
            colorDisplay.style.backgroundColor = '#ccc';
            setTimeout(() => {
                if (gameActive) showRandomColor();
            }, 1500);
        }
    }

    function endGame() {
        gameActive = false;
        startButton.disabled = false;
        messageDisplay.textContent = `משחק נגמר! הניקוד הסופי: ${score}`;
    }
});

