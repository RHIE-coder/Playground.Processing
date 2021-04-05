# Overview
## - Programming Fundamental Logic
### * Data
 - variable
 - array
### * Control
 - conditional
 - loop
### * Organization
 - functions
 - objects

<hr>

## - Drawing 
### * Images
### * Pixels
### * camera and video
### * computer vision

## - Raw Data
### * TXT, XML, JSON

## - Grapic
### * 2D / 3D Graphics

<br><br><br><br><br><br>
<br><br><br><br><br><br>

# 01. Drawing with Pixels
## - 모양과 위치

window의 크기

 - size();

Shape가 존재하고 x,y coordination이 존재한다.

 - rect(), ellipse(), line(), point()

```java
size(640, 360);
line(100, 50, 600, 250);
rect(100,50,20,200);
```

## - RGB, Transparancy

window의 배경색은 `background`로 처리

Shape에서 테두리 선(Outline)색은 `stroke`

그리고 테두리 안의 면적 색은 `fill`로 처리

```java
size(640, 360);
background(0,255,0);

stroke(0, 0, 255);
line(100, 50, 600, 250);

stroke(255,0,0);
fill(255,255,0); //#FFFF00
rect(100,50,20,200);

fill(255,0,0, 127); //opacity
rect(150,50,100,300);
```

<br><br><br><br><br><br>
<br><br><br><br><br><br>


# 02~03. RGB, Flow

`setup()` and `draw()`

built-in Variable : `mouseX`,`mouseY` ...

Event : `mousePressed`, `KeyPressed`

```java
void setup(){
    size(640, 360);
    background(50);
}

void draw(){
    stroke(255);
    line(pmouseX, pmouseY,mouseX, mouseY);
}

void mousePressed(){
    background(50);
}

void keyPressed(){
    background(0,255,0);
}
```

<br><br><br><br><br><br>
<br><br><br><br><br><br>

# 04. Variable, Random, Println

## - Use Variable

1. Declare the variable

2. Initialize variable

3. use the variable

```java
int circleX;

void setup(){
  size(640, 360);
  circleX = 50;
}

void draw(){
  background(50);
  
  fill(255);
  ellipse(circleX, 180, 24, 24);
  
  circleX += 1;
}
```

## - Use random()

random(100);

random(50, 100);

 - case 1

```java
float circleX;

void setup(){
  size(640, 360);
  circleX = width/2;
}

void draw(){
  background(50);
  
  fill(255);
  ellipse(circleX, 180, 24, 24);
  
  circleX += random(-3, 3);
}
```

 - case2

 ```java
float circleX;
float circleY;

void setup(){
  size(640, 360);
}

void draw(){
  
  circleX = random(width);
  circleY = random(height);
  
  //그리기
  background(50);
  fill(255);
  ellipse(circleX, circleY, 24, 24);
}
 ```

## - Use println()


<br><br><br><br><br><br>
<br><br><br><br><br><br>

# 05. Condition and Logical Operation

## - Boolean

```java
void setup(){
    size(640, 360);
}

void draw(){

    background(50);

    if(mouseX > 200){
        background(255,100,0); //RGB
    }
}
```

## - if ~ else if ~ else

 - case 1 

```java
void setup(){
    size(640, 360);
}

void draw(){
    background(0);

    if(mouseX > 500){
        fill(255,0,0);
        rect(300,100,50,50);
    }else if(mouseX > 400){
        fill(0,255,255);
        rect(300,200,50,50);
    }else if(mouseX > 300){
        fill(255,255,0);
        rect(100,300,50,50);
    }else if(mouseX > 200){
        fill(0,255,0);
        rect(300,200,60,50);
    }


    stroke(255);
    line(100, 0, 100, height);
    line(200, 0, 200, height);
    line(300, 0, 300, height);
    line(400, 0, 400, height);
    line(500, 0, 500, height);
}
```

 - case 2

```java
void setup(){
    size(640, 360);
}

void draw(){
    background(0);

    if(mouseX > 500){
        background(255,0,0);
    }else if(mouseX > 400){
        background(0,255,0);
    }else if(mouseX > 300){
        background(255,255,255);
    }else if(mouseX > 200){
        background(255,0,255);
    }else{
        background(255,255,0);
    }


    stroke(255);
    line(100, 0, 100, height);
    line(200, 0, 200, height);
    line(300, 0, 300, height);
    line(400, 0, 400, height);
    line(500, 0, 500, height);
}
```

