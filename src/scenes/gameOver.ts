import { playAgainText } from "../elements/playAgainText";
import { ctx, gameState } from "../kaplayCtx";


interface GameData {
    "best-score": number;
    "current-score": number;
}

export const gameOver = (): void => {
    const gameOverSound = ctx.play("gameOver", { volume: 0.3, loop: false });
    const { center, add, text } = ctx;
    const { x, y } = center();

    // Helper functions to get and set data
    const getData = (key: keyof GameData): number => ctx.getData(key as string) as number;
    const setData = (key: keyof GameData, value: number): void => ctx.setData(key, value);

    // Get the best score and current score
    let bestScore = getData("best-score");
    const currentScore = gameState.score;

    if (currentScore > bestScore) {
        setData("best-score", currentScore);
        bestScore = currentScore;
    }

    // Helper function to add text to the screen
    const addText = (content: string, size: number, xPos: number, yPos: number): void => {
        add([
            text(content, { font: "yewb", size }),
            ctx.anchor("center"),
            ctx.pos(xPos, yPos),
        ]);
    };

    // Display the game over screen
    ctx.add([
        ctx.sprite("gameOverBackground"),
        ctx.anchor("center"),
        ctx.pos(x, y),
    ])
    addText("GAME OVER", 50, x, y - 300);
    addText(`BEST SCORE : ${bestScore}`, 30, x - 400, y - 200);
    addText(`CURRENT SCORE : ${currentScore}`, 30, x + 400, y - 200);

    ctx.add([
        ctx.sprite(currentScore >= bestScore ? "win" : "lose"),
        ctx.anchor("center"),
        ctx.pos(x, y),
        ctx.scale(currentScore >= bestScore ? 2 : 1.5)
    ])

    // Display the play again message
    ctx.wait(0.5, () => {
        playAgainText({ x: 960, y: 540, sound: gameOverSound });
    });
}