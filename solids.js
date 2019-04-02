
let pipes = [
    new Image(),
    new Image(),
    new Image()
];

let pipeSprites = [];

pipes.forEach((pipe, i) => {
    pipe.src = "./mario_pipe_png_846100.jpg"
    pipeSprites.push(
        new Spriter(ctx, pipe, 260, 400, 1, 8)
    )
    pipe.onload = () => {
        pipeSprites[i].playNext('still');
    }
})

pipeSprites.forEach((pipe, i) => {
    pipe.setLocation(200 + i * 400, 100);
    pipe.addMode('still', {
        pattern: [[0, 0]],
        positionFunction: () => {
            let x = pipe.loc.x;
            let y = pipe.loc.y;
            return { x, y }
        }
    })

})