## - Logical Operator

`&&`, `||`, `!`

 - case 1

```java
float x = 100;
boolean going = false;

void setup(){
    size(400,300);
}

void draw(){
    background(0);
    fill(255);

    ellipse(x, 150, 24, 24);

    if(going){
        x = x + 2;
    }
}

void mousePressed(){
    if(going){
      going = false;
    }else{
      going = true;
    }
}
```

 - case 2

`void mousePressed()`의 Statement를 아래와 같이 변경

```java
void mousePressed(){
  going = !going;
}
```

## - The Bouncing Ball

### * step 1

```java
float circleX;
float xspeed = 2;

void setup(){

    size(640, 360);
    circleX = 0;
}

void draw(){
    background(51);
    fill(102);
    stroke(255);
    ellipse(circleX, height/2, 32, 32);
    circleX += xspeed;
}
```

### * step 2

```java
float circleX;
float speedRule = 10;
float xspeed = speedRule;

void setup(){

    size(640, 360);
    circleX = 0;
}

void draw(){
    background(51);
    fill(102);
    stroke(255);
    ellipse(circleX, height/2, 32, 32);
    circleX += xspeed;

    if(circleX == width){
        println("TRUN ARROUND!!");
    }
    if(circleX > width){
        xspeed -= speedRule;
    }
    if(circleX < 0){
        xspeed = speedRule;
    }
}
```

## * step 3

```java
float circleX;
float speedRule = 10;
float xspeed = speedRule;

void setup(){

    size(640, 360);
    circleX = 0;
}

void draw(){
    background(51);
    fill(102);
    stroke(255);
    ellipse(circleX, height/2, 32, 32);
    circleX += xspeed;

    if(circleX > width || circleX < 0){
        xspeed *= -1;
        //make more and more faster
        //xspeed *= -1.1;
        
        //make more and more slower
        //xspeed *= 0.9;
    }
}
```

<br><br><br><br><br><br>
<br><br><br><br><br><br>

# 06. Looping

## * while loop

 - case 1

```java
float x = 0;

void setup(){
    size(400,300);
}

void draw(){
    background(0);
    
    x = 0;
    
    while(x < width){
        x += 20;
        fill(101);
        stroke(255);
        ellipse(x,150,16,16);
    }
}
```

 - case 2

```java
float x = 0;

void setup(){
    size(400, 300);
}

void draw(){

    background(0);

    x = 0;
    while(x < width){
        if(mouseX < 1){
            x += 1;
        }else{
            x += mouseX;
        }
        fill(101);
        stroke(255);
        ellipse(x,150,16,16);
    }
}
```

## - Two Loops

### * step 1

```java
float x = 0;
float y = 0;

void setup(){
    size(400, 300);
}

void draw(){
    background(0);

    stroke(255);
    strokeWeight(2);

    x = 50;
    while ( x  < width ){
        line(x, 0, x, height);
        x += 50;
    }
    
    y = 50;
    while ( y  < height ){
        line(0, y, width, y);
        y += 50;
    }
}
```
### * step 2

```java
float x = 0;
float y = 0;
float spacing = 50;

void setup(){
    size(400, 300);
}

void draw(){
    background(0);

    spacing += random(-2,2);

    stroke(255);
    strokeWeight(2);

    x = 0;
    while ( x  < width ){
        line(x, 0, x, height);
        x += spacing;
    }
    
    y = 0;
    while ( y  < height ){
        line(0, y, width, y);
        y += spacing;
    }
}
```

## - for loop

```java
float x = 0;
float y = 0;
float spacing = 20;

void setup(){
    size(400, 300);
}

void draw(){
    background(0);

    stroke(255);
    strokeWeight(2);

    x = 0;
    while ( x  < width ){
        line(x, 0, x, height);
        x += spacing;
    }
    
    for(int y = 0; y < height; y += 20){
        line(0, y, width, y);
    }
}
```

## - careful about globalVar and localVar

```java
int num = 10; //global

void setup(){
    float xcircle = 50; //local
}

void draw(){
    println(num); //10
    println(xcircle); //cannot found
}
```

## - loop vs draw

```java
float endX = 0;

void setup(){
    size(400,300);
}

void draw(){
    background(0);
    strokeWeight(2);
    stroke(255);

    int x = 0;
    while( x < endX){
        line(x, 0, x, height);
        x += 20;
    }

    endX += 1;
}
```

