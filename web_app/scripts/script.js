// @author: Erik Zeiner
import Robot from './Robot.js';

let canvas = document.getElementById('outputWindow');
let ctx = canvas.getContext('2d');
let looper;

function chooseLevel() {
    let level1 = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
}


let robot = new Robot(canvas.width, canvas.height, 0, 0);


let lastTime = 0;

function loop(timestamp) {
    let deltaTime = (timestamp - lastTime);
    lastTime = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    robot.update(ctx, deltaTime);
    robot.draw(ctx);
    window.requestAnimationFrame(loop);
    // if (robot.queue.length == 0){
    //     stopAnimation();
    // }
}



function stopAnimation(){
    if(looper){
        window.cancelAnimationFrame(looper);
        looper = undefined;
    }
}

function getNumberFromLine(str) {
    return parseInt(str.replace(/[^0-9]/g, ''), 10);
}

export function runCode(code) {

    let ctx = canvas.getContext('2d');
    let queue = [];
    code.split('\n').forEach(line => {
        if (line.includes('Left')) {
            queue.push({x: -getNumberFromLine(line), y: robot.position.y});
        } else if (line.includes('Right')) {
            queue.push({x: getNumberFromLine(line), y: robot.position.y});
        } else if (line.includes('Down')) {
            queue.push({x: robot.position.x, y: getNumberFromLine(line)});
        } else if (line.includes('Up')) {
            queue.push({x: robot.position.x, y: -getNumberFromLine(line)});
        }
    });
    console.log(queue);
    robot.queue = queue;
    loop();
}