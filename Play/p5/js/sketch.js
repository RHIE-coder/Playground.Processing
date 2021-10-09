/* 
    Scenes
    •  Loading / splash scene 
    •  Main menu scene 
    •  Main game scene 
    •  Leaderboard scene 

    Loops 1 / 3
    Arrays 1 / 3
    Keyboard 0 / 3
    p5.image 1 / 1
    Sprites 0 / 3
    Sounds 0 / 3
    Video 1 / 1
    Input Type 0 / 1
    Data JSON properties 0 / 3
*/

const WELCOME = 0;
const SPLASH = 1;
const LOADING = 2;
const MAIN_MENU = 3;
const PLAY = 4;
const HIGH_SCORE = 5;
const RESET = 6;

// let currentState = WELCOME;
let currentState = PLAY;
let display;
let welcomeVid;
let isWelcome;
let welcomeCount = 3;
let titleImg;
let splashCount = 10;
let isFinishSplash;
let isFinishLoading;

let effectWaiting = [];
let explosionSheet;
let explosionImages = []

let playerGroup;
let enemyGroup;

function preload() {
    titleImg = loadImage('assets/title.png');
    welcomeVid = createVideo('assets/simulation.mp4')
    welcomeVid.addCue(2, function () {
        isWelcome = true
    })
    welcomeVid.hide()
    welcomeVid.loop()
    explosionSheet = loadImage('assets/explosion.png');
}

function setup() {
    createCanvas(800, 400);
    display = new Display();
}

function draw() {
    // console.log(frameCount)
    display.default();
    switch (currentState) {
        case WELCOME:
            display.welcome();
            break;
        case SPLASH:
            display.splash();
            break;
        case LOADING:
            display.loading();
            break;
        case MAIN_MENU:
            display.mainMenu();
            break;
        case PLAY:
            display.gamePlay();
            break;
        case HIGH_SCORE:
            display.leaderBoard();
            break;
        case RESET:
            display.reset();
            break;
    }

    display.initMousePointer();

}

class Display {

    constructor() {
        this.WallThickness = 10;
        this.loadingBarSize = 0;

        const borderTop = createSprite(width / 2, 0, width, this.WallThickness * 2)
        const borderBottom = createSprite(width / 2, height, width, this.WallThickness * 2)
        const borderLeft = createSprite(0, height / 2, this.WallThickness * 2, height)
        const borderRight = createSprite(width, height / 2, this.WallThickness * 2, height)
        const borders = [borderTop, borderBottom, borderLeft, borderRight]
        this.wall = new Group()
        for (let i = 0; i < borders.length; i++) {
            borders[i].shapeColor = color(150, 150, 150);
            borders[i].immovable = true;
            this.wall.add(borders[i])
        }

        this.menuBtn = []
        this.menu = new Group()
        let distance = 110;
        for (let i = 0; i < 3; i++) {
            this.menuBtn.push(createSprite(width / 2, height / 2 - distance, 180, 70));
            this.menuBtn[i].shapeColor = color(192, 192, 192);
            this.menu.add(this.menuBtn[i]);
            distance -= 110;
        }
        this.menuIndex = 0;
        this.isMenuSelected = false;

        explosionSheet.loadPixels();

        explosionImages.push(explosionSheet.get(1, 1, 89, 89));
        explosionImages.push(explosionSheet.get(93, 1, 89, 89));
        explosionImages.push(explosionSheet.get(185, 1, 89, 89));
        explosionImages.push(explosionSheet.get(277, 1, 89, 89));
        explosionImages.push(explosionSheet.get(369, 1, 89, 89));

        explosionImages.push(explosionSheet.get(1, 93, 89, 89));
        explosionImages.push(explosionSheet.get(93, 93, 89, 89));
        explosionImages.push(explosionSheet.get(185, 93, 89, 89));
        explosionImages.push(explosionSheet.get(277, 93, 89, 89));
        explosionImages.push(explosionSheet.get(369, 93, 89, 89));


        this.gameStatus={
            score : 0,
            stage : 0,
            alivedbuilding : [0, 0, 0, 0, 0, 0],
            alivedAntiMissile : [0, 0, 0],
            restOfMissile: [0, 0, 0],
            isFail: false,
            isPass: false,
        }

        playerGroup = new Group()
        enemyGroup = new Group()
    }

