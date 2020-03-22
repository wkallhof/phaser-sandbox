import "phaser";
import playerSprite from "../assets/player.png";
import armSprite from "../assets/arm.png";
import { join } from "../../node_modules/bluebird-lst/index";

export class PhysicsScene extends Phaser.Scene {

    private backKey!: Phaser.Input.Keyboard.Key;
    private debugKey!: Phaser.Input.Keyboard.Key;
    private cursors!: Phaser.Input.Keyboard.CursorKeys;

    private user!: Phaser.Physics.Matter.Image;
    private rightArm!: Phaser.Physics.Matter.Image;

    constructor(){
        super({ key: "PhysicsScene" });
    }

    public preload(){
        this.load.image("player", playerSprite);
        this.load.image("arm", armSprite);
    }

    public create(){

        this.toggleDebug(true);

        this.matter.world.setGravity(0, 0);
        this.matter.world.setBounds(0, 0, 800, 600);

        this.add.text(10, 10, "Physics");

        this.user = this.matter.add.image(400, 300, "player");
        this.user.setAngle(-90);
        this.user.setMass(160);
        this.user.setFrictionAir(0.15);
        this.user.setFixedRotation();
        this.user.setCollisionGroup(-1);

        this.rightArm = this.matter.add.image(this.user.x + 10, this.user.y, "arm");
        //this.rightArm.setFixedRotation();
        this.rightArm.setMass(10);
        this.rightArm.setFrictionAir(0.15);
        this.rightArm.setCollisionGroup(-1);
        //this.rightArm.torque = 10;
        this.rightArm.applyForce(new Phaser.Math.Vector2(10,10));
        const leftArm = this.matter.add.image(this.user.x - 10, this.user.y, "arm");

        var rightArmJoint: any = this.matter.add.joint(this.user, this.rightArm, 0, 0.7);
        rightArmJoint.pointA.x = 10;
        rightArmJoint.pointB.x = -10;

        var leftArmJoint: any = this.matter.add.joint(this.user, leftArm, 0, 0.7);
        leftArmJoint.pointA.x = -10;
        leftArmJoint.pointB.x = +10;

        this.bindInputs();
        this.cameras.main.setZoom(2);
        this.cameras.main.startFollow(this.user);
        this.matter.add.mouseSpring();


    }

    public update(){
         const mousePosition = new Phaser.Math.Vector2(this.input.mousePointer.worldX, this.input.mousePointer.worldY);
        //console.log(`${mousePosition.x}:${mousePosition.y}`);
        let angle = Math.atan2(mousePosition.y - this.rightArm.y, mousePosition.x - this.rightArm.x) * 180 / Math.PI;
        angle = (angle - this.user.angle) - 90;
        //console.log(angle);


        if((180 - Math.abs(angle)) > 5){
            if(angle > 32){
                //this.rightArm.setAngle(32);
            }
            else if(angle < -90){
                //this.rightArm.setAngle(-90);
            }
            else{
                //this.rightArm.setAngle(angle);
            }
        }

        if (this.cursors.left && this.cursors.left.isDown) {
            this.user.setAngularVelocity(-0.05);

        } else if (this.cursors.right && this.cursors.right.isDown) {
            this.user.setAngularVelocity(0.05);
        }

        if (this.cursors.up && this.cursors.up.isDown) {
            this.user.thrust(0.1);
        }

        if (this.cursors.down && this.cursors.down.isDown){
            this.user.thrustBack(0.08);
        }

        //
        // else if(angle < 0)
        //     this.rightArm.setAngularVelocity(-0.05);

    }

    private bindInputs(): void{
        this.cursors = this.input.keyboard.createCursorKeys();
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