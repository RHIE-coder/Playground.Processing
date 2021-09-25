function setup() {
    createCanvas(windowWidth, windowHeight)
    console.log(`넓이 : ${windowWidth}, 높이 : ${windowHeight}`);
}

function draw() {
    
    if (mouseIsPressed) {
        fill(0);
    } else {
        fill(255);
    }
    ellipse(mouseX, mouseY, 80, 80);
}