    welcome() {
        image(welcomeVid, 0, 0, 800, 400)

        if (isWelcome) {
            textAlign(CENTER, CENTER);
            textSize(40);
            fill('white')
            text('SeongYeon Yoo', width / 2, height / 2)
            if (frameCount == 500) {
                currentState = SPLASH
            }
        }

        let showText = welcomeCount;
        if (welcomeCount < 0) {
            showText = "CLICK TO SKIP"
        } else if (frameCount % 60 == 0) {
            welcomeCount -= 1
        }

        textAlign(CENTER, CENTER)
        textSize(100);
        fill('white')
        text(showText, width / 2, 350)
    }

    splash() {
        if (!isFinishSplash && frameCount % 20 == 0) {
            effectWaiting.push(new Splash(random(100, 700), random(50, 300), 2));
            splashCount -= 1
            if (splashCount == 0) {
                isFinishSplash = true;
                frameCount = 0;
            }
            return
        }
        //delay
        if (isFinishSplash) {
            if (frameCount % 60 == 0) {
                currentState = LOADING
            }
        }
    }

    loading() {
        if (this.loadingBarSize > width) {
            image(titleImg, this.WallThickness, this.WallThickness, width-(this.WallThickness*2), 300)
            textAlign(CENTER, CENTER)
            textSize(40);
            fill('black')
            text('Click To Start', width / 2, 350);
            isFinishLoading = true;

        } else {
            const loadingBar = createSprite(width / 2, 300, this.loadingBarSize, 50)
            drawSprite(loadingBar)
            this.loadingBarSize += 10
        }
    }

    mainMenu() {
        drawSprites(this.menu)
        fill('black');

        const menuText = ["START", "BOARD", "RESET"]

        for (let i = 0; i < this.menuBtn.length; i++) {
            textSize(16);
            textStyle(BOLD);
            textAlign(CENTER);
            text(menuText[i], this.menuBtn[i].position.x, this.menuBtn[i].position.y);
        }


        if(!this.isMenuSelected){
            const xPosition = this.menuBtn[this.menuIndex].position.x - 150
            const yPosition = this.menuBtn[this.menuIndex].position.y
    
            ellipse(xPosition, yPosition, 30, 30);
            frameCount = 0;
        }else{
            this.menu.bounce(this.wall)
            this.menu.bounce(this.menu)

            if(frameCount % 180 == 0){
                currentState = this.selectd
            }

        }
        
    }

    changeMenuPointing(toWhere) {
        if (toWhere == UP_ARROW) {
            this.menuIndex -= 1
        } else if (toWhere == DOWN_ARROW) {
            this.menuIndex += 1
        }

        if (this.menuIndex < 0) {
            this.menuIndex = 2
        } else if (this.menuIndex > 2) {
            this.menuIndex = 0
        }
    }

    menuSelect() {
        // this.menuBtn[i].setSpeed(4, random(-150, 150));
        // this.menu.bounce(this.menu)
        // this.menu.bounce(this.wall)
        let speed = 20
        this.isMenuSelected = true
        if (this.menuIndex == 0) {
            this.menuBtn[0].immovable = true;
            this.menuBtn[0].shapeColor = color(255);
            this.menuBtn[1].setSpeed(speed, 0);
            this.menuBtn[2].setSpeed(speed, 0);
            this.selectd = PLAY
        } else if (this.menuIndex == 1) {
            this.menuBtn[0].setSpeed(speed, 0);
            this.menuBtn[1].immovable = true;
            this.menuBtn[1].shapeColor = color(255);
            this.menuBtn[2].setSpeed(speed, 0);
            this.selectd = HIGH_SCORE
        } else if (this.menuIndex == 2) {
            this.menuBtn[0].setSpeed(speed, 0);
            this.menuBtn[1].setSpeed(speed, 0);
            this.menuBtn[2].immovable = true;
            this.menuBtn[2].shapeColor = color(255);
            this.selectd = RESET
        }
    }


    gamePlay() {
        playerGroup.overlap(enemyGroup, function(player,enemy){
            console.log(player)
            enemy.shapeColor = color('blue');
            
        })

        if(frameCount % 180 == 0){
            enemyGroup.add(this.enemyMissileShoot())
        }
        
    }

