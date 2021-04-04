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



<br><br><br><br><br><br>
<br><br><br><br><br><br>


- size(640, 360, P2D)

# Images, Pixcels