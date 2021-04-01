# 프로세싱(Processing)

## - 공식 사이트

[Processing.org](https://processing.org/)

## - 기본 소개

### * Shape

 - `rect(a,b,c,d)`
 - `ellipse(a,b,c,d)`

```processing
rect(250, 200, 150, 100);
ellipse(250,200,200,200);
```


### * Color

 - `background(r,g,b)`
 - `stroke(r,g,b)`
 - `fill(r,g,b)`

```processing
background(216,225,149);
stroke(255,0,0);
fill(0,0,255);
rect(250,200,100,75);
```

### * Interact

 - `void setup()` : 처음 실행될 때 한번 호출되는 초기화 함수
 - `void draw()` : 지속적으로 호출되는 함수

```processing
void setup(){
    size(1000,800);
}

void draw(){
  background(0);

  stroke(255, 255, 255);
  fill(160, 220, 90);
  ellipse(250, 200, 300, 300);

  fill(160, 210, 230);
  rect(250, 200, 100, 75);
}
```

여기서 움직이는 애니메이션 만들기

```processing
void setup() {
  size(500,400);
}

void draw() {
  background(0);

  stroke(255);
  fill(128);
  ellipse(mouseX, mouseY, 100, 100);
}
```

setup 메소드와 draw 메소드를 이해하는 예제

```processing
void setup() {
  size(500,400);
  background(0);
}

void draw() {
  stroke(255);
  fill(128);
  ellipse(mouseX, mouseY, 100, 100);
}
```

### * More Interact

Conditional Statement와 같은 제어문법들을 사용해 더욱 Interactive한 프로그래밍을 해보자

```processing
void setup() {
  size(500,400);
  background(0);
}

void draw() {
  if (mousePressed) {
    background(0);
  }

  stroke(255);
  fill(128);
  ellipse(mouseX, mouseY, 100, 100);
}
```