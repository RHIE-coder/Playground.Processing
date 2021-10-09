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
const LOADING = 1;
const MAIN_MENU = 2;
const PLAY = 3;
const HIGH_SCORE = 4;
const SETTINGS = 5;

let currentState = WELCOME;
// let currentState = MAIN_MENU;
let display;
let welcomeVid;
let isWelcome;
let welcomeCount = 3;
let titleImg;
let isFinishLoading;
let loadingCount = 3;

let effectWaiting = [];
let explosionSheet;
let explosionImages = []

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
    display.default();

    switch (currentState) {
        case WELCOME:
            display.welcome();
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

        this.btn = []
        this.menu = new Group()
        let distance = 110;
        for (let i = 0; i < 3; i++) {
            this.btn.push(createSprite(width / 2, height / 2 + distance, 180, 70));
            // this.btn[i].setSpeed(4, random(-150, 150));
            this.btn[i].shapeColor = color(192, 192, 192);
            this.menu.add(this.btn[i]);
            distance -= 110;
        }

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

    }

    welcome() {
        image(welcomeVid, 0, 0, 800, 400)

        if (isWelcome) {
            textAlign(CENTER, CENTER);
            textSize(40);
            fill('white')
            text('SeongYeon Yoo', width / 2, height / 2)
            if (frameCount == 500) {
                currentState = LOADING
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

    loading() {
        if (this.loadingBarSize > width) {
            image(titleImg, this.WallThickness, this.WallThickness, 750, 300)
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
        this.menu.bounce(this.menu)
        this.menu.bounce(this.wall)
        drawSprites(this.menu)
    }

    gamePlay() {
        this.x = this.x + this.dx;
        fill('red');
        ellipse(this.x, 200, 100, 100);
        if (this.x >= width) {
            text('Game over! Click to go back to main menu', 200, 200);
        }
    }

    default() {
        background(255);
        drawSprites(this.wall);
        noStroke();

        effectWaiting.forEach(explosion => {
            explosion.draw();
            explosion.update();
        });
          
        effectWaiting = effectWaiting.filter( explosion => !explosion.isOver() );
    }

    initMousePointer() {
        if (mouseIsPressed) {
            if (mouseButton === LEFT) {
                fill(color('red'));
                ellipse(mouseX, mouseY, 15, 15);
            }
        } else {
            fill(color('black'));
            ellipse(mouseX, mouseY, 5, 5);
        }
    }

}

class Explosion {
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
    /* test */ isWelcome = true
    /* test */ welcomeCount = -1
    if (isWelcome && welcomeCount < 0) {
        if (currentState == WELCOME) {
            currentState = LOADING;
        } else if (currentState == LOADING && isFinishLoading) {
            currentState = MAIN_MENU;
        /*********************test*************************/
        } else if (currentState == MAIN_MENU) {
            console.log(effectWaiting)
            effectWaiting.push(new Explosion(mouseX, mouseY, 0.25));
        }
        /**************************************************/
    }
}
