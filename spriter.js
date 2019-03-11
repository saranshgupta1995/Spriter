class Spriter {

    constructor(
        spriteSheet,
        spriteW,
        spriteH,
        spriteStartX,
        spriteStartY,
        frameCount,
        frameRate
    ) {
        this.spriteSheet = spriteSheet;
        this.spriteIndex = 0;
        this.spriteW = spriteW;
        this.spriteH = spriteH;
        this.spriteStartX = spriteStartX;
        this.spriteStartY = spriteStartY;
        this.frameCount = frameCount;
        this.frameRate = frameRate;
        this.currentFrameNumber = 0;
        this.funcX = function (x) {
            return x;
        };
        console.log(this);
    }

    updateX(x) {
        return x;
    }

    /**
     * @param {Number} x 
     * @param {Number} y
     */
    updatePos(x, y) {
        return { x, y }
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     * @param {Number} frameX 
     * @param {Number} frameY 
     * @param {Number} frameW 
     * @param {Number} frameH 
     */
    next(context, frameX, frameY, frameW, frameH) {
        let pos = this.updatePos(frameX, frameY);
        context.drawImage(
            this.spriteSheet,
            this.spriteStartX + this.spriteIndex * this.spriteW,
            this.spriteStartY,
            this.spriteW,
            this.spriteH,
            this.updateX(pos.x),
            pos.y,
            frameW,
            frameH
        );
        this.currentFrameNumber += 1;
        if (this.currentFrameNumber === this.frameRate) {
            this.spriteIndex += 1;
            this.currentFrameNumber = 0;
        }
        if (this.spriteIndex === this.frameCount) {
            this.spriteIndex = 0;
            this.currentFrameNumber = 0;
        }
    }
}

class Spritter {

    constructor(context, spriteSheet, spriteW, spriteH, globalFrameCount, globalFrameRate = 1) {
        this.ctx = context;
        this.spriteSheet = spriteSheet;
        this.globalFrameRate = globalFrameRate;
        this.globalFrameCount = globalFrameCount;
        this.globalSpriteWidth = spriteW;
        this.globalSpriteHeight = spriteH;
        this.spriteModes = {};
        this.spriteIndex = 0;
        this.currentFrameNumber = 0;
        console.log(this);
    }

    __getPascalCased(str){
        return str.slice(0, 1).toUpperCase() + str.slice(1)
    }

    __getGlobalProp(prop){
        return 'global' + this.__getPascalCased(prop)
    }

    __getPreferred(mode, prop){
        return this.spriteModes[mode][prop] || this[this.__getGlobalProp(prop)]
    }

    /**
     * 
     * @param {string} string mode 
     * @param {Object} options 
     */

    addMode(mode, options) {
        this.spriteModes[mode] = options;
        options.animName = mode
    }

    /**
     * @param {Number} x 
     * @param {Number} y
     */
    updatePos(x, y) {
        return { x, y }
    }

    playNext(mode) {
        this.next(this.ctx, this.spriteModes[mode])
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     * @param {Number} frameX 
     * @param {Number} frameY 
     * @param {Number} frameW 
     * @param {Number} frameH 
     */

    next(context, opts) {
        let { spriteStartX, animName, spriteStartY, frameX, frameY, frameW, frameH } = opts
        let pos = this.updatePos(frameX, frameY);
        context.drawImage(
            this.spriteSheet,
            spriteStartX + this.spriteIndex * this.__getPreferred(animName,'spriteWidth'),
            spriteStartY,
            this.__getPreferred(animName, 'spriteWidth'),
            this.__getPreferred(animName, 'spriteHeight'),
            pos.x,
            pos.y,
            frameW || this.__getPreferred(animName, 'spriteWidth'),
            frameH || this.__getPreferred(animName, 'spriteHeight')
        );
        this.currentFrameNumber += 1;
        if (this.currentFrameNumber === this.globalFrameRate) {
            this.spriteIndex += 1;
            this.currentFrameNumber = 0;
        }
        if (this.spriteIndex === this.globalFrameCount) {
            this.spriteIndex = 0;
            this.currentFrameNumber = 0;
        }
    }

}