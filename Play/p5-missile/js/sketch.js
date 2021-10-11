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
const RESTART = 6;

let currentState = WELCOME;
// let currentState = PLAY;
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
let playerStatus;
let playTimeImage = [];

let upgradeMissileBtn;
let upgradeBombAliveBtn;
let upgradeBombSizeBtn;
let upgradeBtn = []
let nextStageBtn;
let clickPoint;

//store option
let upgradeMissile;
let upgradeBombAlive;
let upgradeBombSize;
let nextStage;


let buildings = []
let missileCenter = []
let buildingGroup;
let missileCenterGroup;

let isJsonLoaded;
let jsonData = {};

function preload() {
    soundFormats('mp3');
    // introSound = loadSound('assets/sound/funk');    
    bombSound = loadSound('assets/sound/collision');    
    successSound = loadSound('assets/sound/good');    

    titleImg = loadImage('assets/title.png');
    welcomeVid = createVideo('assets/simulation.mp4')
    welcomeVid.addCue(2, function () {
        isWelcome = true
    })
    welcomeVid.hide()
    welcomeVid.loop()
    explosionSheet = loadImage('assets/explosion.png');
    // for (let i = 1; i <= 21; i++) {
    //     if (i / 10 < 1) {
    //         playTimeImage.push(loadImage('assets/timer/process000' + i + '.png'))
    //     } else {
    //         playTimeImage.push(loadImage('assets/timer/process00' + i + '.png'))
    //     }
    // }
}