## - nested loop

### * why need nested loop

```java
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
```

### * let's get the right thing

```java
size(400, 300);
background(0);
strokeWeight(2);
stroke(255);
fill(127);

for(int x = 0; x < width; x += 20){
    for(int y = 0; y < height; y+=20){
        rect(x,y, 20, 20);
    }
}
```

### * fun~!

```java
size(400, 300);
background(0);
strokeWeight(2);
stroke(255);
fill(127);

for(int x = 0; x < width; x += 20){
    for(int y = 0; y < height; y+=20){
        fill(random(255));
        rect(x,y, 20, 20);
    }
}
```

<br><br><br><br><br><br>
<br><br><br><br><br><br>

# 07. Functions

## - What is Functions

```java
void setup(){
  size(320,240);
}

void draw(){
   background(0);
   flower();
}

void flower(){
   fill(255,0,0);
   ellipse(100,100,20,20);
}
```

## - Modulization as Functions 1

### * Origin

```java
float x = 0;
float y = 0;
float xspeed = 5;
float yspeed = 2.3;

void setup(){
    size(320, 240);
}

void draw(){
    background(255);
    stroke(0);
    fill(127);
    ellipse(x, y, 32, 32);

    x += xspeed;
    y+= yspeed;

    if( x > width || x < 0){
        xspeed *= -1;
    }
    if( y > height || y < 0){
        yspeed *= -1;
    }
}
```

### * step 1

```java
float x = 0;
float y = 0;
float xspeed = 5;
float yspeed = 2.3;

void setup(){
    size(320, 240);
}

void draw(){
    background(255);
    stroke(0);
    fill(127);
    ellipse(x, y, 32, 32);

    x += xspeed;
    y+= yspeed;

    if( x > width || x < 0){
        xspeed *= -1;
    }
    if( y > height || y < 0){
        yspeed *= -1;
    }
}

void displayBall(){

}

void moveBall(){

}

void checkEdges(){

}
```

### * step 2

```java
float x = 0;
float y = 0;
float xspeed = 5;
float yspeed = 2.3;

void setup(){
    size(320, 240);
}

void draw(){
    background(255);


}

void displayBall(){
    stroke(0);
    fill(127);
    ellipse(x, y, 32, 32);
}

void moveBall(){
    x += xspeed;
    y+= yspeed;
}

void checkEdges(){
    if( x > width || x < 0){
        xspeed *= -1;
    }
    if( y > height || y < 0){
        yspeed *= -1;
    }
}
```

### * step 3

```java
float x = 0;
float y = 0;
float xspeed = 5;
float yspeed = 2.3;

void setup(){
    size(320, 240);
}

void draw(){
    background(255);
    displayBall();
    moveBall();
    checkEdges();

}

void displayBall(){
    stroke(0);
    fill(127);
    ellipse(x, y, 32, 32);
}

void moveBall(){
    x += xspeed;
    y+= yspeed;
}

void checkEdges(){
    if( x > width || x < 0){
        xspeed *= -1;
    }
    if( y > height || y < 0){
        yspeed *= -1;
    }
}
```

만일 여기서 x값을 1000000으로 두거나 필수적으로 호출되어야 할 함수 몇개가 빠지게 된다면 정상적을 동작하기가 힘들 것이다.

## - Modulization as Functions 2

### * step 1
```java
void setup(){
   size(640, 360); 
}

void draw(){
    background(51);
    fill(127);
    stroke(255);
    strokeWeight(2);

    beginShape();
    vertex(100,50);
    vertex(114,80);
    vertex(147,85);
    vertex(123,107);
    vertex(129, 140);
    vertex(100, 125);
    vertex(71, 140);
    vertex(77, 107);
    vertex(53,85);
    vertex(86,80);
    endShape(CLOSE);
}
```

### * step 2
```java
void setup(){
   size(640, 360); 
}

void draw(){
    background(51);
    star();
}

void star(){
    
    fill(127);
    stroke(255);
    strokeWeight(2);

    beginShape();
    vertex(100,50);
    vertex(114,80);
    vertex(147,85);
    vertex(123,107);
    vertex(129, 140);
    vertex(100, 125);
    vertex(71, 140);
    vertex(77, 107);
    vertex(53,85);
    vertex(86,80);
    endShape(CLOSE);
}
```

