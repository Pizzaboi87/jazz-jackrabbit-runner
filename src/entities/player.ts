import { ctx } from "../kaplayCtx";

interface Player {
    isGrounded: () => boolean;
    play: (anim: string) => void;
    jump: () => void;
    onGround: (callback: () => void) => void;
    setControls: () => void;
    setEvents: () => void;
    use: (sprite: any) => void;
    isExtraJump: boolean;
    scoreCollect: any;
    switchSprite: (spriteName: string) => void;
}

export const drawPlayer = ({ posX, posY }: { posX: number, posY: number }): Player => {
    const player = ctx.add([
        "player",
        ctx.sprite("player-run", {
            anim: "run"
        }),
        ctx.scale(3),
        ctx.anchor("center"),
        ctx.pos(posX, posY),
        ctx.area(),
        ctx.body({ jumpForce: 1700 }),
        {
            isExtraJump: false,
            scoreCollect: {},

            switchSprite(this: Player, spriteName: string) {
                this.use(ctx.sprite(spriteName));
                if (spriteName === "player-run") {
                    this.play("run");
                } else if (spriteName === "player-jump") {
                    this.play("jump");
                }
            },

            setControls(this: Player) {
                ctx.onButtonPress("jump", () => {
                    if (this.isGrounded()) {
                        this.switchSprite("player-jump");
                        this.jump();
                        ctx.play("jumpSound", { volume: 0.2 });
                    }
                });
            },

            setEvents(this: Player) {
                this.onGround(() => {
                    this.switchSprite("player-run");
                    this.isExtraJump = false;
                });
            },
        }
    ]);

    player.scoreCollect = player.add([
        ctx.text("", { font: "yewb", size: 20 }),
        ctx.color(150, 20, 70),
        ctx.anchor("center"),
        ctx.pos(30, -10)
    ])

    return player;
};