import "phaser";
import { GameMenu } from "../features/menu/game-menu";

import phaserPng from "../assets/phaser.png";

export class MenuScene extends Phaser.Scene {
  private menu!: GameMenu;

  constructor() {
    super({ key: "MenuScene" });
  }

  public preload() {
    this.load.image("phaser", phaserPng);
  }

  public create() {
    const centerX = this.game.renderer.width / 2;
    const centerY = this.game.renderer.height / 2;
    this.menu = new GameMenu(this, centerX, centerY );
    this.menu
      .addMenuItem("Top Down Camera Rotate", () => {
        this.scene.start("TopDownCameraRotateScene");
      });
  }
}
