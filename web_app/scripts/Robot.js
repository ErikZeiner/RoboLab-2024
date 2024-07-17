export default class Robot {
    constructor(windowSizeX, windowSizeY, locationX, locationY) {
        this.image = document.getElementById('imgRobot');
        this.target = {x: locationX, y: locationY}
        this.position = {x: locationX, y: locationY};
        this.speed = 5;
        this.scale = 5;
        this.sizeX = windowSizeX / this.scale;
        this.sizeY = windowSizeY / this.scale;
        this.queue = [];
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.sizeX, this.sizeY);

    }

    moveTargetX(x){
        this.target.x = x;
        return Math.abs(this.target.x-this.position.x)/this.speed;
    }
     moveTargetY(y){
        this.target.y = y;
        return Math.abs(this.target.y-this.position.y)/this.speed;
    }

    update(ctx, deltaTime) {
        if (!deltaTime) return;
        console.log(this.queue);

        if (this.queue.length === 0) {
            clearInterval(gameLoopInterval);
        }

        if (this.position.x == this.target.x && this.position.y == this.target.y){
            let newPosition = this.queue.shift();
            this.target.x = newPosition.x;
            this.target.y = newPosition.y;
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

    }
}