export default class Robot {

    img = new Image();
    startX = 0;
    startY = 0;
    robotWidth = 10;
    robotHeight = 10;

    constructor(width, height, startX, startY){
        img.onload = draw;
        img.src = "placeholder.jpg";

        this.startX = startX;
        this.startY = startY;

    }

    draw(ctx){
        ctx.drawImage(this.img, this.startX, this.startY, this.robotWidth, this.robotHeight);
    }
}