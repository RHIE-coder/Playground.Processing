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

<br><br><br><br><br>
<br><br><br><br><br>

# 03. 변수, 상수 그리고 자료형

### * 변수
#### 변수 선언과 초기화
```java
int a = 10;
[자료형] [변수의 이름]  = [값]
```