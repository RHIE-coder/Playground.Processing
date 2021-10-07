// Game state constants
const LOADING = 0;
const MAIN_MENU = 1;
const PLAY = 2;
const HIGH_SCORE = 3;
const SETTINGS = 4;

var currentState = LOADING;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(20);
}

function draw() {
    background('grey');
    switch (currentState){
        case LOADING:
            drawLoadingScreen();
            break;
        case MAIN_MENU:
            drawMainMenuScreen();
            break;
        case PLAY:
            drawPlayScreen();
            break;
    }
    // Progress to Main Menu after 2s 
    if (frameCount == 120){
        currentState = MAIN_MENU;
    }
}

/*
 * Draw the loading screen
 */
function drawLoadingScreen(){
    fill('pink');
    ellipse(200, 200, 100, 100);
    fill('white');
    text('Loading...', 300, 200);
}

/*
 * Draw the main menu screen
 */
function drawMainMenuScreen(){
    fill('lightgreen');
    rect(150, 150, 100, 100);
    fill('white');
    text('Main Menu. Click to play.', 300, 200);
}

// Game play object
var dx = 10;
var x = 20;

/*
 * Implement the game logic
 */
function drawPlayScreen(){    
    x = x + dx;
    fill('red');
    ellipse(x, 200, 100, 100);
    if (x >= windowWidth){ 
      	// Once ellipse goes off the screen
        fill('white');
        text('Game over! Click to go back to main menu', 200, 200);
    }
}

/*
 * Reset the game state, i.e. reinitiaise game variables
 */
function resetGame(){
    x = 20;
}

/*
 * Mouse click triggers the transition between the menu and play screens.
 */
function mouseClicked(){
    if (currentState == MAIN_MENU){
        resetGame();
        currentState = PLAY;
    } else if (currentState == PLAY){
        currentState = MAIN_MENU;
    }
}