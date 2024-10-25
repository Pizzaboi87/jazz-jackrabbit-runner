import { AudioPlay, GameObj } from "kaplay";
import { ctx, gameState } from "../kaplayCtx";

export const playAgainText = ({ x, y, sound }: { x: number, y: number, sound: AudioPlay }) => {
    let textObj: GameObj | null = null;

    // Text flashing
    ctx.loop(1, () => {
        if (textObj) {
            // If there is text, destroy it
            textObj.destroy();
            textObj = null;
        } else {
            // If there is no text, create it
            textObj = ctx.add([
                ctx.text("Press JUMP to Play Again", { size: 40 }),
                ctx.pos(x, y + 350),
                ctx.anchor("center"),
                ctx.color(255, 255, 255)
            ]);
        }
    });

    // Button press to restart the game
    ctx.onButtonPress("jump", () => {
        sound.stop();
        gameState.reset();
        ctx.go("game");
    });
};
