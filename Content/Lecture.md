# 01. 프로그래밍

## - 프로그래밍 언어란?
## - 컴퓨터 구조와 프로그래밍 언어 관계
## - About Processing
## - 기초 문법

```java
= assign(할당) : 할당 연산자
; semicolon : 코드가 끝났다는 것을 알리는 문법
{} block : 코드의 공간을 이야기 한다. 적용 범위
// 주석 : 실행과 전혀 무관한 곳. 보통 설명이나 저작권 등등 정보에 대해서 쓴다.
/*
    여러줄로 주석을 처리할 때 자주 쓰인다.
*/
print()
println()
```

<br><br><br><br><br>
<br><br><br><br><br>

# 02. Processing 프로그래밍 구조
## - window 크기와 x-axis, y-axis
## - 기본적인 시작
### * void setup()

처음 실행될 때 호출되는 함수(초기화 함수)

 - size() : window 크기 지정
 - height : window 높이
 - width : window 넓이
 
   - height, width 같이 우리가 변수를 따로 정하지 않았는데 이미 내장 되어 있는 변수를 내장 변수(Built-in)

```java
void setup(){
    size(300, 400); // x축, y축
    println(width); // 300
    println(height); // 400
}
```

<br><br><br>

### * void draw()

setup() 이후 반복되는 함수

```java
void setup(){
    size(500,500);
}

void draw(){
    println("invoked draw()");
}
```

 - frameRate와 frameRate()를 통해 속도 조절

```java
void setup(){
    size(500,500);
    println(frameRate); // 기본값이 60
}
```
frame이란? 1초당 보여지는 화면의 갯수

이것이 의미하는 것이 무엇인가? draw()라는 함수가 1초에 약 60번을 실행된다.

```java
void setup(){
    size(500, 500);
    frameRate(10);
}

void draw(){
    println(frameRate);
    println("invoked draw()");
}
```

<br><br><br>

### * void exit()

창을 닫고 종료시키는 함수

```java
void setup(){
    println("Hello World");
    exit();
}
```

 - fullScreen() : Window를 전체 화면으로 보게 한다.
 - delay() : 딜레이를 준다. ms기준(1초(s)는 1000ms)

```java
void setup(){
    fullScreen();
    delay(2000);
    exit();
}
```

<br><br><br><br><br>

## - 기본적인 그래픽 : Shape

### * rect()

사각형
 
 - case 1

```java
size(640, 360);
rect(0,0,150,150); // 위치 x,y --> 크기 가로X세로
```
 - case 2

```java
size(640, 360);
rectMode(CENTER);
rect(75,75,150,150); // 위치 x,y --> 크기 가로X세로
```

<br><br><br>

### * ellipse()

원형

 - case 1

```java
size(640, 360);
ellipse(100,100,200,150);
```

 - case 2

```java
size(640, 360);

rect(100,100,100,100);

ellipseMode(CORNER);
ellipse(100,100,100,100);
```

<br><br><br>

### * line()

선

```java
size(640,360);
line(0,0, 100, 100);
```

<br><br><br>

### * point()

```java
size(640,360);
point(100,100);
```

<br><br><br><br><br>

## - 기본 : 색깔과 투명도

### * 색깔

window의 배경색 `background`로 처리

Shape에서 테두리(Outline)색은 `stroke`로 처리

TIP. `strokeWeight`를 통해 선의 굵기를 설정 가능

그리고 테두리 안의 면적의 색은 `fill`로 처리

```java
size(640, 360);
background(0, 127 ,0); //background(r, g ,b)

stroke(#A590DA);
fill(0,0,255);
rect(100,100,100,100);

stroke(255,0,0);
fill(127);
ellipse(50,50,25,25);

stroke(127,255,0);
strokeWeight(5);
line(250,150,350,200);
```

 - noFill()
 - noStroke()

위 두 함수는 색깔을 안먹게 하겠다는 뜻이다.

### * 투명도

```java
size(500,500);

fill(255,0,0);
rect(100,100,100,100);

fill(0,0,255, 50);
rect(150,150,100,100);
```

### * 색깔 조합 사이트

