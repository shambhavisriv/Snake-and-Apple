function init(){
    var canvas = document.getElementById('incanvas');
    W = H = canvas.width = canvas.height = 800;
    pen  = canvas.getContext('2d');
    cs = 50;
    score = 0;
    game_over = false;
    food_img  =new Image();
    food_img.src  = "https://img.icons8.com/emoji/2x/red-apple.png";
    trophy = new Image();
    trophy.src = "https://img.icons8.com/plasticine/2x/uefa-euro-trophy.png";
    food = getRandomFood();
    Snake  = {
        init_len : 5,
        color : "midnightblue",
        cells : [],
        direction:"right",
        createSnake :function(){
            for(var i = this.init_len;i>0;i--){
                this.cells.push({x:i,y:0});
            }
        },
        drawSnake : function(){
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-2);
                
            }
        },
        updateSnake : function(){
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            if(headX == food.x && headY == food.y){
                console.log("food eaten");
                food = getRandomFood();
                score++;
            }
            else{
                this.cells.pop();
            }
            
          
            var nextX ,nextY;
            if(this.direction == "right"){
                nextX = headX + 1;
                nextY = headY;
            }
            else if(this.direction == "left"){
                nextX = headX - 1;
                nextY = headY;
            }
            else if(this.direction == "down"){
                nextX = headX;
                nextY = headY+1;

        }
        else{
            nextX = headX;
            nextY = headY-1;

        }
        this.cells.unshift({x:nextX ,y:nextY});
           var last_x = Math.round(W/cs);
           var last_y = Math.round(H/cs);
           if(this.cells[0].y<0|| this.cells[0].x<0|| this.cells[0].x>last_x|| this.cells[0].y>last_y)
           game_over = true;
        }
    };
    Snake.createSnake();
    function keypressed(e){
        if(e.key == "ArrowRight"){
            Snake.direction = "right";
        }
        else if(e.key == "ArrowLeft"){
            Snake.direction = "left";
        }
        else if(e.key == "ArrowDown"){
            Snake.direction = "down";
        }
        else{
            Snake.direction = "up";
        }
        console.log(Snake.direction);
    }
    document.addEventListener('keydown',keypressed);




}
function draw(){
    pen.clearRect(0,0,W,H);
    Snake.drawSnake();
    pen.fillStyle = food.color;
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
    pen.drawImage(trophy,18,20,cs,cs);
    pen.fillStyle = "black";
    pen.font = "20px Roboto";
    pen.fillText(score,50,50);

   
}
function update(){
    Snake.updateSnake();
}
function getRandomFood(){
    var foodX = Math.round(Math.random()*(W-cs)/cs);
    var foodY = Math.round(Math.random()*(H-cs)/cs);
    var food = {
        x : foodX,
        y : foodY,
        color: "red",
    }
    return food;
}


function gameloop(){
    if(game_over == true){
        clearInterval(f);
        alert("game over");
        return;
    }
    draw();
    update();
}
init();
var f = setInterval(gameloop,200);