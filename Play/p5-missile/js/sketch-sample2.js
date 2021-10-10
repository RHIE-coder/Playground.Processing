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
    createCanvas(windowWidth, windowHeight);
    display = new Program();
    textSize(20);
}

function draw() {
    background('grey');
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

class Program {

    constructor() {
        this.dx = 10;
        this.x = 20;
    }


    loading() {
        fill('pink');
        ellipse(200, 200, 100, 100);
        fill('white');
        text('Loading...', 300, 200);
    }

    mainMenu() {
        fill('lightgreen');
        rect(150, 150, 100, 100);
        fill('white');
        text('Main Menu. Click to play.', 300, 200);
    }


    gamePlay() {
        this.x = this.x + this.dx;
        fill('red');
        ellipse(this.x, 200, 100, 100);
        if (this.x >= windowWidth) {
            fill('white');
            text('Game over! Click to go back to main menu', 200, 200);
        }
    }

    resetGame() {
        this.x = 20;
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
