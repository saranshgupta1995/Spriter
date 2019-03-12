marioSpriter.setLocation(100, 300);
marioSpriter.addMode('walkRight', {
    pattern: [[2, 0], [1, 0], [2, 0], [3, 0]],
    positionFunction: () => {
        let x = marioSpriter.loc.x + 4;
        let y = marioSpriter.loc.y;
        return { x, y }
    }
})


marioSpriter.addMode('walkLeft', {
    pattern: [[2, 0], [3, 0], [2, 0], [1, 0]],
    positionFunction: () => {
        let x = marioSpriter.loc.x - 8;
        let y = marioSpriter.loc.y;
        return { x, y }
    }
})

marioSpriter.data.jumpAnim = {
    gravity: 0.1,
    upThrust: -20,
    jumpFrame: 0,
    alreadyJumping:false
};

let jumpData = marioSpriter.data.jumpAnim;

marioSpriter.addMode('jump', {
    pattern: [[5, 0]],
    positionFunction: () => {
        jumpData.jumpFrame += 1;
        jumpData.alreadyJumping=true;
        let x = marioSpriter.loc.x;
        let y = marioSpriter.loc.y + ((jumpData.upThrust) + (0.5 * jumpData.gravity * jumpData.jumpFrame * jumpData.jumpFrame));
        return { x, y }
    }
})


var allowedKeys = {

    'ArrowRight': () => {
        initMarioWalkingAnimation('walkRight');
    },

    'ArrowLeft': () => {
        initMarioWalkingAnimation('walkLeft');
    },

    'ArrowUp': () => {
        if(!jumpData.alreadyJumping)
        initMarioJumpingAnimation('jump');
    }

}
let runAnimations = () => {


    // Object.keys(keysPressed).forEach(key => {
    //     if (keysPressed[key] && allowedKeys[key])
    //         allowedKeys[key]();
    // })

    Object.keys(keysPressed).forEach(key => {
        if (keysPressed[key] && allowedKeys[key])
            allowedKeys[key]();
    })

    requestAnimationFrame(runAnimations)
}

runAnimations();

// setInterval(()=>{
// }, 0)
