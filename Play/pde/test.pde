PImage car;

void setup(){
  size(800,600);
  car = loadImage("lamborghini.png");
}

void draw(){
   try{
     //image(car,0,0);
     loadPixels();
     car.loadPixels();
     for(int x = 0; x < width; x++){
       for(int y = 0; y < height; y++){
          int loc = x + y * width;
          pixels[loc] = car.pixels[loc];
       }
     }
     updatePixels();
     
   }catch(Exception e){
      e.printStackTrace();
      exit();
   }
  
}
