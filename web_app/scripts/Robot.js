export default class Robot {
    constructor(windowSizeX, windowSizeY, locationX, locationY) {
        this.image = document.getElementById('imgRobot');
        this.target = {x: locationX, y: locationY}

        this.speed = 20;
        this.scale = 6;
        this.sizeX = windowSizeX / this.scale;
        this.sizeY = windowSizeY / this.scale;
        this.position = {x: locationX, y: locationY};
        this.queue = [];
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.sizeX, this.sizeY);

    }

    checkOnLine(pathLine) {
        let a = (pathLine[0][1] - pathLine[0][0]) / (pathLine[1][1] - pathLine[1][0]);
        let b = pathLine[0][0] - a * pathLine[1][0];

        for (let i = 0; i < this.sizeX; i++) {
            for (let j = 0; j < this.sizeY; j++) {
                let x = this.position.x + i;
                let y = this.position.y + j;

                if (Math.abs(y - (a * x + b)) <= 1) {
                    if (x >= pathLine[0][0] && x <= pathLine[1][0] && y >= pathLine[0][1] && y <= pathLine[1][1]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    checkOnPath(path) {
        for (let i = 1; i < path.length; i++) {
            if (this.checkOnLine([path[i - 1], path[i]])) {
                return true;
            }
        }
        return false;
    }

    isDoneMoving() {
        return Math.round(this.position.x) == this.target.x && Math.round(this.position.y) == this.target.y && this.queue.length == 0;
    }

    checkFinalPosition(path) {
        let end = path.at(-1);
        return (end[0] >= this.position.x && end[0] <= this.position.x + this.sizeX && end[1] >= this.position.y && end[1] <= this.position.y + this.sizeY);
    }

    update(ctx, deltaTime, path) {
        if (!deltaTime) return;

        if (Math.round(this.position.x) == this.target.x && Math.round(this.position.y) == this.target.y) {
            let newPosition = this.queue.shift();
            this.target.x += newPosition.x * 25;
            this.target.y += newPosition.y * 20;
        }

        if (this.position.x < this.target.x) {
            this.position.x += this.speed / deltaTime;
        }
        if (this.position.x > this.target.x) {
            this.position.x -= this.speed / deltaTime;
        }
        if (this.position.y < this.target.y) {
            this.position.y += this.speed / deltaTime;
        }
        if (this.position.y > this.target.y) {
            this.position.y -= this.speed / deltaTime;
        }
        console.log(this.checkOnPath(path));

    }
}