### * step 3

```java
void setup(){
   size(640, 360); 
}

void draw(){
    background(51);
    star(100,100);
    star(200,300);
}

void star(float x, float y){
    
    fill(127);
    stroke(255);
    strokeWeight(2);

    beginShape();
    vertex(x,y-50);
    vertex(x+14,y-20);
    vertex(x+47,y-15);
    vertex(x+23,y+7);
    vertex(x+29,y+40);
    vertex(x,y+25);
    vertex(x-29,y+40);
    vertex(x-23,y+7);
    vertex(x-47,y-15);
    vertex(x-14,y-20);
    endShape(CLOSE);
}
```


<br><br><br><br><br><br>
<br><br><br><br><br><br>

# 08. Objects

## - Bubble

```java
class Bubble{
 float x;
 float y;
 
 float diameter;
 
 Bubble(float tempD){
    x = width / 2;
    y = height;
    diameter = tempD;
 }
 
 void ascend(){
    y--;
    x = x + random(-2,2);
 }
 
 void display(){
   stroke(0);
   fill(127);
   ellipse(x, y, diameter, diameter);
 }
 
 void top(){
    if(y < diameter/2){
       y = diameter/2;
    }
 }
}

Bubble b1;
Bubble b2;

void setup() {
  size(640, 360);
  b1 = new Bubble(64);
  b2 = new Bubble(16);
}

void draw() {
  background(255);
  b1.ascend();
  b1.display();
  b1.top();
  
  b2.ascend();
  b2.display();
  b2.top();
}
```

## - Particle

### * step 1

```java
class Particle{
   float x, y;
   float r;
   
   Particle(){
     x = random(width);
     y = random(height);
     r = random(4, 18);
       
   }
   
   Particle(float tempX, float tempY, float tempR){
      x = tempX;
      y = tempY;
      r = tempR;
   }
   
   void display(){
     stroke(255);
     noFill();
     ellipse(x, y, r*2, r*2);
   }
  
}

Particle p1;
Particle p2;


void setup(){
  size(600,400);
  p1 = new Particle(100, 100, 50);
  p2 = new Particle();
}

void draw(){
  
   background(0);
   
   
   
   p1.display();
   p2.display();
}
```

### * step 2

```java
class Particle{
   float x, y;
   float r;
   
   Particle(){
     x = random(width);
     y = random(height);
     r = random(4, 18);
       
   }
   
   Particle(float tempX, float tempY, float tempR){
      x = tempX;
      y = tempY;
      r = tempR;
   }
   
   void display(){
     stroke(255);
     noFill();
     ellipse(x, y, r*2, r*2);
   }
  
}

Particle p1;
Particle p2;


void setup(){
  size(600,400);
  p1 = new Particle(100, 100, 50);
  p2 = new Particle(500, 300, 100);
}

void draw(){
  
   background(0);
   
   float d = dist(p1.x, p1.y, p2.x, p2.y);
   if(d < p1.r + p2.r){
      background(0,255,0); 
   }
   
   p2.x = mouseX;
   p2.y = mouseY;
   
   p1.display();
   p2.display();
}
```

### * step 3

```java
class Particle{
   float x, y;
   float r;
   
   Particle(){
     x = random(width);
     y = random(height);
     r = random(4, 18);
       
   }
   
   Particle(float tempX, float tempY, float tempR){
      x = tempX;
      y = tempY;
      r = tempR;
   }
   
   void display(){
     stroke(255);
     noFill();
     ellipse(x, y, r*2, r*2);
   }
   
   boolean overlaps(Particle other){
     float d = dist(this.x, this.y, other.x, other.y);
     if(d < this.r + other.r){
        return true;
     }else{
        return false; 
     }
   }
  
}

Particle p1;
Particle p2;


void setup(){
  size(600,400);
  p1 = new Particle(100, 100, 50);
  p2 = new Particle(500, 300, 100);
}

void draw(){
  
   background(0);
   

   
   if (p1.overlaps(p2)){
       background(0,255,0); 
   }
   
   p2.x = mouseX;
   p2.y = mouseY;
   
   p1.display();
   p2.display();
}
```

### * step 4

