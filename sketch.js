var bg
var play,playbg
var gameState="wait"
var trex 
var obstacle
var trex_img
var logo
var zombieRunning
var zombie
var how,howbg
var personDie,personHurt,personJump,personRun
var rand,obstaclesGroup
var obs1_img , obs2_img , obs3_img , obs4_img , obs4_img 
var invisibleground
var score=0
var score1=0

var coinscore=0

var coin
var coinsGroup
//https://www.freepik.com/free-vector/dinosaurs-cartoon-character-nature-scene_12365469.htm#position=5


function preload(){

//zombieRunning = loadAnimation("new-image/e1.png","new-image/e2.png","new-image/e3.png","new-image/e4.png","new-image/e5.png","new-image/e6.png","new-image/e7.png","new-image/e8.png");
bgimg = loadImage("bg.jpg");
logoimg=loadImage("logo.gif")
playbg=loadImage("images/playbg.gif")


personDie = loadAnimation("boy/d1.png","boy/d2.png","boy/d3.png","boy/d4.png","boy/d5.png","boy/d6.png","boy/d7.png","boy/d8.png","boy/d9.png","boy/d10.png")
personHurt = loadAnimation("boy/h1.png","boy/h2.png","boy/h3.png","boy/h4.png","boy/h5.png","boy/h6.png","boy/h7.png","boy/h8.png","boy/h9.png")
personJump = loadAnimation("boy/j1.png","boy/j2.png","boy/j3.png","boy/j4.png","boy/j5.png","boy/j6.png","boy/j7.png","boy/j8.png","boy/j9.png","boy/j10.png")
//personRun =  loadAnimation("boy/r1.png","boy/r2.png","boy/r3.png","boy/r4.png","boy/r5.png","boy/r6.png","boy/r7.png","boy/r8.png","boy/r9.png","boy/r10.png")
personRun = loadAnimation("boy/h1.png","boy/h2.png","boy/h3.png","boy/h4.png","boy/h5.png","boy/h6.png")
personRunleft = loadAnimation("boy/h1l.png","boy/h2l.png","boy/h3l.png","boy/h4l.png","boy/h5l.png","boy/h6l.png")

coinimg=loadAnimation("coin/c1.png","coin/c2.png","coin/c3.png","coin/c4.png","coin/c5.png","coin/c6.png","coin/c7.png","coin/c8.png","coin/c9.png","coin/c10.png",)
butterflyimg=loadAnimation("butterfly/b1.png","butterfly/b2.png","butterfly/b3.png","butterfly/b4.png","butterfly/b5.png","butterfly/b6.png","butterfly/b7.png","butterfly/b8.png","butterfly/b9.png","butterfly/b10.png","butterfly/b11.png","butterfly/b12.png","butterfly/b13.png","butterfly/b14.png","butterfly/b15.png","butterfly/b16.png",)

obs1_img = loadImage("images/obs1.png")
obs2_img = loadImage("images/obs2.png")
obs3_img = loadImage("images/obs3.png")
obs4_img = loadImage("images/obs4.png")
obs5_img = loadImage("images/obs5.png")

popupimg=loadImage("images/box2.png")
font=loadFont("fonts/fascinate.ttf")

}
function setup(){
    
createCanvas(windowWidth-20,windowHeight-20)
    
textFont(font)
logo=createSprite(windowWidth/2,windowHeight/4)
logo.addImage(logoimg)
logo.visible=false
logo.scale=2

  play=createImg("play.png")  
  play.position(logo.x-(logo.width/2),height/2+100)
  play.size(150,150)
  
  
home=createImg("home.png")
home.position(logo.x+(logo.width/2),height/2+100)
home.size(150,150)


  
how=createImg("about.png")
how.position((width/2),height/2+100)
how.size(150,150)

player=createSprite(100,windowHeight-150)
player.addAnimation("running",personRun)
player.addAnimation("runningleft",personRunleft)
player.addAnimation("jumping",personJump)
player.visible=false
player.scale=1.75
  
/*sound=createImg("sound.png")
sound.position(windowWidth-200,windowHeight-200)
sound.size(100,100)*/

popup1=createSprite(windowWidth/2,windowHeight/2)
popup1.addImage(popupimg)
popup1.scale=1.5
popup1.visible=false

slider=createSlider(0,1,0.5,0.1)
slider.position(50,windowHeight-50)


obstaclesGroup = new Group()
coinsGroup = new Group()

invisibleground= createSprite(windowWidth/2,windowHeight-10,windowWidth,20)
invisibleground.debug=true
invisibleground.visible=false
player.debug=true
player.setCollider("rectangle",0,0,player.width-35,player.height-25)
}
                            
