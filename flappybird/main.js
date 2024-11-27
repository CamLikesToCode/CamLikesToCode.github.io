const canvas = document.getElementById("background");
const context = canvas.getContext("2d");
time = 0;
score = 0;

function drawRectangle(x, y, w, h, color){
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}


a = 0;
let gameOver = false;
let birdyvelocity = 0;
let bird2velocity = 0;
let gravity = 1;

let bird = new Image();
bird.src = "turtle_pic.png";
let bird2 = new Image();
bird2.src = "jellyfish.png"

let pipeflipped = new Image();  
pipeflipped.src = "upside_pipe.png";

let pipe = new Image();
pipe.src = "middle_pipe.png";

let birdata = {x: 50, y: 75, w: 50, h: 50};
let birddata2 = {x: 50, y: 375, w: 50, h:50};

let pipes = [];
let flipipes = [];

let pipewidth = 500;

function drawBird(){
    context.drawImage(bird, birdata.x, birdata.y, birdata.w, birdata.h);
    context.drawImage(bird2, birddata2.x, birddata2.y, birddata2.w, birddata2.h);
}


function drawPipes(){
    for (let i = 0; i < pipes.length; i++){ 
        context.drawImage(pipe, pipes[i].x, pipes[i].y + 300, 65, 130); 
        
        context.drawImage(pipe, pipes[i].x, pipes[i].y, 65, 130); 
        context.drawImage(pipeflipped, flipipes[i].x, flipipes[i].y - 300, 75, 300);

        pipes[i].x = pipes[i].x - 1;
        flipipes[i].x = flipipes[i].x - 1;

        // INVAL: drawRectangle(pipes[i].x, flipipes[i].y, 65, 200, "#d9e4ff")
    }

    //context.drawImage(pipe, pipes[0], pipes[1], 350, 300);
    //context.drawImage(pipeflipped, pipe_x, upsidepipe_y, 350, 300);
}

function generatePipe(){
    pipey =  Math.random()* 100 + 200
    pipes.push({x: canvas.width, y: pipey, passing: false});
    flipipes.push({x: canvas.width, y: pipey -300 + 170, passing: false});
}

document.addEventListener("keydown",function(event){
    if (event.code === "Space"){
        birdyvelocity = - 10;
    }
    if (event.code === "ArrowUp"){
        bird2velocity = - 10;
    }
    
})

function gameEnd(){
    birdyvelocity = 0;
    birdata.y = 150;
    pipe_x = 600;
    pipe_y = Math.random()*199+301;
    upsidepipe_y = Math.random()*100+-200;
}

document.addEventListener("keydown", function(event){
    if (event.code === "KeyR"){
        gameEnd();
    }
})



function gameLoop(){
    context.clearRect(0,0,canvas.width, canvas.height);
    drawRectangle(0, 300, 800, 3);
    
    time++;
    if (time%400 == 2){
        
        generatePipe();
        
    }
    birdyvelocity = birdyvelocity + gravity;
    bird2velocity = bird2velocity + gravity;
    birdata.y = birdata.y + birdyvelocity;
    birddata2.y = birddata2.y + bird2velocity;

    drawPipes();
    drawBird();
    screencollisiontop();
    screencollisionbottom();
    pipecollision();
    scoring();

    if (gameOver == false)
        requestAnimationFrame(gameLoop);


}

function screencollisiontop(){
       if (birdata.y <= 0){
        gameOver = true;
       }
       if (birddata2.y <= 300){
        gameOver = true;
       }
    }

    function screencollisionbottom(){
        if (birdata.y + birdata.h >= 300){
            gameOver = true;
        }
        if (birddata2.y + birddata2.h >= 600){
            gameOver = true;
        }
     }


function pipecollision(){
    for (let i = 0; i < pipes.length; i++){
        /*if (birdata.y + birdata.h >= pipes[i].y && birdata.x < 130 && birdata.x + birdata.w >= pipes[i].x && birdata.x <= pipes[i].x + 130){
            gameOver = true;
        }
        
        
        if (birdata.y <= flipipes[i].y + 300 && birdata.x < 130 && birdata.x + birdata.w >= flipipes[i].x && birdata.x <= flipipes[i].x + 130 && birdata.y + birdata.h >= flipipes[i].y){
            gameOver = true;
        }
*/
        if (birdata.x + birdata.w >= pipes[i].x && birdata.x < pipes[i].x + 65){ 
            if (birdata.y <= pipes[i].y + 130 && birdata.y + birdata.h >= pipes[i].y){
                gameOver = true;
            }
        } 
        
        if (birddata2.x + birddata2.w >= pipes[i].x && birddata2.x < pipes[i].x + 65){ 
            if (birddata2.y <= pipes[i].y + 130 && birddata2.y + birddata2.h >= pipes[i].y){
                gameOver = true;
            }
        } 

        if (birdata.x + birdata.w >= flipipes[i].x && birdata.x < flipipes[i].x + 75){
            if (birdata.y <= flipipes[i].y){
                gameOver = true;
            }
        }

        if (birddata2.x + birddata2.w >= pipes[i].x && birddata2.x < pipes[i].x + 65){
            if (birddata2.y + birddata2.h >= pipes[i].y + 300){
                gameOver = true;
            }
        }
        

    }
}

function scoring(){
    for (let i = 0; i < pipes.length; i++){
        if (birdata.x > pipes[i].x + 130 && pipes[i].passing == false){
            score = score + 1;
            pipes[i].passing = true;
            console.log(score);
        }
        
    }   
    context.fillStyle = "green";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 100, 25);
    }




function drawRectangle(x, y, w, h, color){
    context.fillStyle = "navy";
    context.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2, false);
    context.fill();
}



bird.onload = function(){
    
}

gameLoop();