```java
class Particle{
   float x, y;
   float r;
   color col;
   
   Particle(){
     x = random(width);
     y = random(height);
     r = random(4, 18);
     col = color(0);
       
   }
   
   Particle(float tempX, float tempY, float tempR){
      x = tempX;
      y = tempY;
      r = tempR;
   }
   
   void display(){
     stroke(255);
     fill(col);
     ellipse(x, y, r*2, r*2);
   }
   
   void overlaps(Particle other){
     float d = dist(this.x, this.y, other.x, other.y);
     if(d < this.r + other.r){
        other.col = color(255,0,0);
     }else{
        other.col = color(0);
     }
   }
  
}

Particle p1;
Particle p2;


void setup(){
  size(600,400);
  p1 = new Particle(100, 100, 50);
  p2 = new Particle(500, 300, 100);
}

void draw(){
  
   background(0);
   

   
   p1.overlaps(p2);
   
   p2.x = mouseX;
   p2.y = mouseY;
   
   p1.display();
   p2.display();
}
```

## - Pass by Value vs Pass by Reference

### * Pass by Value
```java
int x = 50;

void setup(){
  change(x);
  println(x);
}

void change(int val){
    val = val * 2;
}

```

### * Pass by Reference
```java
class Number{

    int num;

    Number(int num){
        this.num = num;
    }
    
    void change(int num){
       this.num = num; 
    }
}

Number x = new Number(50);

x.change(300);

println(x.num);
```

<br><br><br><br><br><br>
<br><br><br><br><br><br>

# 09. Array

## - why need array
### * ready Bubble Object

```java
class Bubble{
 float x;
 float y;
 float diameter;
 float yspeed;
 
 Bubble(float tempD){
    x = random(width);
    y = height;
    diameter = tempD;
    yspeed = random(0.5, 2.5);
 }
 
 void ascend(){
    y -= yspeed;
    x = x + random(-2,2);
 }
 
 void display(){
   stroke(0);
   fill(127);
   ellipse(x, y, diameter, diameter);
 }
 
 void top(){
    if(y < diameter/2){
       y = diameter/2;
    }
 }
}

Bubble b1;
Bubble b2;

void setup() {
  size(640, 360);
  b1 = new Bubble(64);
  b2 = new Bubble(64);
}

void draw() {
  background(255);
  b1.ascend();
  b1.display();
  b1.top();
  
  b2.ascend();
  b2.display();
  b2.top();
}
```

### * change to array

```java
class Bubble{
 float x;
 float y;
 float diameter;
 float yspeed;
 
 Bubble(float tempD){
    x = random(width);
    y = height;
    diameter = tempD;
    yspeed = random(0.5, 2.5);
 }
 
 void ascend(){
    y -= yspeed;
    x = x + random(-2,2);
 }
 
 void display(){
   stroke(0);
   fill(127);
   ellipse(x, y, diameter, diameter);
 }
 
 void top(){
    if(y < diameter/2){
       y = diameter/2;
    }
 }
}

Bubble[] bubbles = new Bubble[2];

void setup() {
  size(640, 360);
  bubbles[0] = new Bubble(64);
  bubbles[1] = new Bubble(64);
}

void draw() {
  background(255);
  bubbles[0].ascend();
  bubbles[0].display();
  bubbles[0].top();
  
  bubbles[1].ascend();
  bubbles[1].display();
  bubbles[1].top();
}
```

### * make many bubbles

```java
class Bubble{
 float x;
 float y;
 float diameter;
 float yspeed;
 
 Bubble(float tempD){
    x = random(width);
    y = height;
    diameter = tempD;
    yspeed = random(0.5, 2.5);
 }
 
 void ascend(){
    y -= yspeed;
    x = x + random(-2,2);
 }
 
 void display(){
   stroke(0);
   fill(127);
   ellipse(x, y, diameter, diameter);
 }
 
 void top(){
    if(y < diameter/2){
       y = diameter/2;
    }
 }
}

Bubble[] bubbles = new Bubble[20];

void setup() {
  size(640, 360);
  for(int i = 0; i < bubbles.length; i++){
      bubbles[i] = new Bubble(64);
  }
}

void draw() {
  background(255);
  for(int i = 0; i < bubbles.length; i++){
    bubbles[i].ascend();
    bubbles[i].display();
    bubbles[i].top();
  }

}
```

### * low performance

