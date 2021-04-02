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

### * 2D Primitives
	

ellipse(a, b, c, d)

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

<br><br><br>

### * Loading & Displaying

<br><br><br>

### * Attributes

<br><br><br>

### * Vertex

<br><br><br><br><br>
<br><br><br><br><br>

## - Images

### * 기본

<br><br><br>

### * Loading & Displaying

<br><br><br>

### * Pixcels

<br><br><br><br><br>
<br><br><br><br><br>

## - Color

### * Setting

<br><br><br>

### * Creating & Reading

<br><br><br><br><br>
<br><br><br><br><br>

## - Transform

<br><br><br><br><br>
<br><br><br><br><br>

## - Typography

### * Loading & Displaying

### * Attributes

### * Metrics

<br><br><br><br><br>
<br><br><br><br><br>

## - Random

<br><br><br><br><br>
<br><br><br><br><br>

## - Input Interact

### * Mouse

### * Keyboard