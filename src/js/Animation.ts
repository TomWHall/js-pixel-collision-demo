import {buildMask} from "./MaskBuilder";
import {checkMaskCollision} from "./MaskTester";
import {loadImage} from "./ImageLoader";

export async function runAnimation(): Promise<void> {
    const promises: Promise<HTMLImageElement>[] = [
        loadImage('img/devil-left.png'),
        loadImage('img/player-right.png')
    ];
    
    const results = await Promise.all(promises);
    const devilImage = results[0];
    const playerImage = results[1];

    const devil: Sprite = {
        x: 40,
        y: 8,
        width: 32,
        height: 64,
        image: devilImage,
        mask: buildMask(devilImage)
    }

    const player: Sprite = {
        x: 71,
        y: 21,
        width: 32,
        height: 64,
        image: playerImage,
        mask: buildMask(playerImage)
    }

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#9999ff';

    const infoText = document.getElementById('info-text') as HTMLDivElement;
    
    let cycle = 0;
    
    update();

    function update(): void {
        cycle = (cycle + 1) % 4;

        switch (cycle) {
            case 0:
                player.x = 71;
                player.y = 20;
                break;

            case 1:
                player.x = 71;
                player.y = 21;
                break;

            case 2:
                player.x = 9;
                player.y = 20;
                break;

            case 3:
                player.x = 9;
                player.y = 21;
                break;
        }

        ctx.fillRect(0,0,canvas.width, canvas.height);
        ctx.drawImage(devil.image, devil.x, devil.y);
        ctx.drawImage(player.image, player.x, player.y);

        const collides = checkMaskCollision(player, devil);
        infoText.innerText = `Collides: ${collides}`;

        setTimeout(update, 1000);
    }
}
