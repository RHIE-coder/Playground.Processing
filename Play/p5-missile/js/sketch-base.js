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
let program;

function setup() {
    createCanvas(windowWidth, windowHeight);
    program = new Program();
}

function draw() {
    
    switch (currentState) {
        case LOADING:
            program.displayLoading();
            break;
        case MAIN_MENU:
            program.displayMainMenu();
            break;
        case PLAY:
            program.displayGame();
            break;
        case HIGH_SCORE:
            program.displayRanking();
            break;
    }

    if (frameCount == 120) {
        currentState = MAIN_MENU;
    }
}

class Program {

    constructor() {
        
    }


    displayLoading() {
        
    }

    displayMainMenu() {
        
    }


    displayGame() {
        
    }

    displayRanking(){

    }
}
