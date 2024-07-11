export default class Robot {

    img = new Image();
    startX = 0;
    startY = 0;
    ctx = null;
    robotWidth = 10;
    robotHeight = 10;

    constructor(ctx,width, height, startX, startY){
        this.ctx = ctx;
        this.startX = startX;
        this.startY = startY;

        // img.onload = function () {
        //     console.log("imgLoaded");
        //
        // }
        this.img.onload = this.draw;
        this.img.src = "https://external-content.duckduckgo.com/iu/?u=https://img2.gratispng.com/20180808/cxq/kisspng-robotics-science-computer-icons-robot-technology-robo-to-logo-svg-png-icon-free-download-45527-5b6baa46a5e322.4713113715337825986795.jpg&f=1&nofb=1&ipt=4855c0299a3efdd98e08443b4ebb3c861e68356cbf0202d2c1ea1721c9251e89&ipo=images&kp=1"; // Set source path
    };


    draw(ctx){
        fillRect(20,20,10,10);
    }
}