// Get elements from the DOM
const basket = document.getElementById('basket');
const gift = document.getElementById('gift');
const gameArea = document.getElementById('gameArea');
const currentScoreDisplay = document.getElementById('current-score');
const highScoreDisplay = document.getElementById('high-score');
const livesDisplay = document.getElementById('lives');
const playNowButton = document.getElementById('play-now');
const gameOverScreen = document.getElementById('game-over-screen');
const playAgainButton = document.getElementById('play-again');
const backToHomeButton = document.getElementById('back-to-home');

// Game variables
let basketPosition = gameArea.offsetWidth / 2 - basket.offsetWidth / 2;
let giftPositionX = gameArea.offsetWidth / 2 - gift.offsetWidth / 2;
let giftPositionY = -50;
let gameInterval;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let lives = 3;

// Update the displayed high score
highScoreDisplay.textContent = `High Score: ${highScore}`;

// Start the game
function startGame() {
    playNowButton.style.display = 'none'; // Hide Play Now button
    gameOverScreen.style.display = 'none'; // Hide Game Over screen

    giftPositionY = -50;
    gift.style.top = giftPositionY + 'px';
    
    gameInterval = setInterval(function() {
        giftPositionY += 8; // Increased falling speed
        
        gift.style.top = giftPositionY + 'px';
        
        // If the gift hits the basket
        if (giftPositionY >= gameArea.offsetHeight - basket.offsetHeight && 
            giftPositionX + gift.offsetWidth > basketPosition && 
            giftPositionX < basketPosition + basket.offsetWidth) {
            score++;
            currentScoreDisplay.textContent = `Score: ${score}`;
            giftPositionY = -50; // Reset gift position
            giftPositionX = Math.random() * (gameArea.offsetWidth - gift.offsetWidth); // Randomize new gift position
            gift.style.left = giftPositionX + 'px';
        }
        
        // If the gift goes off-screen
        if (giftPositionY >= gameArea.offsetHeight) {
            lives--;
            livesDisplay.textContent = `Lives: ${lives}`;
            giftPositionY = -50;
            giftPositionX = Math.random() * (gameArea.offsetWidth - gift.offsetWidth);
            gift.style.left = giftPositionX + 'px';
            
            if (lives <= 0) {
                clearInterval(gameInterval);
                if (score > highScore) {
                    localStorage.setItem('highScore', score);
                    highScoreDisplay.textContent = `High Score: ${score}`;
                }
                gameOverScreen.style.display = 'block'; // Show Game Over screen
            }
        }
    }, 50); // Adjusted falling speed by reducing interval
}

// Move basket with arrow keys
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        basketPosition -= 15;
        if (basketPosition < 0) basketPosition = 0;
    } else if (event.key === 'ArrowRight') {
        basketPosition += 15;
        if (basketPosition > gameArea.offsetWidth - basket.offsetWidth) {
            basketPosition = gameArea.offsetWidth - basket.offsetWidth;
        }
    }
    basket.style.left = basketPosition + 'px';
});

// Add mobile swipe functionality
let touchStartX = 0;
gameArea.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

gameArea.addEventListener('touchmove', function(e) {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 20) {
        basketPosition -= 15;
        if (basketPosition < 0) basketPosition = 0;
    } else if (touchEndX - touchStartX > 20) {
        basketPosition += 15;
        if (basketPosition > gameArea.offsetWidth - basket.offsetWidth) {
            basketPosition = gameArea.offsetWidth - basket.offsetWidth;
        }
    }
    basket.style.left = basketPosition + 'px';
});

// Play Again button functionality
playAgainButton.addEventListener('click', function() {
    score = 0;
    lives = 3;
    currentScoreDisplay.textContent = `Score: ${score}`;
    livesDisplay.textContent = `Lives: ${lives}`;
    startGame();
});

// Back to home button functionality
backToHomeButton.addEventListener('click', function() {
    window.location.href = 'index.html'; // Change to your home page URL
});

// Play Now button functionality
playNowButton.addEventListener('click', startGame);