    playerMissileShoot(){
        let stage = 1
        let speed = 1
        let alive = 1
        let bombSize = 50
        const missile = new Missile(mouseX, mouseY, width/2, height/2)
        const playerThing = missile.player(stage, speed, alive, bombSize);
        effectWaiting.push(missile)
        return playerThing;
    }

    enemyMissileShoot(){
        let stage = 1
        const missile = new Missile(random(0, width), height - 20, random(0, width), 0)
        const enemyThing = missile.enemy(stage);
        effectWaiting.push(missile)
        return enemyThing
    }

    mouseClickEvent(){
        playerGroup.add(this.playerMissileShoot());
    }

    leaderBoard(){
        background('blue');
    }

    reset(){
        isWelcome = false;
        welcomeCount = 3
        isFinishSplash = false;
        splashCount = 10
        isFinishLoading = false;
        this.loadingBarSize = 0;

        this.menuBtn = []
        this.menu = new Group()
        let distance = 110;
        for (let i = 0; i < 3; i++) {
            this.menuBtn.push(createSprite(width / 2, height / 2 - distance, 180, 70));
            this.menuBtn[i].shapeColor = color(192, 192, 192);
            this.menu.add(this.menuBtn[i]);
            distance -= 110;
        }
        this.menuIndex = 0;
        this.isMenuSelected = false;

        welcomeVid = createVideo('assets/simulation.mp4')
        welcomeVid.addCue(2, function () {
            isWelcome = true
        })
        welcomeVid.hide()
        welcomeVid.loop()

        currentState = WELCOME;
        frameCount = 0;
    }

    default() {
        if (currentState == SPLASH) {
            background(111, 109, 81);
        }else if(currentState == PLAY){
            background(0);
        } else {
            background(255);
        }

        drawSprites(this.wall);
        noStroke();

        effectWaiting.forEach(effect => {
            effect.draw();
            effect.update();
        });

        effectWaiting = effectWaiting.filter(effect => !effect.isOver());
    }

    initMousePointer() {
        if (mouseIsPressed) {
            fill(color('red'));
            ellipse(mouseX, mouseY, 15, 15);
        } else {
            fill(color('black'));
            ellipse(mouseX, mouseY, 5, 5);
        }
    }
}

class Missile{
    constructor(xTarget, yTarget, xFrom, yFrom) {
        this.xTarget = xTarget
        this.yTarget = yTarget
        this.xFrom = xFrom
        this.yFrom = yFrom
        this.isEnemy = false;
        this.isArrivedAtTarget = false;
    }

    player(stage, speed, alive, bombSize){
        this.stage = stage
        this.speed = speed;
        this.alive = alive;
        this.bombSize = bombSize;

        this.missile = createSprite(this.xFrom, this.yFrom, 5, 5)
        this.missile.shapeColor = color('white')
        this.bomb = createSprite(this.xTarget, this.yTarget, this.bombSize, this.bombSize)
        this.bomb.shapeColor = color('yellow')

        return this.bomb;
    }


    enemy(stage){
        this.isEnemy = true
        this.stage = stage
        this.missile = createSprite(this.xFrom, this.yFrom, 10, 10)
        this.missile.shapeColor = color('red')

        return this.missile;
    }

    draw() {
        if(!this.isEnemy){
            this.playerDraw()
        }else{
            this.enemyDraw();
        }
    }

    playerDraw(){
        if(!this.isArrivedAtTarget){
            drawSprite(this.missile);
            this.missile.setSpeed(this.speed)
            this.missile.attractionPoint(1, this.xTarget, this.yTarget)
            let that = this;
            this.missile.overlap(this.bomb, function(){
                that.isArrivedAtTarget = true
            });
        }else{
            drawSprite(this.bomb)
        }
    }

    enemyDraw(){
        drawSprite(this.missile);
        this.missile.setSpeed(this.stage)
        this.missile.attractionPoint(1, this.xTarget, this.yTarget);
    }

    update() {
        if(!this.isEnemy){
            this.playerUpdate()
        }else{

        }
    }

    playerUpdate(){
        if(this.isArrivedAtTarget){
            this.alive -= (this.stage*0.01);
        }
    }

    enemyUpdate(){

    }

    isOver() {
        if(!this.isEnemy){
            return this.playerOver();
        }else{
            return this.enemyOver();
        }
    }

    playerOver(){
        if(this.alive < 0){
            playerGroup.remove(this.bomb)
            return true;
        }else{
            return false;
        }
    }

