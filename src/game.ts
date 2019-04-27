import { MenuScene } from "./scenes/menu-scene";
import { TopDownCameraRotateScene } from "./scenes/top-down-camera-rotate-scene";
import { TopDownCameraScene } from "./scenes/top-down-camera-scene";

const config: GameConfig = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
      default: "matter",
      matter: {
          debug: true,
      },
  },
  scene: [MenuScene, TopDownCameraScene, TopDownCameraRotateScene],
};

const game = new Phaser.Game(config);
