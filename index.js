let scoreEl = document.getElementById('score')
let score = 0

var hero = {
    top: 700,
    left: 550
}

var missiles = []

var enemies = [
    { left: 200, top: 100 },
    { left: 300, top: 100 },
    { left: 400, top: 100 },
    { left: 500, top: 100 },
    { left: 600, top: 100 },
    { left: 700, top: 100 },
    { left: 800, top: 100 },
    { left: 900, top: 100 },
    { left: 200, top: 175 },
    { left: 300, top: 175 },
    { left: 400, top: 175 },
    { left: 500, top: 175 },
    { left: 600, top: 175 },
    { left: 700, top: 175 },
    { left: 800, top: 175 },
    { left: 900, top: 175 }
];


document.onkeydown = (e) => {
    // console.log(e)
    if(e.key == 'ArrowLeft'){
        console.log('left')
        hero.left = hero.left - 20
        moveHero()
    }else if(e.key == 'ArrowRight'){
        console.log('right')
        hero.left = hero.left + 20
        moveHero()
    }else if(e.key == ' '){
        console.log('FIRE')
        missiles.push({
            left: hero.left + 15,
            top:hero.top - 100
        })
        drawMissiles()
    }
    // else if(e.key == 'ArrowUp'){
    //     console.log('up')
    // }else if(e.key == 'ArrowDown'){
    //     console.log('down')
    // }
}

function moveHero(){
    document.getElementById('hero').style.left = hero.left + "px"
}

function drawMissiles(){
    
    document.getElementById('missiles').innerHTML = ''
    for(var missile = 0; missile < missiles.length ; missile++){
        
        document.getElementById('missiles').innerHTML += 
        `<div class="missile" style="left:${missiles[missile].left}px; 
        top:${missiles[missile].top}px;"></div>`
       
    }
}

function moveMissiles(){
    for(var missile = 0; missile < missiles.length ; missile++){
        if(missiles[missile].top < 100){
            missiles.splice(missile,1)
        }
        missiles[missile].top = missiles[missile].top - 5
    }
}

function drawEnemies(){
    document.getElementById('enemies').innerHTML = ''
    for(var enemy = 0; enemy < enemies.length ; enemy++){
        
        document.getElementById('enemies').innerHTML += 
        `<div class="enemy" style="left:${enemies[enemy].left}px; 
        top:${enemies[enemy].top}px;"></div>` 
       
    }
}

function moveEnemies(){
    for(var enemy = 0; enemy < enemies.length ; enemy++){
        if(enemies[enemy].top >= 650){
            enemies.splice(enemy,1)
        }
        enemies[enemy].top = enemies[enemy].top + 3
    }
}

// .splice means remove an element from the array

function collisonDetection(){
    for(var enemy = 0; enemy < enemies.length ; enemy++){
        for(var missile = 0; missile < missiles.length ; missile++){
            if(
                (missiles[missile].top <= enemies[enemy].top + 50) &&
                (missiles[missile].top > enemies[enemy].top) &&
                (missiles[missile].left >= enemies[enemy].left) &&
                (missiles[missile].left <= enemies[enemy].left + 50)
              ){
                score = score + 10
                enemies.splice(enemy,1)
                missiles.splice(missile,1)
            }
        }
    }
    
}

function gameLoop(){
    setTimeout(gameLoop,50)//this will itself everysecond
    // console.log('Game Loop')
    moveMissiles()
    drawMissiles()
    drawEnemies()
    moveEnemies()
    collisonDetection()
    renderScore()
}

gameLoop()

function renderScore(){
    scoreEl.textContent = `HITS :${score}`
    if(score == 160){
        scoreEl.textContent = `You're a Champion`
    }
}
