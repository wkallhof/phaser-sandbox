import { MenuScene } from "./scenes/menu-scene";
import { TopDownCameraRotateScene } from "./scenes/top-down-camera-rotate-scene";

const config: GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [MenuScene, TopDownCameraRotateScene],
};

const game = new Phaser.Game(config);
