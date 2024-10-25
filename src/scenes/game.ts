import { drawEnvironment } from "../elements/environment";
import { drawScoreText } from "../elements/scoreText";
import { spawnTurtle } from "../entities/turtle";
import { drawPlayer } from "../entities/player";
import { spawnDiamond } from "../entities/diamond";
import { ctx, gameState } from "../kaplayCtx"

export const game = (): void => {
    const music = ctx.play("gameMusic", { volume: 0.3, loop: true });
    ctx.setGravity(3100);

    // Update the game speed
    ctx.loop(1, () => {
        gameState.updateSpeeds();
    });

    // Draw the background and platforms
    drawEnvironment({ gameMode: true });
    const score = drawScoreText();

    // Draw the player character
    const player = drawPlayer({ posX: 100, posY: 600 });
    player.setControls();
    player.setEvents();

    // Spawn initial turtle enemy and set up collision
    spawnTurtle();

    // Spawn initial diamond
    spawnDiamond();

    // Set up collision detection
    ctx.onCollide("player", "enemy", (player, enemy) => {
        if (!player.isGrounded()) {
            // Destroy the enemy and play the sound
            ctx.play("hitSound", { volume: 0.5 });
            ctx.destroy(enemy);

            // Increase the score multiplier and extra jump
            player.jump();
            player.play("jump");
            if (player.isExtraJump) {
                gameState.scoreMultiplier += 1;
            } else {
                player.isExtraJump = true;
                gameState.scoreMultiplier = 1;
            }

            // Display the score collect text
            player.scoreCollect.text = gameState.scoreMultiplier > 1 ? `+${10 * gameState.scoreMultiplier}` : "+10";
            ctx.wait(1, () => {
                player.scoreCollect.text = "";
            })

            // Update the score
            gameState.updateScore(10 * gameState.scoreMultiplier);
            score.text = `SCORE: ${gameState.score}`;
        } else {
            // Play the hurt sound and go to the game over screen
            ctx.play("hurtSound", { volume: 0.5 });
            music.stop();
            ctx.go("game-over");
        }
    });

    ctx.onCollide("player", "diamond", (_player, diamond) => {
        // Destroy the diamond and play the sound
        ctx.play("diamondSound", { volume: 0.5 });
        ctx.destroy(diamond);

        // Display the score collect text
        player.scoreCollect.text = "+5";
        ctx.wait(1, () => {
            player.scoreCollect.text = "";
        })

        // Update the score
        gameState.updateScore(5);
        score.text = `SCORE: ${gameState.score}`;
    });
}