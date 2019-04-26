import "phaser";
import { GameMenu } from "../features/menu/game-menu";

import phaserPng from "../assets/phaser.png";

export class MainScene extends Phaser.Scene {
  private menu!: GameMenu;

  constructor() {
    super({ key: "MainScene" });
  }

  public preload() {
    this.load.image("phaser", phaserPng);
  }

  public create() {
    this.menu = new GameMenu(this, 400, 300);
    this.menu
      .addMenuItem("Test1", this.consoleLogSize.bind(this))
      .addMenuItem("longer title here", this.consoleLogSize.bind(this));
  }

  private consoleLogSize() {
    console.log(this.game.renderer.height);
    console.log(this.game.renderer.width);
  }
}
