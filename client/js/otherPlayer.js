import Player from './player.js';

/**
 * Creates the enemy Players character that move around a game map
 */
export default class OtherPlayer extends Player {
    constructor(spriteimg, name, alias, order, color, reload, startingX, startingY, websocket){
        super(spriteimg, name, alias, order, color, reload, startingX, startingY, websocket)
    }

}