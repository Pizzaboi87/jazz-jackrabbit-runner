import { GameObj } from "kaplay";
import { ctx, gameState } from "../kaplayCtx";

export const drawScoreText = (): GameObj => {
    const scoreText = ctx.add([
        ctx.text("SCORE: " + gameState.score, {
            font: "yewb",
            size: 50,
        }),
        ctx.pos(20, 20)
    ]);

    return scoreText;
}