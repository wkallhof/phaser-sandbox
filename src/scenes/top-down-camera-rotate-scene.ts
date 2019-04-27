import "phaser";
import playerSprite from "../assets/player.png";

export class TopDownCameraRotateScene extends Phaser.Scene {

    private user!: Phaser.Physics.Matter.Image;
    private cursors!: Phaser.Input.Keyboard.CursorKeys;

    private strafeLeftKey!: Phaser.Input.Keyboard.Key;
    private strafeRightKey!: Phaser.Input.Keyboard.Key;
    private sprintKey!: Phaser.Input.Keyboard.Key;

    constructor() {
        super({ key: "TopDownCameraRotateScene" });
    }

    public preload() {
        this.load.image("player", playerSprite);
    }

    public create() {
        const worldWidth = 1600;
        const worldHeight = 1200;

        this.matter.world.setBounds(0, 0, worldWidth, worldHeight);

        this.add.text(10, 10, "TopDownCameraRotateScene");
        this.user = this.matter.add.image(400, 300, "player");
        this.user.setFrictionAir(0.15);
        this.user.setMass(100);
        this.user.setFixedRotation();
        this.user.setAngle(-90);

        this.matter.add.mouseSpring({});

        this.cameras.main.startFollow(this.user);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.strafeLeftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.strafeRightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.sprintKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    }

    public update() {
        if (this.cursors.left && this.cursors.left.isDown) {
            this.user.setAngularVelocity(-0.02);

        } else if (this.cursors.right && this.cursors.right.isDown) {
            this.user.setAngularVelocity(0.02);
        }

        if (this.cursors.up && this.cursors.up.isDown) {
            const forwardSpeed = this.sprintKey.isDown ? 0.2 : 0.1;
            this.user.thrust(forwardSpeed);
        }

        if (this.cursors.down && this.cursors.down.isDown){
            this.user.thrustBack(0.08);
        }

        if (this.strafeLeftKey.isDown) {
            this.user.thrustLeft(0.1);
        }

        if (this.strafeRightKey.isDown) {
            this.user.thrustRight(0.1);
        }

        this.cameras.main.setAngle(-this.user.angle - 90);
    }
}
