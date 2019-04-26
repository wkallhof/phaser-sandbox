export class GameMenu extends Phaser.GameObjects.GameObject {
    private items: GameMenuItem[];
    private menuItemHeight: number = 20;
    private x: number;
    private y: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, "GameMenu");
        this.items = [];
        this.x = x;
        this.y = y;
    }

    public addMenuItem(title: string, action: () => void): GameMenu {
        const y = this.y + (this.items.length * this.menuItemHeight);
        this.items.push(new GameMenuItem(this.scene, this.x, y, this.menuItemHeight, title, action));
        return this;
    }
}

class GameMenuItem extends Phaser.GameObjects.GameObject {
    private x: number;
    private y: number;
    private height: number;
    private title: string;
    private action: () => void;
    private text: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, x: number, y: number, height: number, title: string, action: () => void) {
        super(scene, "GameMenuItem");
        this.scene = scene;
        this.title = title;
        this.action = action;
        this.x = x;
        this.y = y;
        this.height = height;

        this.text = this.scene.add.text(x, y, title, { fill: "#0f0", fontSize: this.height});
        this.text.setOrigin(0.5);
        this.text.setInteractive({ useHandCursor: true })
        .on("pointerover", () => this.enterButtonHoverState() )
        .on("pointerout", () => this.enterButtonRestState() )
        .on("pointerdown", () => this.enterButtonActiveState() )
        .on("pointerup", () => {
            this.enterButtonHoverState();
            action();
        });
    }

    private enterButtonHoverState() {
        this.text.setStyle({ fill: "#ff0"});
    }

    private enterButtonRestState() {
        this.text.setStyle({ fill: "#0f0", align: "right"});
    }

    private enterButtonActiveState() {
        this.text.setStyle({ fill: "#0ff"});
    }
}