    enemyOver(){
        if(this.missile.position.y >= 350){
            enemyGroup.remove(this.missile)
            return true;
        }else{
            return false;
        }
    }

}

class Splash {
    constructor(x, y, speed) {
        this.sprites = explosionImages;
        //console.log(x, y)
        this.x = x - this.sprites[0].width / 2;
        this.y = y - this.sprites[0].height / 2;
        //console.log(`this.x : ${this.x}, this.y : ${this.y}, ${this.sprites.length}`)
        this.speed = speed;
        this.index = 0.0;
    }

    draw() {
        // image(this.sprites[floor(this.index) % this.sprites.length], this.x, this.y);
        image(this.sprites[floor(this.index)], this.x, this.y);
        // console.log(floor(this.index) % this.sprites.length)
        // console.log(floor(this.index))
    }

    update() {
        this.index += this.speed;
    }

    // reset() {
    //     this.index = 0.0;
    // }

    isOver() {
        return this.index >= this.sprites.length;
    }
}

/* Reference : https://editor.p5js.org/silveira/sketches/aDR5OMdG1
let spriteSheet;
let explosionImages = [];
let explosions = [];

class Explosion {
  constructor(x, y, speed){
    this.sprites = explosionImages;   
    //console.log(x, y)
    this.x = x - this.sprites[0].width/2;
    this.y = y - this.sprites[0].height/2;
    //console.log(`this.x : ${this.x}, this.y : ${this.y}, ${this.sprites.length}`)
    this.speed = speed;
    this.index = 0.0;
  }
  
  draw() {
    // image(this.sprites[floor(this.index) % this.sprites.length], this.x, this.y);
        image(this.sprites[floor(this.index)], this.x, this.y);
    // console.log(floor(this.index) % this.sprites.length)
    // console.log(floor(this.index))
  }
  
  update() {
    this.index += this.speed;
  }
  
  reset() {
    this.index = 0.0;
  }
  
  isOver() {
    return this.index >= this.sprites.length;
  }
}


function preload() {
  // https://opengameart.org/content/explosion-animations
  spriteSheet = loadImage('explosion3.png');
}

function setup() {
  spriteSheet.loadPixels();
  
  explosionImages.push(spriteSheet.get(1, 1, 89, 89));
  explosionImages.push(spriteSheet.get(93, 1, 89, 89));
  explosionImages.push(spriteSheet.get(185, 1, 89, 89));
  explosionImages.push(spriteSheet.get(277, 1, 89, 89));
  explosionImages.push(spriteSheet.get(369, 1, 89, 89));
  
  explosionImages.push(spriteSheet.get(1, 93, 89, 89));
  explosionImages.push(spriteSheet.get(93, 93, 89, 89));
  explosionImages.push(spriteSheet.get(185, 93, 89, 89));
  explosionImages.push(spriteSheet.get(277, 93, 89, 89));
  explosionImages.push(spriteSheet.get(369, 93, 89, 89));
    
  createCanvas(windowWidth, windowHeight);

}

function mouseClicked(event) {
  explosions.push(new Explosion(mouseX, mouseY, 0.25));
}

function draw() {
  background(0);
  explosions.forEach(explosion => {
    explosion.draw();
    explosion.update();
  });
  
  explosions = explosions.filter( explosion => !explosion.isOver() );
}
*/

function mouseClicked() {
    if (isWelcome && welcomeCount < 0) {
        if (currentState == WELCOME) {
            currentState = SPLASH;
        } else if (currentState == LOADING && isFinishLoading) {
            currentState = MAIN_MENU;
        }
    }
}

function mousePressed() {
    if(currentState == PLAY){
        display.mouseClickEvent();
    }
}

function keyPressed() {
    if (currentState == MAIN_MENU) {
        if (keyCode == UP_ARROW) {
            display.changeMenuPointing(UP_ARROW)
        } else if (keyCode == DOWN_ARROW) {
            display.changeMenuPointing(DOWN_ARROW)
        } else if (keyCode == ENTER) {
            display.menuSelect()
        }
    }else if(currentState == PLAY){
        if (keyCode == 90) { //z
            console.log("z")
        }else if(keyCode == 88){ //x
            console.log('x')
        }else if(keyCode == 67){ //c
            console.log('c')
        }
    }
}