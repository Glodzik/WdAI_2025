const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 336
canvas.height = 597

const gravity = 0.4
const jumpVelocity = -9
const playerPositionX = canvas.width/8
const playerPositionY = canvas.height/2
const baseHeight = 60

const difficultyEasy = true

let score = 0
let bestScores = JSON.parse(localStorage.getItem('bestScores')) || []
let gameState = 'start'
let pipes = []
let frameCount = 0
let waitGameOver = 0

const sounds = {
    // wing - w funkcji jump (aby otwarzać kilka jednocześnie)
    point: new Audio('./assets/Sound\ Effects/point.wav'),
    hit: new Audio('./assets/Sound\ Effects/hit.wav'),
    die: new Audio('./assets/Sound\ Effects/die.wav'),
    swoosh: new Audio('./assets/Sound\ Effects/swoosh.wav')
}

class Sprite {
    constructor({position, imageSrc}) {
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
    }

    draw() {
        if(!this.image) return
        c.drawImage(this.image, this.position.x, this.position.y)
    }

    update() {
        this.draw()
    }
}

class Player {
    constructor(position) {
        this.position = position
        this.velocity = {
            x: 0,
            y: 1,
        }
        
        this.width = 34
        this.height = 24
        this.rotation = 0

        this.flyFrame = 0

        this.sprites = {
            up: new Image(),
            mid: new Image(),
            down: new Image()
        }

        this.sprites.up.src = './assets/Flappy Bird/yellowbird-upflap.png'
        this.sprites.mid.src = './assets/Flappy Bird/yellowbird-midflap.png'
        this.sprites.down.src = './assets/Flappy Bird/yellowbird-downflap.png'

        this.image = this.sprites.mid
    }

    draw() {
        c.save()
        c.translate(this.position.x + this.width/2, this.position.y + this.height/2)
        c.rotate(this.rotation)
        c.drawImage(this.image, -this.width/2, -this.height/2, this.width, this.height)
        c.restore()
    }

    update() {
        // Grawitacja
        this.draw()
        this.position.y += this.velocity.y
        if(this.position.y < -5) this.velocity.y = gravity
        else if (this.position.y + this.height + this.velocity.y < canvas.height - baseHeight) 
            this.velocity.y += gravity
        else this.velocity.y = 0

        // Animacja lotu
        if (this.flyFrame >= 60) this.flyFrame = 0
            switch(this.flyFrame) {
                case 0: 
                    this.image = this.sprites.up; 
                    break
                case 20: 
                    this.image = this.sprites.mid; 
                    break
                case 40: 
                    this.image = this.sprites.down; 
                    break
            }

            this.flyFrame += 1
        
        // Rotacja
        if (this.rotation < Math.PI/2 && this.velocity.y > 0) this.rotation += 0.07

        if(gameState == 'gameOver') {
            this.flyFrame = 20
        }

        if(gameState == 'start') {
            this.position.y = playerPositionY
        }

    }

    jump() {
        this.velocity.y = jumpVelocity
        this.rotation = -0.3
        const wing = new Audio('./assets/Sound\ Effects/wing.wav')
        wing.play()
    }
}

class Pipe {
    constructor({position, gap}) {
        this.position = position
        this.width = 52
        this.height = 320
        this.gap = gap
        
        this.topPipe = new Image()
        this.topPipe.src = './assets/Flappy Bird/pipe-green.png'
        
        this.bottomPipe = new Image()
        this.bottomPipe.src = './assets/Flappy Bird/pipe-green.png'
        
        this.passed = false
    }

    draw() {        
        c.save()
        c.translate(this.position.x + this.width/2, this.position.y + this.height/2)
        c.rotate(Math.PI)
        c.drawImage(this.topPipe, -this.width/2, -this.height/2, this.width, this.height)
        c.restore()

        const bottomPipeY = this.position.y + this.height + this.gap
        c.drawImage(this.bottomPipe, this.position.x, bottomPipeY, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.x -= 2
    }
}

class NumberDisplay {
    constructor() {
        this.numbers = []
        for (let i = 0; i <= 9; i++) {
            const num = new Image()
            num.src = `./assets/UI/Numbers/${i}.png`
            this.numbers.push(num)
        }
        this.position = { x: canvas.width - 50, y: 20 }
        this.numberWidth = 20
        this.numberHeight = 30
    }

    draw(score) {
        const scoreStr = score.toString()
        const totalWidth = scoreStr.length * this.numberWidth
        
        let x = this.position.x - totalWidth + this.numberWidth
        
        for (let i = 0; i < scoreStr.length; i++) {
            const digit = parseInt(scoreStr[i])
            c.drawImage(this.numbers[digit], x, this.position.y, this.numberWidth, this.numberHeight)
            x += this.numberWidth
        }
    }

