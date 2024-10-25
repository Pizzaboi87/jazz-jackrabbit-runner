import { ctx, gameState } from "../kaplayCtx";

export const drawEnvironment = ({ gameMode }: { gameMode: boolean }): void => {
    const bgPieceWidth = 1920;
    const bgPieces = [
        ctx.add([
            ctx.sprite("background"),
            ctx.pos(0, 0),
            ctx.scale(1),
            ctx.opacity(1)
        ]),
        ctx.add([
            ctx.sprite("background"),
            ctx.pos(bgPieceWidth, 0),
            ctx.scale(1),
            ctx.opacity(1)
        ])
    ];

    const platformWidth = 1791 * 2;
    const platforms = [
        ctx.add([
            ctx.sprite("platform"),
            ctx.pos(0, 960),
            ctx.scale(2),
            ctx.opacity(1)
        ]),
        ctx.add([
            ctx.sprite("platform"),
            ctx.pos(platformWidth, 960),
            ctx.scale(2),
            ctx.opacity(1)
        ])
    ];

    if (gameMode) {
        ctx.add([
            "ground",
            ctx.rect(1920, 140),
            ctx.opacity(0),
            ctx.pos(0, 960),
            ctx.area(),
            ctx.body({ isStatic: true })
        ]);
    }

    ctx.onUpdate(() => {
        const player = ctx.get("player")[0];
        if (!player) return;

        // Move both background pieces to the left
        bgPieces.forEach((piece, _index) => {
            piece.move(-gameState.backgroundSpeed, 0);

            // Apply parallax effect based on player's vertical position
            const parallaxFactor = 0.1; // Adjust this value to control the parallax intensity
            const newY = -player.pos.y * parallaxFactor;
            piece.moveTo(piece.pos.x, newY);
        });

        // If the first piece has moved entirely off-screen, reset its position
        if (bgPieces[0].pos.x + bgPieceWidth < 0) {
            bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth, bgPieces[0].pos.y);

            // Shift the pieces in the array to keep them in order
            const shiftedPiece = bgPieces.shift();
            if (shiftedPiece) {
                bgPieces.push(shiftedPiece);
            }
        }

        // Move both platforms to the left at gameSpeed
        platforms.forEach((platform) => {
            platform.move(-gameState.gameSpeed, 0);
        });

        // If the first platform has moved entirely off-screen, reset its position
        if (platforms[0].pos.x + platformWidth < 0) {
            platforms[0].moveTo(platforms[1].pos.x + platformWidth, 960);

            // Shift the platforms in the array to keep them in order
            const shiftedPlatform = platforms.shift();
            if (shiftedPlatform) {
                platforms.push(shiftedPlatform);
            }
        }
    });
};