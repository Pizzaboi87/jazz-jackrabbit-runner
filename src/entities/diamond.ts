import { GameObj } from "kaplay";
import { ctx, gameState } from "../kaplayCtx";

export const drawDiamond = ({ posX, posY }: { posX: number, posY: number }): GameObj => {
    const diamond = ctx.add([
        "diamond",
        ctx.sprite("diamond", { anim: "spin" }),
        ctx.area(),
        ctx.scale(1.5),
        ctx.anchor("center"),
        ctx.pos(posX, posY),
        ctx.offscreen(),
    ]);

    return diamond;
}

export const spawnDiamond = (): void => {
    const diamond = drawDiamond({ posX: 2250, posY: ctx.rand(300, 800) });
    diamond.onUpdate(() => {
        if (gameState.gameSpeed < 3000) {
            diamond.move(-(gameState.gameSpeed + 300), 0);
        } else {
            diamond.move(-gameState.gameSpeed, 0);
        }
    });

    diamond.onExitScreen(() => {
        if (diamond.pos.x < 0) {
            ctx.destroy(diamond);
        }
    });

    const waitTime = ctx.rand(0.1, 1.5);
    ctx.wait(waitTime, () => {
        spawnDiamond();
    });
}