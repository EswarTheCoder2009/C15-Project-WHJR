var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy, boyImg;
var path, pathImg;
var jewel, jewelryImg, cash, cashImg, diamond, diamondImg, sword, swordImg;

var gameOver, gameOverImg;

var edges, select_obstacle;

var treasureCollection = 0;

var jewelGroup, cashGroup, diamondGroup, swordGroup;


function preload() {
  boyImg = loadAnimation("Runner-1.png", "Runner-2.png");
  pathImg = loadImage("Road.png");
  cashImg = loadImage("cash.png");
  diamondImg = loadImage("diamonds.png");
  jewelryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(400, 400);

  path = createSprite(200, 200);
  path.addImage(pathImg);
  path.velocityY = 4;

  boy = createSprite(180, 340, 30, 30);
  boy.addAnimation("running", boyImg);
  boy.scale = 0.08;

  gameOver = createSprite(200, 200);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  edges = createEdgeSprites();

  jewelGroup = createGroup();
  cashGroup = createGroup();
  diamondGroup = createGroup();
  swordGroup = createGroup();
}

function draw() {
  background(0);
  if(gameState === PLAY) {
    boy.x = mouseX;
    boy.collide(edges);
    if(path.y > 400) {
      path.y = height / 2;
    }
    createJewel();
    createCash();
    createDiamond();
    createSword();
      if(boy.isTouching(jewelGroup)) {
        jewelGroup.destroyEach();
        treasureCollection = treasureCollection + 50;
      }else if(boy.isTouching(cashGroup)) {
        cashGroup.destroyEach();
        treasureCollection = treasureCollection + 50;
      }else if(boy.isTouching(diamondGroup)) {
        diamondGroup.destroyEach();
        treasureCollection = treasureCollection + 50;
      }else if(boy.isTouching(swordGroup)) {
        gameState = END;
      }
  }
  if(gameState === END) {
    path.velocityY = 0;
    cashGroup.destroyEach();
    diamondGroup.destroyEach();
    swordGroup.destroyEach();
    jewelGroup.destroyEach();
    boy.visible = false;
    gameOver.visible = true;
  }
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: " + treasureCollection, 10, 30);
}

function createJewel() {
  if(frameCount % 200 === 0) {
    jewel = createSprite(Math.round(random(50, 350)), 0, 10, 10);
    jewel.addImage(jewelryImg);
    jewel.scale = 0.15;
    jewel.velocityY = 6;
    jewel.lifetime = 70;
    jewelGroup.add(jewel);
  }
}

function createCash() {
  if(frameCount % 320 === 0) {
    cash = createSprite(Math.round(random(50, 350)), 0, 10, 10);
    cash.addImage(cashImg);
    cash.scale = 0.15;
    cash.velocityY = 6;
    cash.lifetime = 70;
    cashGroup.add(cash);
  }
}

function createDiamond() {
  if(frameCount % 410 === 0) {
    diamond = createSprite(Math.round(random(50, 350)), 0, 10, 10);
    diamond.addImage(diamondImg);
    diamond.scale = 0.04;
    diamond.velocityY = 6;
    diamond.lifetime = 70;
    diamondGroup.add(diamond);
  }
}

function createSword() {
  if(frameCount % 530 === 0) {
    sword = createSprite(Math.round(random(50, 350)), 0, 10, 10);
    sword.addImage(swordImg);
    sword.scale = 0.15;
    sword.velocityY = 6;
    sword.lifetime = 70;
    swordGroup.add(sword);
  }
}