```java
class Bubble{
 float x;
 float y;
 float diameter;
 float yspeed;
 
 Bubble(float tempD){
    x = random(width);
    y = height;
    diameter = tempD;
    yspeed = random(0.5, 2.5);
 }
 
 void ascend(){
    y -= yspeed;
    x = x + random(-2,2);
 }
 
 void display(){
   stroke(0);
   fill(127);
   ellipse(x, y, diameter, diameter);
 }
 
 void top(){
    if(y < diameter/2){
       y = diameter/2;
    }
 }
}

Bubble[] bubbles = new Bubble[1000];

void setup() {
  size(640, 360);
  for(int i = 0; i < bubbles.length; i++){
      bubbles[i] = new Bubble(64);
  }
}

void draw() {
  background(255);
  for(int i = 0; i < bubbles.length; i++){
    bubbles[i].ascend();
    bubbles[i].display();
    bubbles[i].top();
  }

}
```

### * make high performance

```
size(640, 360, P2D);
```

<br><br><br><br><br><br>
<br><br><br><br><br><br>


# 10. Images, Pixcels

## - Images

### * 이미지 불러오기 

```java
PImage img;

void setup(){
   size(600,400);
   img = loadImage("none.png");
}

void draw(){
  background(0);
  image(img, 0, 0);
  
  fill(0, 255, 0);
  ellipse(300, 200, 10, 10);
}
```

### * 이미지를 불러오는 것을 실패할 경우 멈춤 현상 해결

```java
PImage img;

void setup(){
   size(600,400);
   img = loadImage("none.png");
}

void draw(){
  try{
    background(0);
    image(img, 0, 0);
    
    fill(0, 255, 0);
    ellipse(300, 200, 10, 10);
  }catch(Exception e){
     e.printStackTrace(); 
     exit();
  }
}
```

### * 마우스로 크기 조절

```java
PImage img;

void setup(){
   size(600,400);
   img = loadImage("lamborghini.png");
}

void draw(){
  try{
    background(0);
    image(img, 0,0, mouseX, mouseY);
  }catch(Exception e){
     e.printStackTrace(); 
     exit();
  }
}
```

### * filtering

```java
PImage img;

void setup(){
   size(600,400);
   img = loadImage("lamborghini.png");
}

void draw(){
  try{
    background(0);
    tint(255,mouseX,mouseY);
    image(img, 0,0, mouseX, mouseY);
  }catch(Exception e){
     e.printStackTrace(); 
     exit();
  }
}
```

## - Pixels

### * get, set
 - get과 set으로 해당 위치 픽셀의 색깔 정보를 얻어오거나 설정할 수 있다.

 ```java
size(600, 400);
background(0);
for(int x = 0; x < width; x++){
    set(x, 200, color(255, 0, 0));
}
 ```

### * 픽셀 다루기

 - case 1

```java
size(600, 400);
background(0);

loadPixels();
for(int i = 0; i < 10000; i++){
  pixels[i] = color(255, 0, 0);
}
updatePixels();
```

- case 2

```java
size(600, 400);
background(0);

loadPixels();
for(int i = 0; i < pixels.length; i++){
  pixels[i] = color(255, 0, 0);
}
updatePixels();
```

- case 3

```java
size(600, 400);
background(0);

loadPixels();
for(int i = 0; i < pixels.length; i++){
  pixels[i] = color(random(255), random(255), random(255));
}
updatePixels();
```

 - case 4

```java
size(600, 400);
background(0);

loadPixels();
for (int x = 0; x < width; x++){
   for(int y = 0; y < height; y++){
      pixels[x+y*width] = color(0, y/2, 0); 
   }
  
}
updatePixels();
```

 - case 5

```java
size(600, 400);
background(0);

loadPixels();
for (int x = 0; x < width; x++){
   for(int y = 0; y < height; y++){
      pixels[x+y*width] = color(0, y/2, x/2); 
   }
  
}
updatePixels();
```


 - case 6

```java
size(600, 400);
background(0);

loadPixels();
for (int x = 0; x < width; x++){
   for(int y = 0; y < height; y++){
       float d = dist(x, y, width/2, height/2);
       pixels[x+y*width] = color(d); 
   }
  
}
updatePixels();
```

## - Control Images

### * 그냥 이미지 불러오기
```java
PImage car;

void setup(){
  size(800,600);
  car = loadImage("lamborghini.png");
}

void draw(){
   try{
     image(car,0,0);
   }catch(Exception e){
      e.printStackTrace();
      exit();
   }
  
}
```

### * blank 이미지 공간에 픽셀단위로 복사 후 PS Window로

```java
10.5
```