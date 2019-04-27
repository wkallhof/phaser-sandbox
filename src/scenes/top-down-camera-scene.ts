import "phaser";
import playerSprite from "../assets/player.png";

export class TopDownCameraScene extends Phaser.Scene {

    private user!: Phaser.Physics.Matter.Image;
    private cursors!: Phaser.Input.Keyboard.CursorKeys;

    private strafeLeftKey!: Phaser.Input.Keyboard.Key;
    private strafeRightKey!: Phaser.Input.Keyboard.Key;
    private sprintKey!: Phaser.Input.Keyboard.Key;
    private debugKey!: Phaser.Input.Keyboard.Key;
    private backKey!: Phaser.Input.Keyboard.Key;

    constructor() {
        super({ key: "TopDownCameraScene" });
    }

    public preload() {
        this.load.image("player", playerSprite);
    }

    public create() {
        this.toggleDebug(true);

        this.matter.world.setGravity(0, 0);
        this.matter.world.setBounds(0, 0, 1600, 1200);

        this.add.text(10, 10, "TopDownCameraScene");

        this.user = this.matter.add.image(400, 300, "player");
        this.user.setFrictionAir(0.15);
        this.user.setMass(100);
        this.user.setAngle(-90);

        this.cameras.main.startFollow(this.user);
        this.bindInputs();
    }

    public update() {
        if (this.cursors.left && this.cursors.left.isDown) {
            this.user.setAngularVelocity(-0.05);

        } else if (this.cursors.right && this.cursors.right.isDown) {
            this.user.setAngularVelocity(0.05);
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
    }

    private bindInputs(): void{
        this.cursors = this.input.keyboard.createCursorKeys();
        this.strafeLeftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.strafeRightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.sprintKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.debugKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKTICK);
        this.backKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.debugKey.on("up", () => this.toggleDebug());
        this.backKey.on("up", () => this.scene.start("MenuScene"));
    }

    private toggleDebug(value?: boolean){
        this.matter.world.drawDebug = value == null ? !this.matter.world.drawDebug : value;
         this.matter.world.debugGraphic.clear();
    }
}