function setup() {
    createCanvas(800, 400);
    display = new Display();
    // introSound.play();
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
            display.game();
            break;
        case HIGH_SCORE:
            display.leaderBoard();
            break;
        case RESTART:
            display.restart();
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


        playerStatus = {
            isGameStarted: false,
            isShowStageText: false,
            score: 0,
            stage: 0,
            speed: 0,
            alive: 0,
            bombSize: 0,
            currentAntiMissile: 1,
            alivedbuilding: [0, 0, 0, 0, 0, 0],
            alivedAntiMissile: [0, 0, 0],
            restOfMissile: [0, 0, 0],
            isFail: false,
            isVictory: false,
            isStoreOpen: false,
            skillPoint: 0,
            playTime: 0
        }

        playerGroup = new Group()
        enemyGroup = new Group()

        upgradeMissileBtn = createSprite(width / 2, 100, 500, 50)
        upgradeBombAliveBtn = createSprite(width / 2, 160, 500, 50)
        upgradeBombSizeBtn = createSprite(width / 2, 220, 500, 50)

        upgradeBtn = new Group()
        upgradeBtn.add(upgradeMissileBtn)
        upgradeBtn.add(upgradeBombAliveBtn)
        upgradeBtn.add(upgradeBombSizeBtn)
        nextStageBtn = createSprite(width / 2, 350, 500, 50)
        clickPoint = createSprite(mouseX, mouseY, 10, 10)
        clickPoint.shapeColor = color('black')

        upgradeMissile = "upgrade_missile";
        upgradeBombAlive = "upgrade_bomb_alive";
        upgradeBombSize = "upgrade_bomb_size";
        nextStage = "next_stage"
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
                frameCount = 1;
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
            image(titleImg, this.WallThickness, this.WallThickness, width - (this.WallThickness * 2), 300)
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

        const menuText = ["START", "BOARD", "RESTART"]

        for (let i = 0; i < this.menuBtn.length; i++) {
            textSize(16);
            textStyle(BOLD);
            textAlign(CENTER);
            text(menuText[i], this.menuBtn[i].position.x, this.menuBtn[i].position.y);
        }


        if (!this.isMenuSelected) {
            const xPosition = this.menuBtn[this.menuIndex].position.x - 150
            const yPosition = this.menuBtn[this.menuIndex].position.y

            ellipse(xPosition, yPosition, 30, 30);
            frameCount = 1;
        } else {
            this.menu.bounce(this.wall)
            this.menu.bounce(this.menu)

            if (frameCount % 180 == 0) {
                currentState = this.selected
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
            this.selected = PLAY
            this.gameInit()
        } else if (this.menuIndex == 1) {
            this.menuBtn[0].setSpeed(speed, 0);
            this.menuBtn[1].immovable = true;
            this.menuBtn[1].shapeColor = color(255);
            this.menuBtn[2].setSpeed(speed, 0);
            this.selected = HIGH_SCORE
        } else if (this.menuIndex == 2) {
            this.menuBtn[0].setSpeed(speed, 0);
            this.menuBtn[1].setSpeed(speed, 0);
            this.menuBtn[2].immovable = true;
            this.menuBtn[2].shapeColor = color(255);
            this.selected = RESTART
        }
    }

    gameInit() {
        playerStatus.isGameStarted = false,
        playerStatus.isShowStageText = false,
        playerStatus.score = 0,
        playerStatus.stage = 1,
        // playerStatus.stage = 10,
        playerStatus.speed = 1,
        playerStatus.alive = 5,
        playerStatus.bombSize = 50,
        // playerStatus.alive = 1000,
        // playerStatus.bombSize = 500,
        playerStatus.currentAntiMissile = 1,
        playerStatus.alivedbuilding = [1, 1, 1, 1, 1, 1]
        playerStatus.alivedAntiMissile = [1, 1, 1]
        playerStatus.restOfMissile = [30, 30, 30]
        playerStatus.playTime = 21;
        // playerStatus.playTime = 10;
        playerStatus.isFail = false,
        playerStatus.isVictory = false,
        playerStatus.isStoreOpen = false;
        playerStatus.skillPoint = 0;   
    }

    build(){
        console.log("building")
        missileCenterGroup = new Group();
        missileCenter = []
        missileCenter.push(createSprite(100, 365, 50, 50))
        missileCenter.push(createSprite(400, 365, 50, 50))
        missileCenter.push(createSprite(700, 365, 50, 50))

        for(let i = 0 ; i < missileCenter.length; i++){
            missileCenter[i].shapeColor = color('white')
            missileCenterGroup.add(missileCenter[i]);
        }
        
    }

    game() {

        if (playerStatus.stage == 0) {
            this.gameInit();
        }

        if (!playerStatus.isStoreOpen && !playerStatus.isGameStarted) {
            frameCount = 1;
            this.build()
            playerStatus.isShowStageText = true;
            playerStatus.isGameStarted = true;
        }
        
        if (playerStatus.isGameStarted) {


            let check = playerStatus.alivedAntiMissile[0] +playerStatus.alivedAntiMissile[1] +playerStatus.alivedAntiMissile[2]
            if(check == 0){
                playerStatus.isFail = true;
            }

            if(playerStatus.isFail){
                console.log('game over')
                currentState = MAIN_MENU
                this.goToMenuFromGame();
            }

            fill(122, 0, 37)
            rect(this.WallThickness, this.WallThickness, width - (this.WallThickness * 2), 50)
            
            textSize(20)
            drawSprites(missileCenterGroup);
            missileCenter[0].overlap(enemyGroup, function(center, enemy){
                center.remove()
                enemy.remove()
                playerStatus.alivedAntiMissile[0] = 0
            })
            missileCenter[1].overlap(enemyGroup, function(center, enemy){
                center.remove()
                enemy.remove()
                playerStatus.alivedAntiMissile[1] = 0
            })
            missileCenter[2].overlap(enemyGroup, function(center, enemy){
                center.remove()
                enemy.remove()
                playerStatus.alivedAntiMissile[2] = 0
            })
            
            fill('white')
            text("STAGE : " + playerStatus.stage, 25, 30)
            text("SCORE : " + playerStatus.score, 25, 55)
            text("TIME LEFT : " + playerStatus.playTime, 500, 42)

            textAlign(CENTER, CENTER)
            fill('white')
            
            if(playerStatus.alivedAntiMissile[0] == 1){
                text(playerStatus.restOfMissile[0],100, 315)
            }
            if(playerStatus.alivedAntiMissile[1] == 1){
                text(playerStatus.restOfMissile[1],400, 315)
            }
            if(playerStatus.alivedAntiMissile[2] == 1){
                text(playerStatus.restOfMissile[2],700, 315)
            }
            fill('black')
            text('Z',100, 365)
            text('X',400, 365)
            text('C',700, 365)


            
            if (playerStatus.isShowStageText) {
                textSize(32)
                textAlign(CENTER, CENTER)
                fill('white')
                text("Stage " + playerStatus.stage, width / 2, height / 2)
            }
            if (playerStatus.isShowStageText && frameCount % 240 == 0) {
                playerStatus.isShowStageText = false;
            }
            if (frameCount % 60 == 0) {
                playerStatus.playTime -= 1
            }
            if (playerStatus.playTime < 0) {

                playerStatus.isGameStarted = false
                playerStatus.isStoreOpen = true                
                playerStatus.playTime = 21;
                playerStatus.skillPoint += 1;
                playerStatus.stage += 1;
                playerStatus.currentAntiMissile = 1
                playerStatus.alivedbuilding = [1, 1, 1, 1, 1, 1]
                playerStatus.alivedAntiMissile = [1, 1, 1]
                playerStatus.restOfMissile = [30, 30, 30]

                this.removeAllMissile()
            }
            this.playing();
        } else if (playerStatus.isStoreOpen) {
            this.removeAllMissile()
            //victory
            if(playerStatus.stage > 5){
                textSize(32)
                textAlign(CENTER, CENTER)
                fill('white')
                text("Congratulation", width / 2, height / 2)

                if(frameCount % 240 == 0){
                    successSound.play();
                    currentState = HIGH_SCORE
                    playerStatus.isVictory = true
                }
                
                return 
            }
            this.selected = "None"
            drawSprites(upgradeBtn);
            
            // clickPoint.position.x = mouseX
            // clickPoint.position.y = mouseY

            upgradeMissileBtn.shapeColor = color(67, 174, 171)
            upgradeBombAliveBtn.shapeColor = color(174, 27, 130)
            upgradeBombSizeBtn.shapeColor = color(23, 60, 124)
            nextStageBtn.shapeColor = color(120, 13, 41)
            textSize(20)
            textAlign(CENTER, CENTER)
            fill('white')
            text('Upgrade Missile Speed : ' + playerStatus.speed, width / 2, 100)
            text('Upgrade Bomb Alive : ' + playerStatus.alive, width / 2, 160)
            text('Upgrade Bomb Size : ' + playerStatus.bombSize, width / 2, 220)
            fill('yellow')
            text('Skill Point : ' + playerStatus.skillPoint, width / 2, 300)
            fill('white')
            if(playerStatus.skillPoint == 0 ){
                drawSprite(nextStageBtn);
                text('[Go To Next Stage]', width / 2, 350)
            }

            let that = this
            clickPoint.overlap(upgradeMissileBtn, function (pointer, btn) {
                fill('yellow')
                text('Upgrade Missile Speed : ' + playerStatus.speed, width / 2, 100)
                btn.shapeColor = color(0)
                that.selected = upgradeMissile
            });
            clickPoint.overlap(upgradeBombAliveBtn, function (pointer, btn) {
                fill('yellow')
                text('Upgrade Bomb Alive : ' + playerStatus.alive, width / 2, 160)
                btn.shapeColor = color(0)
                that.selected = upgradeBombAlive
            });
            clickPoint.overlap(upgradeBombSizeBtn, function (pointer, btn) {
                fill('yellow')
                text('Upgrade Bomb Size : ' + playerStatus.bombSize, width / 2, 220)
                btn.shapeColor = color(0)
                that.selected = upgradeBombSize
            });
            clickPoint.overlap(nextStageBtn, function (pointer, btn) {
                fill('yellow')
                text('Upgrade Bomb Size : ' + playerStatus.bombSize, width / 2, 220)
                btn.shapeColor = color(0)
                that.selected = nextStage
            });

        }
    }

    getStoreSelected() {
        return this.selected
    }

    removeAllMissile() {
        playerGroup.removeSprites()
        enemyGroup.removeSprites()
    }

    playing() {
        playerGroup.overlap(enemyGroup, function (player, enemy) {
            enemy.remove()
            bombSound.play();
            playerStatus.score += 100;
        })

        // if (frameCount % (120 - (playerStatus.stage * 10)) == 0) {
        if (frameCount % 20 == 0) {
            enemyGroup.add(this.enemyMissileShoot())
        }
    }

    playerMissileShoot() {
        let fromX;
        if (playerStatus.currentAntiMissile == 0) {
            fromX = (width / 2) - 300
        } else if (playerStatus.currentAntiMissile == 1) {
            fromX = (width / 2)
        } else if (playerStatus.currentAntiMissile == 2) {
            fromX = (width / 2) + 300
        }
        const missile = new Missile(mouseX, mouseY, fromX, 350)
        const playerThing = missile.player(
            playerStatus.stage,
            playerStatus.speed,
            playerStatus.alive,
            playerStatus.bombSize
        );
        effectWaiting.push(missile)
        return playerThing;
    }

    enemyMissileShoot() {
        const missile = new Missile(random(0, width), height - 20, random(0, width), 30)
        const enemyThing = missile.enemy(playerStatus.stage);
        effectWaiting.push(missile)
        return enemyThing
    }

    mouseClickEvent() {
        let current = playerStatus.currentAntiMissile;
        if(playerStatus.alivedAntiMissile[current] != 0){
            if(playerStatus.restOfMissile[current] > 0){
                playerGroup.add(this.playerMissileShoot())
                playerStatus.restOfMissile[current] -= 1
            }
        }
        
    }

    goToMenuFromGame() {
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
        this.removeAllMissile()
        frameCount = 1;
    }

    leaderBoard() {
        if(playerStatus.isVictory){
            let json = {}
            json.score = playerStatus.score;
            json.date = new Date();
            save(json, 'rank.json');
            playerStatus.isVictory = false
        }else{
            
            if(!isJsonLoaded){
                loadJSON('rank.json', function(data){
                    jsonData = data
                    isJsonLoaded = true
                    console.log(jsonData)
                })
            }
            textSize(32)
            textAlign(CENTER, CENTER)
            fill('blue')
            text(jsonData.date, width / 2, (height / 2) / 2)
            fill('black')
            text("BEST SCORE : " + jsonData.score, width / 2, height / 2)
            fill('red')
            text("Please Save Your Score If Success" , width / 2, (height / 2)+100)
        }
        //this.goToMenuFromGame();
    }

    restart() {
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
        frameCount = 1;
    }

    default() {
        if (currentState == SPLASH) {
            background(111, 109, 81);
        } else if (currentState == PLAY) {
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
        clickPoint.position.x = mouseX
        clickPoint.position.y = mouseY
        drawSprite(clickPoint);
        if (mouseIsPressed) {
            clickPoint.shapeColor = color('red')   
        }else{
            clickPoint.shapeColor = color('black')
        }
    }
}

class Missile {
    constructor(xTarget, yTarget, xFrom, yFrom) {
        this.xTarget = xTarget
        this.yTarget = yTarget
        this.xFrom = xFrom
        this.yFrom = yFrom
        this.isEnemy = false;
        this.isArrivedAtTarget = false;
    }

    player(stage, speed, alive, bombSize) {
        this.stage = stage
        this.speed = speed;
        this.alive = alive;
        this.bombSize = bombSize;
        this.missile = createSprite(this.xFrom, this.yFrom, 5, 5)
        this.missile.shapeColor = color('white')
        if (this.yTarget >= 350) {
            this.yTarget = 350
        }
        this.bombTrigger = createSprite(this.xTarget, this.yTarget, 5, 5)

        return this.missile;
    }


    enemy(stage) {
        this.isEnemy = true
        this.stage = stage
        this.missile = createSprite(this.xFrom, this.yFrom, 25, 25)
        this.missile.shapeColor = color('red')

        return this.missile;
    }

    draw() {
        if (!this.isEnemy) {
            this.playerDraw()
        } else {
            this.enemyDraw();
        }
    }

    playerDraw() {
        if (!this.isArrivedAtTarget) {
            drawSprite(this.missile);

            this.missile.setSpeed(this.speed)
            this.missile.attractionPoint(1, this.xTarget, this.yTarget)
            let that = this;
            this.missile.overlap(this.bombTrigger, function () {
                that.isArrivedAtTarget = true
            });
            this.missile.overlap(enemyGroup, function () {
                that.isArrivedAtTarget = true
            });
        } else {
            this.missile.setSpeed(0)
            this.missile.width = this.bombSize
            this.missile.height = this.bombSize
            this.missile.shapeColor = color('yellow')
            drawSprite(this.missile)
        }
    }

    enemyDraw() {
        this.missile.setSpeed(this.stage * 0.5)
        this.missile.attractionPoint(1, this.xTarget, this.yTarget);
        drawSprite(this.missile);
    }

    update() {
        if (!this.isEnemy) {
            this.playerUpdate()
        } else {

        }
    }

    playerUpdate() {
        if (this.isArrivedAtTarget) {
            this.alive -= (this.stage * 0.01);
        }
    }

    enemyUpdate() {

    }

    isOver() {
        if (!this.isEnemy) {
            return this.playerOver();
        } else {
            return this.enemyOver();
        }
    }

    playerOver() {
        if (this.alive < 0) {
            playerGroup.remove(this.missile)
            return true;
        } else {
            return false;
        }
    }

    enemyOver() {
        if (this.missile.position.y >= 350) {
            enemyGroup.remove(this.missile)
            return true;
        } else {
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

    // restart() {
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
  
  restart() {
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
        } else if (currentState == HIGH_SCORE){
            console.log("back to main menu")
            currentState = MAIN_MENU;
            display.goToMenuFromGame();
            isJsonLoaded = false;
            jsonData = null;
        }
    }
}

function mousePressed() {
    if (currentState == PLAY) {
        if (playerStatus.isGameStarted) {
            display.mouseClickEvent();
        } else if (playerStatus.isStoreOpen) {
            let storeSelected = display.getStoreSelected()
            if (playerStatus.skillPoint > 0) {
                
                if (storeSelected == upgradeMissile) {
                    playerStatus.speed += 1
                    playerStatus.skillPoint -= 1
                } else if (storeSelected == upgradeBombAlive) {
                    playerStatus.alive += 1
                    playerStatus.skillPoint -= 1
                } else if (storeSelected == upgradeBombSize) {
                    playerStatus.bombSize += 10;
                    playerStatus.skillPoint -= 1
                }
            }else if (storeSelected == nextStage) {
                playerStatus.isStoreOpen = false;
            }
        } 



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
    } else if (currentState == PLAY) {
        if (keyCode == 90) { //z
            playerStatus.currentAntiMissile = 0
        } else if (keyCode == 88) { //x
            playerStatus.currentAntiMissile = 1
        } else if (keyCode == 67) { //c
            playerStatus.currentAntiMissile = 2
        } else if (keyCode == ESCAPE) {
            playerStatus = {
                isGameStarted: false,
                isShowStageText: false,
                score: 0,
                stage: 0,
                speed: 0,
                bombSize: 0,
                currentAntiMissile: 1,
                alivedbuilding: [0, 0, 0, 0, 0, 0],
                alivedAntiMissile: [0, 0, 0],
                restOfMissile: [0, 0, 0],
                isFail: false,
                isPass: false,
                isStoreOpen: false,
                skillPoint: 0,
                playTime: 0
            }

            display.goToMenuFromGame();

            currentState = MAIN_MENU
        }
    }
}