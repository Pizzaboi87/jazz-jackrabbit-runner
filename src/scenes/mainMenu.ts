import { drawEnvironment } from "../elements/environment";
import { drawMenuText } from "../elements/menuText";
import { drawPlayer } from "../entities/player";
import { ctx } from "../kaplayCtx";

export const mainMenu = (): void => {
    const menuMusic = ctx.play("menuMusic", { volume: 0.3, loop: true });
    ctx.onButtonPress("jump", () => {
        menuMusic.stop();
        ctx.go("game");
    });

    // Move the background and platforms to the left
    drawEnvironment({ gameMode: false });

    // Draw the menu text
    drawMenuText({ instruction: "Press JUMP to Play" });

    // Draw the player character
    drawPlayer({ posX: 100, posY: 900 });
}

