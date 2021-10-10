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

class Memory {

}

class Program {

    constructor() {
        this.WALL_THICKNESS = 10;
        this.borderTop = createSprite(width / 2, 0, width, this.WALL_THICKNESS * 2)
        this.borderBottom = createSprite(width / 2, height, width, this.WALL_THICKNESS * 2)
        this.borderLeft = createSprite(0, height / 2, this.WALL_THICKNESS * 2, height)
        this.borderRight = createSprite(width, height / 2, this.WALL_THICKNESS * 2, height)
        this.borders = [this.borderTop, this.borderBottom, this.borderLeft, this.borderRight]

        this.wall = new Group()

        for (let i = 0; i < 4; i++) {
            this.borders[i].shapeColor = color(150, 150, 150);
            this.borders[i].immovable = true;
            this.wall.add(this.borders[i])
        }

        drawSprites(this.wall)

    }
}

class Test {

    constructor() {
        this.WALL_THICKNESS = 10;

        this.borderTop = createSprite(width / 2, 0, width, this.WALL_THICKNESS * 2)
        this.borderBottom = createSprite(width / 2, height, width, this.WALL_THICKNESS * 2)
        this.borderLeft = createSprite(0, height / 2, this.WALL_THICKNESS * 2, height)
        this.borderRight = createSprite(width, height / 2, this.WALL_THICKNESS * 2, height)

        this.borders = [this.borderTop, this.borderBottom, this.borderLeft, this.borderRight]
        this.wall = new Group()

        for (let i = 0; i < 4; i++) {
            this.borders[i].shapeColor = color(150, 150, 150);
            this.borders[i].immovable = true;
            this.wall.add(this.borders[i])
        }

        this.game_start_btn = createSprite(100, height / 2, 140, 45);
        this.game_start_btn.setSpeed(4, random(-150, 150));
        this.game_start_btn.shapeColor = color(192, 192, 192);

        this.leaderboard_show_btn = createSprite(width / 2, height / 2, 140, 45);
        this.leaderboard_show_btn.setSpeed(4, random(-150, 150));
        this.leaderboard_show_btn.shapeColor = color(192, 192, 192);

        this.restart_btn = createSprite(width - 100, height / 2, 140, 45);
        this.restart_btn.setSpeed(4, random(-150, 150));
        this.restart_btn.shapeColor = color(192, 192, 192);

        this.btn = new Group()
        this.btn.add(this.game_start_btn)
        this.btn.add(this.leaderboard_show_btn)
        this.btn.add(this.restart_btn)
    }

    run() {
        background(255)

        this.btn.bounce(this.wall)
        this.btn.bounce(this.btn)

        drawSprites();

        textSize(16);
        textStyle(BOLD);
        text('game start', this.game_start_btn.position.x - 40, this.game_start_btn.position.y);

        textSize(16);
        textStyle(BOLD);
        text('    rank', this.leaderboard_show_btn.position.x - 40, this.leaderboard_show_btn.position.y);

        textSize(16);
        textStyle(BOLD);
        text('   restart', this.restart_btn.position.x - 40, this.restart_btn.position.y);
    }
}

class Pointer {

    constructor() {
        this.x = width / 2;
        this.y = height / 2;
    }

    displayInMenu() {
        if (mouseIsPressed) {
            if (mouseButton === LEFT) {
                fill(color('red'));
                noStroke();
                ellipse(mouseX, mouseY, 15, 15);
            }
        } else {

            fill(color('black'));
            ellipse(mouseX, mouseY, 5, 5);
        }
    }

    displayInGame() {
    }

}

class Effect {
    splash() {
        for (let i = 0; i < 10; i++) {
            let x = random(width)
            let y = random(height)
            let size = random(50, 300)

            drawSprite(createSprite(x, y, size));
        }
    }
}

class Scene {

}

let mouse_pointer;
let scene_handler;
let effect;

let program;

let main_menu_title_img;
let timer;



let LOADING; 
let MAIN_MENU; 
let PLAY; 
let HIGH_SCORE; 
let SETTINGS;
let currentState;

// function preload() {
//     main_menu_title_img = loadImage('assets/title.png');
// }
let test
function setup() {
    createCanvas(400,400)
    test = createSprite(200,200,50,50);
    test.addAnimation('process', 'assets/timer/process0001.png', 'assets/timer/process0021.png')
    
}


function draw() {
    background(240,255,240)
    drawSprites()
}
