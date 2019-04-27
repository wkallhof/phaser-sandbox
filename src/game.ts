import { MenuScene } from "./scenes/menu-scene";
import { TopDownCameraRotateScene } from "./scenes/top-down-camera-rotate-scene";

const config: GameConfig = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
      default: "matter",
      matter: {
          gravity: {
              y: 0,
          },
          debug: true,
      },
  },
  scene: [MenuScene, TopDownCameraRotateScene],
};

const game = new Phaser.Game(config);
