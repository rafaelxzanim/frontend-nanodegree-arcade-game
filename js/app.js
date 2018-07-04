"use strict";

// Enemies our player must avoid
const Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x +=this.speed * dt;
    
    this.checkBorders();

    this.checkCollisions();
    
};

Enemy.prototype.checkBorders = function() {
    ///Check if the enemy is outside the "screen" and reset X
    if (this.x>900){
        this.x = -50;
        this.speed = getRandomArbitrary(150,350);
    }
};

Enemy.prototype.checkCollisions = function() {
    ///Check if player is in the same position that the enemy is
    ///In this case player will lost 1 life
    ///If life is equal 0 the game will restart
    if (
        (player.y==this.y) && 
        (player.x<Math.round(this.x)+80 && player.x>Math.round(this.x)-30)
     ){
      player.y=380;        
      player.lifecounter--;
      if (player.lifecounter===0)  {
          alert("GAME OVER =(. BEST LUCK NEXT TIME =)");
          game.changeLevel(0);
      }
  }    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function(x,y,speed,sprite) {
     this.x = x;
     this.y = y;
     this.speed = speed;
     this.sprite = sprite;
     this.lifecounter = 3;     
};

Player.prototype.addLife = function(life){
    this.lifecounter += life;
};

Player.prototype.changeAvatar = function(newAvatar) {
    this.sprite = newAvatar;
};

Player.prototype.update = function() {

    this.checkBorders();

    this.checkLifePosition();

    this.checkGemsPositions();

    document.getElementById("lifecounter").innerHTML = `LIFE: ${this.lifecounter}`;   

};

Player.prototype.checkBorders = function() {
    ///Check if player is outside the screen in Y position
    if (this.y<0 || this.y > 380){   
        if(this.y<0) {
            game.changeLevel();
        }        
        this.y = 380;
    }

    ///Check if player is outside the screen in X position
    if (this.x < 0){
        this.x = 0 ;        
    } else if(this.x > 900) {
        this.x = 900 ;
    }
};

Player.prototype.checkLifePosition = function() {
///If player has the same X/Y position than life will be add one more life to the player
   if ( (this.y==life.y) && (this.x==life.x)){       
        if (life_control===0){
            this.addLife(1);
            life_control=1;
            life.x=-100;
            life.y=-100;
        }   
        return;
    }
};

Player.prototype.checkGemsPositions = function() {
///If player has the same X/Y position than GEMS[S] will be highlight the name of GEM
   if (this.x==gemblue.x && this.y==gemblue.y){  
        $("#gemblue").addClass("gemactive");
        gemblue.x=-100;
        gemblue.y=-100; 
    }

    if (this.x==gemgreen.x && this.y==gemgreen.y){
        $("#gemgreen").addClass("gemactive");
        gemgreen.x=-100;
        gemgreen.y=-100;
    }

    if (this.x==gemorange.x && this.y==gemorange.y){
        $("#gemorange").addClass("gemactive");
        gemorange.x=-100;
        gemorange.y=-100; 
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.checkRocksPositions = function(item,  index, keycode) {

    if (keycode==='right'){
            if (((this.x + this.speed + 50)===item.x) && (this.y==item.y)){                           
                return true;
            }                
        } else if (keycode==='left'){
            if (((this.x - (this.speed + 50))===item.x) && (this.y==item.y)) {                       
                return true;
            }
        } else if (keycode === 'up'){
            if (((this.y - (this.speed + 30))===item.y) && (this.x==item.x)){                      
                 return true;
            }        
        } else if (keycode === 'down'){

            if (((this.y + this.speed + 30)===item.y) && (this.x==item.x)) {                            
                return true;
            }
        }     
        return false;
};

Player.prototype.handleInput = function(keycode) {

    let control=[];
    ///check if the next keycode movement will have any rock
    ///the results will be store in control array. after that will search if exist any true result
    ///if true doesn´t move play otherwise move according keycode
    allRocks.forEach(function(value, index) {
        control[index]=this.checkRocksPositions(value, index, keycode); 
        },this);
    let control_temp  = control.indexOf(true);

    ///If control is still false then player will move according keycode
    if (keycode==='right' && control_temp===-1){
        this.x += this.speed + 50;
                
    } else if (keycode==='left' && control_temp===-1){
        this.x -= this.speed + 50;

    } else if (keycode === 'up' && control_temp===-1){
        this.y -= this.speed + 30;
        
    } else if (keycode === 'down' && control_temp===-1){
            this.y += this.speed + 30;
    }   
};

///Create gem class 
const Gem = function(x,y,sprite){
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

///Create life class
const Life = function (x,y,sprite){
  this.x=x;
  this.y=y;
  this.sprite=sprite;
};

Life.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Rock = function (x,y,sprite){
    this.x=x;
    this.y=y;
    this.sprite=sprite;
};
  
///Create rock class
Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);      
};
  
const Game = function (){
    this.level=0;
};

Game.prototype.resetGame = function(){
        this.level=0;
        allEnemies.length=0;
        allRocks.length=0;
        player.x=0;
        player.y=380;
        player.lifecounter = 3;
        $("#gemblue").removeClass("gemactive");
        $("#gemgreen").removeClass("gemactive");
        $("#gemorange").removeClass("gemactive");
};

Game.prototype.changeLevel = function (levelx){    
    
    ///Reset Game
    if (levelx===0){
        this.resetGame();    
    }
    
    life_control=0;
    this.level++;
    
    document.getElementById("level").innerHTML = `LEVEL: ${this.level} \n`;   
    allEnemies.push(new Enemy(0,getRandomYPosition(),getRandomArbitrary(200,350)));
    
    ///Add rocks
    if ((this.level%2)===0){
        allRocks.push(new Rock(randAllPositions[0].posx,randAllPositions[0].posy,'images/Rock.png'));
        randAllPositions.shift();
    }

    ///show Life
    if ((this.level%4)===0){        
        life.x=randAllPositions[0].posx;
        life.y=randAllPositions[0].posy;
        randAllPositions.shift();
    } 
    else
    {
        life.x=-100;
        life.y=-100;
    }

    ///show Blue GEM
    if (this.level===7){                                    
        gemblue.x=randAllPositions[0].posx;
        gemblue.y=randAllPositions[0].posy;
        randAllPositions.shift();
    } 
    else
    {
        gemblue.x=-100;
        gemblue.y=-100;
    }    

    ///show Green GEM
    if (this.level===14){                        
        gemgreen.x=randAllPositions[0].posx;
        gemgreen.y=randAllPositions[0].posy;
        randAllPositions.shift();        
    } 
    else
    {
        gemgreen.x=-100;
        gemgreen.y=-100;
    }  

    ///show Orange GEM
    if (this.level===21){                  
        gemorange.x=randAllPositions[0].posx;
        gemorange.y=randAllPositions[0].posy;
        randAllPositions.shift();        
    } 
    else
    {        
        gemorange.x=-100;
        gemorange.y=-100;
    }      
    
    if (this.level===22){
        alert("Congrats. You are the boss.=)");
        this.level=21;
        game.changeLevel(0);
        return true;
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

const game = new Game(0);
document.getElementById("level").innerHTML = `LEVEL: ${game.level} \n`;   

const allXPositions = [0,100,200,300,400,500,600,700,800,900];
const allYPositions = [60,140,220];

function getRandomXPosition(){
   return allXPositions[Math.floor((Math.random() * 10))];
}

function getRandomYPosition(){
    return allYPositions[Math.floor((Math.random() * 3))];
}
 
let allPositions = [];
///Create an array with all X/Y combinations so this way the game will never have rock/life/gem in the same position
for(let i = 0; i < allXPositions.length; i++) {
     for(let j = 0; j < allYPositions.length; j++) {      
        let temp = [];      
        temp.posx=allXPositions[i];
        temp.posy=allYPositions[j];
        allPositions.push(temp);
     }
}

function shuffle(array) {
    let i = array.length,
        j = 0,
        temp;

    while (i--) {

        j = Math.floor(Math.random() * (i+1));

        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }

    return array;
}

//Random the position, so each game will have different ROCK/LIFE/GEM X/Y positions
const randAllPositions = shuffle(allPositions);

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

let life_control=0;
const allEnemies = [];
const allRocks = [];
const player = new Player(0,380,50,'images/char-boy.png',3);
const life = new Life(-100,-100,'images/Heart.png');
const gemblue = new Gem(-100,-100,'images/Gem Blue.png');
const gemgreen = new Gem(-100,-100,'images/Gem Green.png');
const gemorange = new Gem(-100,-100,'images/Gem Orange.png');
const allGems = [gemblue,gemgreen,gemorange];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});