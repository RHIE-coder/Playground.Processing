/* 
    Scenes
    •  Loading / splash scene 
    •  Main menu scene 
    •  Main game scene 
    •  Leaderboard scene 

    Loops 0 / 3
    Arrays 0 / 3
    Keyboard 0 / 3
    p5.image 0 / 1
    Sprites 0 / 3
    Sounds 0 / 3
    Video 0 / 1
    Input Type 0 / 1
    Data JSON properties 0 / 3
*/

const LOADING = 0;
const MAIN_MENU = 1;
const PLAY = 2;
const HIGH_SCORE = 3;
const SETTINGS = 4;

let currentState = LOADING;
let display;

function setup() {
    createCanvas(800, 400);
    display = new Display();
}

function draw() {
    background(255);
    display.default();
    display.initMousePointer();

    switch (currentState) {
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

    if (frameCount == 120) {
        currentState = MAIN_MENU;
    }
}

class Display {

    constructor() {
        this.dx = 10;
        this.x = 20;
    }


    loading() {
        fill('pink');
        ellipse(200, 200, 100, 100);
        text('Loading...', 300, 200);
    }

    mainMenu() {
        fill('lightgreen');
        rect(150, 150, 100, 100);
        text('Main Menu. Click to play.', 300, 200);
    }


    gamePlay() {
        this.x = this.x + this.dx;
        fill('red');
        ellipse(this.x, 200, 100, 100);
        if (this.x >= width) {
            text('Game over! Click to go back to main menu', 200, 200);
        }
    }

    resetGame() { //remove
        this.x = 20;
    }

    default(){
        const WALL_THICKNESS = 10;
        
        const borderTop = createSprite(width / 2, 0, width, WALL_THICKNESS * 2)
        const borderBottom = createSprite(width / 2, height, width, WALL_THICKNESS * 2)
        const borderLeft = createSprite(0, height / 2, WALL_THICKNESS * 2, height)
        const borderRight = createSprite(width, height / 2, WALL_THICKNESS * 2, height)

        const borders = [borderTop, borderBottom, borderLeft, borderRight]

        const wall = new Group()

        for (let i = 0; i < 4; i++) {
            borders[i].shapeColor = color(150, 150, 150);
            borders[i].immovable = true;
            wall.add(borders[i])
        }

        drawSprites(wall)
        noStroke();
    }

    initMousePointer(){
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

function mouseClicked() {
    if (currentState == MAIN_MENU) {
        display.resetGame();
        currentState = PLAY;
    } else if (currentState == PLAY) {
        currentState = MAIN_MENU;
    }
}