    drawScores(score, bestScore) {
        const startX = 120
        const startY = canvas.height / 3
        
        c.font = '30px "Flappy Bird Font"' // Nazwa twojej czcionki
        c.fillStyle = 'white'
        c.textAlign = 'center'

        c.fillText("score:", startX, startY + 27)

        const scoreStr = score.toString()
        const scoreWidth = scoreStr.length * this.numberWidth
        let scoreX = canvas.width - scoreWidth - 10
        for (let i = 0; i < scoreStr.length; i++) {
            const digit = parseInt(scoreStr[i])
            c.drawImage(this.numbers[digit], scoreX, startY, this.numberWidth, this.numberHeight)
            scoreX += this.numberWidth
        }
        
        c.fillText("best score:", startX, startY + 67)

        const bestStr = bestScore.toString()
        const bestWidth = bestStr.length * this.numberWidth
        let bestX = canvas.width - bestWidth - 10    
        for (let i = 0; i < bestStr.length; i++) {
            const digit = parseInt(bestStr[i])
            c.drawImage(this.numbers[digit], bestX, startY + 40, this.numberWidth, this.numberHeight)
            bestX += this.numberWidth
        }

        c.font = '20px "Flappy Bird Font"'
        c.fillText(">> play again <<", canvas.width/2, startY + 147)
    }
}

function generatePipes() {
    frameCount++
    if (frameCount % 120 === 0) {
        if(difficultyEasy) pipeGap = 150 + Math.random() * 50
        else pipeGap = 140 + Math.random() * 20
        pipePosition = -Math.random() * ((canvas.height - baseHeight)/2 - 30)
        
        pipes.push(new Pipe({
            position: {x: canvas.width, y: pipePosition},
            gap: pipeGap
        }))
    }
}

function checkCollisions(player) {
    if (player.position.y <= 0) {
        sounds.hit.currentTime = 0.05
        sounds.hit.play()
        sounds.die.currentTime = 0
        sounds.die.play()
        return true
    }
        
    if (player.position.y + player.height >= canvas.height - baseHeight - 2) {
        sounds.hit.currentTime = 0.08
        sounds.hit.play()
        return true
    }
    
    for (let pipe of pipes) {
        if ( player.position.x < pipe.position.x + pipe.width && player.position.x + player.width > pipe.position.x 
            && (player.position.y < pipe.position.y + pipe.height || player.position.y + player.height > pipe.position.y + pipe.height + pipe.gap)) {
                sounds.hit.currentTime = 0.05
                sounds.hit.play()
                sounds.die.currentTime = 0
                sounds.die.play()
                return true
            }
        
        if (!pipe.passed && player.position.x > pipe.position.x + pipe.width) {
            pipe.passed = true
            score++
            sounds.point.currentTime = 0
            sounds.point.play()
        }
    }
    
    return false
}

function updateBestScores() {
    bestScores.push(score)
    bestScores.sort((a, b) => b - a)
    bestScores = bestScores.slice(0, 5)
    localStorage.setItem('bestScores', JSON.stringify(bestScores))
}

// Utworzenie podstawowych obiektów
const player = new Player({ x: playerPositionX, y: playerPositionY })
const background = new Sprite({
    position: {x: 0, y: 0},
    imageSrc: './assets/Flappy Bird/background-day.png'
})
const base = new Sprite({
    position: {x: 0, y:canvas.height-baseHeight},
    imageSrc: './assets/Flappy Bird/base.png'
})
const startScreen = new Sprite({
    position: {x: 0, y: 40},
    imageSrc: './assets/UI/message.png'
})
const gameOverScreen = new Sprite({
    position: {x: 0, y: canvas.height/8},
    imageSrc: './assets/UI/gameover.png'
})
const numberDisplay = new NumberDisplay()

// Główna funkcja animacji
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'Aqua'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()

    if(gameState == 'start') {
        score = 0
        waitGameOver = 0
        pipes = []
        player.position.y = playerPositionY
        startScreen.update()
    } else if (gameState === 'playing') {
        generatePipes()

        for (let pipe of pipes) {
            pipe.update()
        }

        player.update()
        
        if (checkCollisions(player)) gameState = 'gameOver'

        numberDisplay.draw(score)

    } else if (gameState == 'gameOver') {
        updateBestScores()
        gameOverScreen.update()
        player.update()
        waitGameOver += 1
        numberDisplay.drawScores(score, bestScores[0] || 0)
    }

    base.update()
}

animate()


// Kliknięcia spacji i myszy
const keys = {
    space: {
        pressed: false
    },

    mouse: {
        pressed: false
    }
}

function manageGameState() {
    if (gameState == 'start') {
        gameState = 'playing'
    } else if (gameState == 'gameOver' && waitGameOver >= 60) {
        gameState = 'start'
        sounds.swoosh.currentTime = 0.05
        sounds.swoosh.play()
    }
}

window.addEventListener('mousedown', (event) => {
    manageGameState()

    if (!keys.mouse.pressed && gameState == 'playing') {
        keys.mouse.pressed = true
        player.jump();
    }
})

window.addEventListener('mouseup', (event) => {
    if (keys.mouse.pressed) {
        keys.mouse.pressed = false
    }
})

window.addEventListener('keydown', (event) => {
    if (event.key == ' ') {
        event.preventDefault() 
        manageGameState()
    }

    if (event.key == ' ' && !keys.space.pressed && gameState == 'playing') {
        keys.space.pressed = true
        player.jump(); 
    }
})

window.addEventListener('keyup', (event) => {
    if (event.key == ' ' && keys.space.pressed) {
        keys.space.pressed  = false
    }
})
