class Spriter {

    constructor(context, spriteSheet, spriteW, spriteH, globalFrameCount = 0, globalFrameRate = 1) {
        this.ctx = context;
        this.spriteSheet = spriteSheet;
        this.globalFrameRate = globalFrameRate;
        this.globalFrameCount = globalFrameCount;
        this.globalSpriteWidth = spriteW;
        this.globalSpriteHeight = spriteH;
        this.spriteModes = {};
        this.__resetFrameParams();
        this.loc = {
            x: 0,
            y: 0
        }
        this.currentAnimMode = '';
        this.data = {};
    }

    setLocation(x, y) {
        this.loc = { x, y };
    }

    __resetFrameParams() {
        this.spriteIndex = 0;
        this.currentFrameNumber = 0;
    }

    __getPascalCased(str) {
        return str.slice(0, 1).toUpperCase() + str.slice(1)
    }

    __getGlobalProp(prop) {
        return 'global' + this.__getPascalCased(prop)
    }

    /**
     * @access private
     * @memberof Spriter
     * @param {String} mode The name of the animation mode
     * @param {String} prop The name of the property
     */
    __getPreferred(mode, prop) {
        return this.spriteModes[mode][prop] || this[this.__getGlobalProp(prop)]
    }

    __setupModeParams(options, mode) {
        options.animName = mode;
        options.followPath = !!options.pattern;
        if (options.followPath) {
            options.decodedPath = options.pattern.map(point => {
                return [point[0] * this.__getPreferred(mode, 'spriteWidth'), point[1] * this.__getPreferred(mode, 'spriteHeight')]
            })
        }
    }

    /**
     * 
     * @param {string} string mode 
     * @param {Object} options 
     */

    addMode(mode, options) {
        this.spriteModes[mode] = options;
        this.__setupModeParams(options, mode);
    }

    playNext(mode) {
        this.ctx.clearRect(this.loc.x, this.loc.y, this.__getPreferred(mode, 'spriteWidth'), this.__getPreferred(mode, 'spriteHeight'))
        if (!(this.currentAnimMode === mode)) {
            this.__resetFrameParams();
        }
        this.currentAnimMode = mode;
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
        let { spriteStartX, animName, spriteStartY, frameW, frameH, decodedPath, followPath, positionFunction } = opts
        let pos = positionFunction();
        this.setLocation(pos.x, pos.y);
        context.drawImage(
            this.spriteSheet,
            decodedPath ? decodedPath[this.spriteIndex][0]
                : spriteStartX + this.spriteIndex * this.__getPreferred(animName, 'spriteWidth'),
            decodedPath ? decodedPath[this.spriteIndex][1] : spriteStartY,
            this.__getPreferred(animName, 'spriteWidth'),
            this.__getPreferred(animName, 'spriteHeight'),
            this.loc.x,
            this.loc.y,
            frameW || this.__getPreferred(animName, 'spriteWidth'),
            frameH || this.__getPreferred(animName, 'spriteHeight')
        );
        this.currentFrameNumber += 1;
        if (this.currentFrameNumber === this.globalFrameRate) {
            this.spriteIndex += 1;
            this.currentFrameNumber = 0;
        }
        if (this.spriteIndex === (followPath ? decodedPath.length : this.globalFrameCount)) {
            this.spriteIndex = 0;
            this.currentFrameNumber = 0;
        }
    }

    __getCurrentPreferred(prop) {
        return this.__getPreferred(this.currentAnimMode, prop)
    }


    hasWithin = (x, y) => {
        return (
            (x > this.loc.x) && (x < this.loc.x + this.__getCurrentPreferred('spriteWidth'))
            && (y > this.loc.y) && (y < this.loc.y + this.__getCurrentPreferred('spriteHeight'))
        )
    }

    checkCollisionWith(targetElement) {

        for (let i = 0; i < this.__getCurrentPreferred('spriteWidth'); i++) {
            for (let j = 0; j < this.__getCurrentPreferred('spriteHeight'); j++) {
                if (targetElement.hasWithin(this.loc.x + i, this.loc.y + j))
                    return true
            }
        }
        return false
    }

}