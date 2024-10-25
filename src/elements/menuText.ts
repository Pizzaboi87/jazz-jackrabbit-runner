import { ctx } from "../kaplayCtx";

export const drawMenuText = ({ instruction }: { instruction: string }): void => {
    const notOpenScreen = !instruction.includes("space");

    // Add the title text and instructions
    ctx.add([
        ctx.sprite("logo"),
        ctx.anchor("center"),
        ctx.pos(ctx.center().x - (notOpenScreen ? 0 : 400), ctx.center().y - 200),
        ctx.scale(0.3)
    ]);

    ctx.add([
        ctx.sprite("subtitle"),
        ctx.anchor("center"),
        ctx.pos(ctx.center().x - (notOpenScreen ? -80 : 300), ctx.center().y - 80),
        ctx.scale(0.6)
    ])

    {
        notOpenScreen && ctx.add([
            ctx.text('For jumping, press "space", "UP" or "W" button', {
                font: "yewb",
                size: 25,
            }),
            ctx.anchor("center"),
            ctx.pos(ctx.center().x, ctx.center().y + 50),
            ctx.color(40, 40, 40),
        ])

        notOpenScreen && ctx.add([
            ctx.text('Press the "Esc" key to exit full screen.', {
                font: "yewb",
                size: 25,
            }),
            ctx.anchor("center"),
            ctx.pos(ctx.center().x, ctx.center().y + 100),
            ctx.color(40, 40, 40),
        ])
    }

    ctx.add([
        ctx.text(instruction, {
            font: "yewb",
            size: 25,
        }),
        ctx.anchor("center"),
        ctx.pos(ctx.center().x, ctx.center().y + 250),
        ctx.color(notOpenScreen ? [40, 40, 40] : [255, 255, 255])
    ]);
}