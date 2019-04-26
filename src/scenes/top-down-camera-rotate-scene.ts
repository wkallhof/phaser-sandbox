import "phaser";

export class TopDownCameraRotateScene extends Phaser.Scene {
    constructor() {
        super({ key: "TopDownCameraRotateScene" });
    }

    public create() {
        this.add.text(10, 10, "TopDownCameraRotateScene");
    }
}
