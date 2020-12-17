var dog;
var happyDog;
var dogSitting_image, dogCrouching_image;
var database; 
var foodStock;

function preload(){
dogSitting_image = loadImage("images/dogImg.png");
dogCrouching_image = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  dog = createSprite(250, 300, 20, 50);
  dog = setImage("dog", dogSitting_image);
  
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}

function draw() {  
background(46, 139, 87);

textSize(3);
text("Press the UP Arrow key to feed your doggo", 230, 50);
textSize(2.5);
text("Current foodstock: " + foodStock, 350, 50);

if (keyDown(UP_ARROW)){
  database.ref("Food");
  foodStock = Food - 1
  dog = addImage("dog1", dogCrouching_image);
}

if (foodStock <= 0){
  textSize(3);
  text("You're did good! The milk is over, but you kept your doggo well fed!", 200, 200)
}

  drawSprites();
}


function readStock(data){
  foodStock = data.val();
}

function writeStock(x){
if (x<=0){
  x=0;
} else {if(x>0){
  x - 1;
}}

database.ref('Food').update({
Food:x
})
} 