var monkey, monkey_running;
var ground;

var bananaGroup, bananaImage;

var obstacleGroup, obstacleImage;
var score = 0;

function preload(){
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
  
}

function setup(){
  createCanvas(400, 400);
  
  monkey = createSprite(50, 315, 20, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
}

function draw(){
  background("lightblue");
  
   if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -15;
     
    }
  monkey.velocityY = monkey.velocityY + 0.9;
  
  text("Score: "+ score, 300,50);
  
  if(ground.x < 0 ){
    ground.x = ground.width/2
  }
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach (-1);
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    
  }
  
  score = score+Math.round(getFrameRate()/60);
  
  
  monkey.collide(ground);
  spawnBananas();
  spawnObstacles();
  drawSprites();
  
  
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 150 === 0) {
    var obstacle = createSprite(400,320,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -5;
    
     //assign lifetime to the variable
    obstacle.lifetime = 300;
    
    
    //add each cloud to the group
    obstacleGroup.add(obstacle);
  }
}

