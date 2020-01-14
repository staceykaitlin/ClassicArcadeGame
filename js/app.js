let game = true;

var Enemy = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png'; //Sets Enemy image
    this.height = 65;
    this.width = 95; //Sets Enemy height and width
    this.collision = false;
};


Enemy.prototype.update = function(dt) {
  this.x += 95 * dt;
  if (this.x > ctx.canvas.width + this.width){
      this.x = -200 * Math.floor(Math.random() * 4) + 1; //Resets the bugs and places them at a random number between 1 - 4
  } else {
      this.x += 95 * dt; //Makes bugs continue
  }

  //Checks if there has been a collision

  if (this.x < player.x + 60 &&
     this.x + 60 > player.x &&
     this.y < player.y + 40 &&
     40 + this.y > player.y) {
       this.collision = true;

       if (player) {
         player.x = 202;
         player.y = 400;
       }

       else {
         this.collision = false;
       }
     }

};


Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); // Renders the sprite
};

var Player = function(x,y, sprite){
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.height = 75; //Sets Sprite height and width
    this.width = 65;
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); //Renders sprite
}

Player.prototype.update = function(dt) {

  //Checks if player has made it to the lake and if so runs 'won' function
  if (game && player.y < 40) {
      game = false;
      won();
  }

};

Player.prototype.handleInput = function(direction){
    const horizontal = 101, //Sets amount to move for Sprite
          vertical = 83;

// Tells the Sprite how to move and stops it from moving off screen
    if (direction === 'left' && this.x - horizontal >= 0){
      this.x -= horizontal;
    } else if (direction === 'right' && this.x + horizontal < ctx.canvas.width){
      this.x += horizontal;
    } else if (direction === 'down' && this.y + vertical < ctx.canvas.height - 200){
      this.y += vertical;
    } else if (direction === 'up' && this.y - vertical > 0 - player.height){
      this.y -= vertical;
    }
}


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

const enemyPosition = [55, 140, 230]; //Set's enemy positions


const player = new Player(202, 400, 'images/char-boy.png'); //Set's Sprite image and start position
let allEnemies = enemyPosition.map((y, index) => {
  return new Enemy( (-100 * (index + 1)), y); //Sets Enemy start positions off the board
});

//Runs the reset function and logs won to the console
function won (){
  reset();
  console.log('won');
}

//Resets the bugs
function reset (){
  allEnemies = [];
}
