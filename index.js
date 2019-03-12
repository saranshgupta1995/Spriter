let canvas = document.getElementById("cnv_bg");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let baseY=300;

let marioSprite = new Image();
marioSprite.src = "./super-mario-sprite.png";
marioSprite.onload = () => {
    initMarioWalkingAnimation();
};

let marioWalkRight = new Spriter(marioSprite, 32, 68, 32, 0, 2, 4);
let dupMarioWalkRight = new Spritter(ctx, marioSprite, 32, 68, 1, 4);
let frameCount = 0;

dupMarioWalkRight.addMode('walkRight',{
    frameX: 100,
    frameY: 100,
    pattern: [[1, 0], [2, 0], [3, 0], [2, 0]]
})

let initMarioWalkingAnimation = (speed) => {

    dupMarioWalkRight.updatePos = (x, y) => {
        x += frameCount * speed;
        return { x, y }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    marioWalkRight.next(ctx, 0, baseY, 32, 68);
    dupMarioWalkRight.playNext('walkRight',[])
    frameCount += 1;
};

let initMarioJumpingAnimation = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    marioWalkRight.next(ctx, 0, baseY, 32, 68);
    frameCount += 1;

    requestAnimationFrame(initMarioJumpingAnimation);
};

let marioSpeed=2;

var keysPressed = {};

onkeydown = onkeyup = (e) =>{
    keysPressed[e.key] = e.type === 'keydown'
}

document.addEventListener('keydown',(e)=>{

    var allowedKeys ={
        
        'ArrowRight':()=>{
            marioSpeed+=0.2;
            initMarioWalkingAnimation(Math.min(6, marioSpeed));
        },
        
        'ArrowLeft':()=>{
            marioSpeed+=0.1;
            initMarioWalkingAnimation(Math.min(10, marioSpeed));
        }

    }

    if(allowedKeys[e.key])
        allowedKeys[e.key]();

})