import "phaser";
import { GameMenu } from "../features/menu/game-menu";

export class MenuScene extends Phaser.Scene {
  private menu!: GameMenu;

  constructor() {
    super({ key: "MenuScene" });
  }

  public create() {
    const centerX = this.game.renderer.width / 2;
    const centerY = this.game.renderer.height / 2;
    this.menu = new GameMenu(this, centerX, centerY );
    this.add.existing(this.menu);
    this.menu
      .addMenuItem("Top Down Camera", () => this.scene.start("TopDownCameraScene"))
      .addMenuItem("Top Down Camera Rotate", () => this.scene.start("TopDownCameraRotateScene"));

  }
}