[METERIAL](https://material.io/design/color/the-color-system.html#color-theme-creation)<br>
[HAILPIXEL](https://color.hailpixel.com/#75D1C8)<br>
[DESIGN SEEDS](https://www.design-seeds.com/tag/pink/)<br>
[UI GRADIENT](https://uigradients.com/#MinnesotaVikings)<br>
[ADOBE COLOr](https://color.adobe.com/ko/search?q=pink&t=term)<br>
[COLOR HUNT](https://colorhunt.co/)<br>

 - usecase

```java
size(640, 360);

stroke(0,0,255);
fill(#A590DA);
rect(100,100,100,100);

stroke(0,0,255);
fill(165,144,218);
rect(300,100,100,100);
```

<br><br><br><br><br>

## - 이벤트

### * Mouse

 - mouseButton
 - mouseClicked()
 - mouseDragged()
 - mouseMoved()
 - mousePressed()
 - mousePressed
 - mouseReleased()
 - mouseWheel()
 - mouseX
 - mouseY
 - pmouseX
 - pmouseY

```java
void setup(){
   size(500,500);
   background(255,0,0);
}

void draw(){}

void mousePressed(){
    background(0,255,0);
}
```

<br><br><br>

### * Keyboard

 - key
 - keyCode
 - keyPressed()
 - keyPressed
 - keyReleased()
 - keyTyped()

```java
void setup(){
   size(500,500);
   background(255,0,0);
}

void draw(){}

void keyPressed(){
    background(0,255,0);
}
```

 - Example

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

<br><br><br><br><br>
<br><br><br><br><br>

# 03. 변수, 상수 그리고 자료형

## - 변수

### * 변수 선언과 초기화

1. Declare the variable

2. Initialize variable

3. use the variable

```java
int a = 10;
[자료형] [변수의 이름]  = [값]
```

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

### * 변수 이름 명명법
### * 변수 할당 원리

<br><br><br>

## - 자료형
### * boolean : true, false
### * byte
### * char
### * color
### * double
### * float
### * int
### * long

<br><br><br>

## - 상수
### * final

<br><br><br><br><br>
<br><br><br><br><br>

# 04. 연산자

## - 산술 연산 +     -     *     %     /

<br><br><br>

## - 복합 할당 연산 +=     -=     *=     %=     /=

<br><br><br>

## - 증감 연산 ++     --

<br><br><br>

## - 관계 연산 ==     !=     <     <=     >     >=

<br><br><br>

## - 논리 연산 &&     ||     !

<br><br><br><br><br>
<br><br><br><br><br>


# 05. 제어문
## - if

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
<br><br><br>

## - else if

<br><br><br>

## - else

<br><br><br>

## - switch~case~default

<br><br><br>

## - 삼항 조건 ?:

<br><br><br>


## - 조건문 Example

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

### * Logical Operator

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
  going =! going;
}
```

### * The Bouncing Ball

 - step 1

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

 - step 2

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

 - step 3

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

# 06. 반복문

## - random()

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

## - for

<br><br><br>

## - while

<br><br><br>

## - continue & break

<br><br><br>

## - 반복문 Example

### * while loop

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

### * Two Loops

 - step 1

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
 - step 2

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

### * for loop

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

### * careful about globalVar and localVar

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

### * loop vs draw

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

### * nested loop

#### why need nested loop

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

#### let's get the right thing

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

#### fun~!

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


<br><br><br><br><br>
<br><br><br><br><br>

# 07. 함수

## - 함수란?

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

<br><br><br>

## - 함수 선언 및 호출과 매개변수(parameter)

<br><br><br>

## - return과 반환형(void)

<br><br><br>

## - 함수 형태 종류

<br><br><br>

## - 함수 Example

### * Modulization as Functions 1

#### Origin

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

 - step 1

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

 - step 2

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

 - step 3

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

### * Modulization as Functions 2

 - step 1
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

 - step 2
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

 - step 3

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


<br><br><br><br><br>
<br><br><br><br><br>

# 08.  배열과 클래스
## - 배열 선언과 개념

## - 클래스 선언과 개념

<br><br><br><br><br>
<br><br><br><br><br>

# 이제 여기서부터 이미지 픽셀 등 도구 다루기












