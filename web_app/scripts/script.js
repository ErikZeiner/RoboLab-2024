// @author: Erik Zeiner
import Robot from './Robot.js';

let canvas = document.getElementById('outputWindow');
let ctx = canvas.getContext('2d');
ctx.lineWidth = 2;
let robot;
let lastTime = 0;
let path;

function drawPath(pathPoints) {
    let first = true;
    pathPoints.forEach(pathPoint => {
        if (first) {
            ctx.beginPath();
            ctx.moveTo(pathPoint[0], pathPoint[1]);
            first = false;
        }
        ctx.lineTo(pathPoint[0], pathPoint[1]);
    })
    ctx.stroke();
}


function loop(timestamp) {
    let deltaTime = (timestamp - lastTime);
    lastTime = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    robot.update(ctx, deltaTime, path);
    drawPath(path);
    robot.draw(ctx);
    if (!robot.isDoneMoving()) {
        window.requestAnimationFrame(loop);

        if(robot.checkFinalPosition(path)){
            alert("finished");
        };
    }
}

window.onload = function () {
    reset();
    path = [[10, 10], [100, 10], [100, 100]];
    drawPath(path);
    robot.draw(ctx);
}

function getNumberFromLine(str) {
    return parseInt(str.replace(/[^0-9]/g, ''), 10);
}

function reset() {
    robot = new Robot(canvas.width, canvas.height, 0, 0);
    console.log("reset robot");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    robot.draw(ctx);
}


export function runCode(code) {
    reset();

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
    // console.log(queue);
    robot.queue = queue;
    loop();
}

