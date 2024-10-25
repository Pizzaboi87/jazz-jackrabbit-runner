import { ctx } from "./kaplayCtx";
import { game } from "./scenes/game";
import { gameOver } from "./scenes/gameOver";
import { mainMenu } from "./scenes/mainMenu";
import { opening } from "./scenes/opening";

// Load graphic assets
ctx.loadSprite("openBackground", "graphics/openBackground.png");
ctx.loadSprite("background", "graphics/background.png");
ctx.loadSprite("gameOverBackground", "graphics/gameOver.jpg");
ctx.loadSprite("platform", "graphics/platform.png");
ctx.loadSprite("logo", "graphics/logo.png");
ctx.loadSprite("subtitle", "graphics/subtitle.png");
ctx.loadSprite("lose", "graphics/lose.png");
ctx.loadSprite("win", "graphics/win.png");

ctx.loadSpriteAtlas("graphics/jazz.png", {
    "player-run": {
        x: 0,
        y: 0,
        width: 352,
        height: 43,
        sliceX: 8,
        anims: {
            run: { from: 0, to: 7, loop: true, speed: 20 }
        }
    },
    "player-jump": {
        x: 0,
        y: 45,
        width: 290,
        height: 41,
        sliceX: 8,
        anims: {
            jump: { from: 0, to: 7, loop: true, speed: 80 }
        }
    }
})
ctx.loadSprite("diamond", "graphics/diamond.png", {
    sliceX: 8,
    sliceY: 1,
    anims: {
        spin: {
            from: 0,
            to: 7,
            loop: true,
            speed: 30
        }
    }
});
ctx.loadSpriteAtlas("graphics/turtle.png", {
    "turtle": {
        x: 0,
        y: 0,
        width: 888,
        height: 63,
        sliceX: 12,
        anims: {
            run: { from: 0, to: 11, loop: true, speed: 8 }
        }
    },
});

// Load font assets
ctx.loadFont("yewb", "fonts/yewb.ttf");

// Load sound assets
ctx.loadSound("hurtSound", "sounds/hurt.mp3");
ctx.loadSound("hitSound", "sounds/hitEnemy.mp3");
ctx.loadSound("jumpSound", "sounds/jump.mp3");
ctx.loadSound("diamondSound", "sounds/diamond.mp3");
ctx.loadSound("gameMusic", "sounds/gameMusic.mp3");
ctx.loadSound("menuMusic", "sounds/menuMusic.mp3");
ctx.loadSound("gameOver", "sounds/gameOver.mp3");

// Declare scenes and set the initial scene
ctx.scene("opening", opening)
ctx.scene("main-menu", mainMenu)
ctx.scene("game", game)
ctx.scene("game-over", gameOver)

ctx.go("opening");