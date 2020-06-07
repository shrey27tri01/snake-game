var snake;
var scl = 20;
var food;

function setup () {
    createCanvas(600, 600);
    snake = new Snake();
    
    frameRate(10);
    pickLocation();
}

function draw() {
    background(51);
    snake.update();
    snake.show();

    if (snake.eat(food) === true) {
        pickLocation();
    };

    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);
}

function pickLocation() {
    var cols = floor(width / scl);
    var rows = floor(height / scl);

    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        snake.dir(0, -1);
    }
    else if (keyCode === DOWN_ARROW) {
        snake.dir(0, 1);
    }
    else if (keyCode === LEFT_ARROW) {
        snake.dir(-1, 0);
    }
    else if (keyCode === RIGHT_ARROW) {
        snake.dir(1, 0);
    }
}

//This is just an object denoting the snake object
class Snake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xSpeed = 1;
        this.ySpeed = 0;

        this.update = function () {
            this.x = this.x + this.xSpeed * scl;
            this.y = this.y + this.ySpeed * scl;

            this.x = constrain (this.x, 0, width - scl);
            this.y = constrain (this.y, 0, width - scl);
        };

        this.eat = function(pos) {
            var distance = dist(this.x, this.y, pos.x, pos.y);
            if (distance < 1) {
                return true;
            }
            else {
                return false;
            }
        }

        this.show = function () {
            fill(255);
            rect(this.x, this.y, scl, scl);
        };

        this.dir = function (x, y) {
            this.xSpeed = x;
            this.ySpeed = y;
        }
    }
}