function draw(){

  player.collide(invisibleground)
  if(gameState==="wait"){
background(bgimg)
popup1.visible=false
logo.visible=true
how.show()
player.visible=false


}

if(play.mousePressed(()=>{
  gameState = "play"
  
}))


if(how.mousePressed(()=>{
  gameState = "how"
  popup1.visible=true

how.hide()

}))

if(home.mousePressed(()=>{
  gameState = "wait"

}))

if (gameState==="play"){
  background(playbg)
  popup1.visible=false
  logo.visible=false
  play.hide()
  home.hide()
  how.hide()
  player.visible=true

score1 = score1 + Math.round((getFrameRate()/60))
score= Math.round(score1/4)

for(i=0;i<=len(coinsGroup);i++){
if(player.isTouching(get.coinsGroup(i))){
  get.coinsGroup(i).destroy()

coinscore +=1
coinsGroup.destroyEach()

}}

/*for(var i  = 0;i<coingroup.length;i++){
    if(coingroup.get(i).isTouching(runner)){ 
        coingroup.get(i).destroy()
        score = score +1
        coinsound.play();
      } 
 }*/

spawnobstacles()
spawnCoins()

if(player.x<=0){
  player.x= windowWidth-100
  player.changeAnimation("runningleft",personRunleft)
}
   

if(player.x>=windowWidth){
  player.x= 10
  player.changeAnimation("running",personRun)
}
   
if(keyDown("space") && player.y>= windowHeight-150 ){
  player.velocityY= -25

//player.changeAnimation("jumping",personJump)
}
player.velocityY +=0.8


if(keyDown(LEFT_ARROW)){
  player.x  -=5

player.changeAnimation("runningleft",personRunleft)
}

if(keyDown(RIGHT_ARROW)){
  player.x  +=5
  player.changeAnimation("running",personRun)

}




}
//console.log(player.y)
console.log(windowHeight)


if (gameState==="how"){
 // background(howbg)
 player.visible=false

}
drawSprites();
if(gameState==="play"){
  fill("red")
  stroke("green")
  strokeWeight(4)
  textSize(40)
  text("SCORE : " +score,windowWidth/8,100)
  text("COINS COLLECTED : " +coinscore,windowWidth/1.7-50,100)
}
if (gameState==="wait")
{
  fill("red")
  stroke("green")
  strokeWeight(4)
  textSize(120)
  text("Mighty Dragons", displayWidth/5.5,displayHeight/2.25)
}} 

/*function vidLoad() {
  if(gameState==="wait"){
  logo.loop();}
  logo.size(windowWidth, windowHeight)
  
}*/

function spawnobstacles(){
if(frameCount %200 === 0){
  obstacle = createSprite(windowWidth,windowHeight-150)
obstacle.velocityX=-2
  rand=Math.round(random(1,3))
  obstacle.scale=0.5
  obstacle.debug=true

  switch(rand){
       
    case 1: obstacle.addImage(obs2_img)
    break;

    case 2: obstacle.addImage(obs3_img)
    break;
    
    case 3: obstacle.addImage(obs5_img)
    break;

    default: break

  }
  obstaclesGroup.add(obstacle)

}

}

function spawnCoins(){
  if(frameCount %250 === 0){
    coin = createSprite(windowWidth,windowHeight-150)
    coin.y=Math.round(random(100,windowHeight-100))
  coin.velocityX=-2
    rand=Math.round(random(1,2))
    //coin.scale=0.5
    coin.debug=true
    
  
    switch(rand){
      case 1: coin.addAnimation("coin",coinimg)
      coin.scale=1
      break;
      
           
      case 2: coin.addAnimation("butterfly",butterflyimg)
      coin.scale=0.65
      break;
   
      default: break
  
    }
    coinsGroup.add(coin)
  
  }
  
  }