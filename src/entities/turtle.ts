import { GameObj } from "kaplay";
import { ctx, gameState } from "../kaplayCtx";

export const drawTurtle = ({ posX, posY }: { posX: number, posY: number }): GameObj => {
    const turtle = ctx.add([
        "enemy",
        ctx.sprite("turtle", { anim: "run" }),
        ctx.area(),
        ctx.scale(3),
        ctx.anchor("center"),
        ctx.pos(posX, posY),
        ctx.offscreen(),
    ]);

    return turtle;
};

export const spawnTurtle = (): void => {
    const turtle = drawTurtle({ posX: 1920, posY: 888 });
    turtle.onUpdate(() => {
        if (gameState.gameSpeed < 3000) {
            turtle.move(-(gameState.gameSpeed + 300), 0);
        } else {
            turtle.move(-gameState.gameSpeed, 0);
        }
    });

    turtle.onExitScreen(() => {
        if (turtle.pos.x < 0) {
            ctx.destroy(turtle);
        }
    });

    const waitTime = ctx.rand(0.5, 2.5);
    ctx.wait(waitTime, () => {
        spawnTurtle();
    });
}