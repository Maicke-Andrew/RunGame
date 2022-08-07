let screen = document.querySelector('.screen')
let player = document.querySelector('.player');
let fire = document.querySelector('.fire');
let gameOver = document.querySelector('.gameOver');
let scoreInScreen = document.querySelector('.score');
let scoreEndGame = document.querySelector('.scoreEndGame');
let buttonRestart = document.querySelector('.button');
let bestScore = document.querySelector('.bestScore');
let toasty = document.querySelector('#toasty');
let anyKey = document.querySelector('.screen p')
let toastyAudio = new Audio('./assets/toastySound.mp3');
let upOrDown = ['80px', '0'];
let score = 0;
let toastyTime;
let fireComming;
let loop;

document.addEventListener('keyup', callStart)

function callStart() {
    startGame();
    document.removeEventListener('keyup', callStart)
}

function startGame() {
    anyKey.style.visibility = 'hidden'
    player.src = './assets/walk.gif';
    player.style.width = '100px';
    player.style.right = '';
    document.addEventListener('keyup', movement)

    function movement() {
        if (event.key === ' ' || event.key === 'ArrowUp') {
            player.src = './assets/jump.gif';
            player.style.animation = 'jumpAnimation 0.8s linear';
            setTimeout(() => {
                player.src = './assets/walk.gif';
                player.style.animation = '';
            }, 800)
        }

        if (event.key === 'ArrowDown') {
            player.src = './assets/down.gif';
            player.style.animation = 'downAnimation 0.8s linear';
            setTimeout(() => {
                player.src = './assets/walk.gif';
                player.style.animation = '';
            }, 800)
        }
    }

    fireComming = setInterval(() => {
        let randomNumber = Math.floor(Math.random() * 2);
        fire.style.animation = 'fireAnimation 1s linear';
        fire.style.bottom = upOrDown[randomNumber];
        setTimeout(() => {
            fire.style.animation = '';
        }, 1000)
    }, 1100);

    loop = setInterval(() => {
        const firePosition = fire.offsetLeft;
        const playerPosition = window.getComputedStyle(player).bottom.replace('px', '');

        if (fire.style.bottom == '0px') {
            if (firePosition <= 67 && firePosition > 0 && playerPosition < 50) {
                document.removeEventListener('keyup', movement)
                endGame();
            }
        } else {
            if (firePosition <= 40 && firePosition > 30 && playerPosition > -1) {
                document.removeEventListener('keyup', movement)
                endGame();
            }
        }

        if (gameOver.style.visibility != 'visible') {
            score++;
            scoreInScreen.innerHTML = `Score: ${score}`;
        }
    }, 10)
    
    function timeRuning() {
        setTimeout(() => {
            toasty.classList.remove('visible')
            toasty.classList.add('hidden')
            toastyAudio.pause()
        }, 900)
        let randomTime = Math.floor(Math.random() * (10000 - 1000) + 1000);
        return randomTime
    }
    
    toastyTime = setInterval(() => {
        toasty.classList.remove('hidden')
        toasty.classList.add('visible')
        toastyAudio.play()
        timeRuning();
    }, timeRuning())
}

function endGame() {
    clearInterval(fireComming);
    clearInterval(loop);
    clearInterval(toastyTime);
    gameOver.style.visibility = 'visible';
    scoreEndGame.innerHTML = score;
    setTimeout(() => {
        player.src = './assets/dead.gif';
        player.style.width = '250px';
        player.style.right = '550px';
    }, 800)

    if (score > bestScore.innerHTML) {
        bestScore.innerHTML = score;
    }
}

document.addEventListener('keyup', (e) => {
    setTimeout(() => {
        if (gameOver.style.visibility === 'visible') {
            if (e.key === 'Enter') {
                score = 0;
                gameOver.style.visibility = 'hidden';
                startGame();
            }
        }
    }, 800)
})

buttonRestart.addEventListener('click', () => {
    setTimeout(() => {
        score = 0;
        gameOver.style.visibility = 'hidden';
        startGame();
    }, 800)
})