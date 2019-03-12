let canvas = document.getElementById("cnv_bg");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let baseY = 300;

let marioSprite = new Image();
marioSprite.src = "./super-mario-sprite.png";

let marioSpriter = new Spritter(ctx, marioSprite, 32, 68, 1, 8);

let initMarioWalkingAnimation = (mode) => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    marioSpriter.playNext(mode, [])
};

let initMarioJumpingAnimation = (mode) => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    marioSpriter.playNext(mode, [])
    requestAnimationFrame(initMarioJumpingAnimation.bind(this, mode))
};

var keysPressed = {};

onkeydown = onkeyup = (e) => {
    keysPressed[e.key] = e.type === 'keydown';
    // console.log(keysPressed)
    // runAnimations();
}
