import { drawMenuText } from "../elements/menuText";
import { ctx } from "../kaplayCtx";

export const opening = (): void => {
    if (!ctx.getData("best-score")) ctx.setData("best-score", 0);

    ctx.onButtonPress("start", () => ctx.go("main-menu"));

    ctx.add([
        ctx.sprite("openBackground"),
        ctx.anchor("center"),
        ctx.pos(ctx.center().x, ctx.center().y),
        ctx.scale(1.2)
    ]);

    // Draw the menu text
    drawMenuText({ instruction: "Press space to start" });
}