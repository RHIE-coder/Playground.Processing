# Processing 그래픽 디자인

## - 기본 구조

### * void setup() 

처음 실핼될 때 호출되는 함수(초기화 함수)

 - size() : 창 크기 지정
 - height : 창 높이
 - width : 창 넓이

```java
void setup(){
    size(300,400);
    println(width); //300
    println(height); //400
}
```
<br><br><br>

### * void draw()

setup()이후 반복(Loop)되는 함수

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
  frameRate(1); //frameRate default value = 60
}

void draw(){
  println(frameRate); //frameRate
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

 - fullScreen
 - delay
```java
void setup(){
   fullScreen();
   delay(1000);
   exit();
}
```

<br><br><br><br><br>
<br><br><br><br><br>

## - Shape

### * 기본적인 사용법

```java
PShape square;  // The PShape object
PShape imageShape; // The PShape object

void setup() {  
  size(800, 800);
  // Creating the PShape as a square. The corner 
  // is 0,0 so that the center is at 40,40 
  square = createShape(RECT, 0, 0, 80, 80);
  
  // The file "astronaut.svg" must be in the data folder
  // of the current sketch to load successfully
  // can't be .png ...
  imageShape = loadShape("astronaut.svg");
}

void draw() {
  shape(square, 10, 10);
  shape(imageShape, 100, 100, 200, 200);
  shapeMode(CENTER);
  shape(imageShape, 100, 100, 200, 200);
}

/*
  PShape
  
  createShape
  loadShape
  shapeMode : CORNER, CORNERS, CENTER
    
  shape(shape)
  shape(shape, x, y)
  shape(shape, a, b, c, d)
  
    shape  PShape: the shape to display
    x  float: x-coordinate of the shape
    y  float: y-coordinate of the shape
    a  float: x-coordinate of the shape
    b  float: y-coordinate of the shape
    c  float: width to display the shape
    d  float: height to display the shape

*/
```

### * 2D Primitives
	

ellipse(a, b, c, d)
```java
size(500,500);
ellipse(50, 50, 55, 55);
ellipse(150, 150, 100, 70);
```


rect()

line()
 - stroke()
 - strokeWeight()
```java
strokeWeight(1);  // Default
line(20, 20, 80, 20);
strokeWeight(4);  // Thicker
line(20, 40, 80, 40);
strokeWeight(10);  // Beastly
line(20, 70, 80, 70);
```

