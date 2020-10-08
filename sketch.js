var dog, happydog, dogImage, database, foodS;

function preload() {
  dogImage = loadImage("Dog.png");
  happydog = loadImage("happydog.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();

  dog = createSprite(250, 250, 50, 50);
  dog.addImage(dogImage);
  dog.scale = 0.3

  var foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happydog);
    dog.scale = 0.3;
  }

  drawSprites();
  //add styles here

}
function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if (x <= 0) {
    x = 0;
  }
  else {
    x = x - 1;
  }
  database.ref('/').update({
    Food: x
  })
}



