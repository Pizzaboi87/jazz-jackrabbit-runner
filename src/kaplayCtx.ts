import kaplay from "kaplay";

export const ctx = kaplay({
    width: 1920,
    height: 1080,
    letterbox: true,
    background: [30, 30, 30],
    global: false,
    touchToMouse: true,
    debug: false,
    buttons: {
        jump: {
            keyboard: ["space", "up", "w"],
            mouse: "left",
        },
        start: {
            keyboard: ["space"],
            mouse: "left"
        }
    }
});

export const gameState = {
    gameSpeed: 300,
    backgroundSpeed: 100,
    score: 0,
    scoreMultiplier: 1,

    updateSpeeds() {
        this.gameSpeed += 50;
        this.backgroundSpeed += 10;
    },

    updateScore(amount: number) {
        this.score += amount;
    },

    reset() {
        this.gameSpeed = 300;
        this.backgroundSpeed = 100;
        this.score = 0;
        this.scoreMultiplier = 1;
    }
};