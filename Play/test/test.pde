size(400, 300);
background(0);
strokeWeight(2);
stroke(255);
fill(127);

for(int x = 0; x < width; x += 20){
    rect(x, 0, 20 ,20);
}

for(int y = 0; y < height; y+=20){
    rect(0,y, 20, 20);
}
