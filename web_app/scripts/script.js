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

let requestID = null;

function loop(timestamp) {
    let deltaTime = (timestamp - lastTime);
    lastTime = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    robot.update(ctx, deltaTime, path);
    drawPath(path);
    robot.draw(ctx);
    if (!robot.isDoneMoving()) {
        requestID = window.requestAnimationFrame(loop);
        console.log("kept on line " + robot.keptOnLine + " got to the end " + robot.checkFinalPosition(path));
        if (robot.checkFinalPosition(path) && robot.keptOnLine) {
            document.getElementById('aiChat').value = "Success, you got the robot to the end!";
        } else if (robot.checkFinalPosition(path) && !robot.keptOnLine) {
            document.getElementById('aiChat').value = "The robot got to the end but it didn't follow the line!";
        }

    } else {
        window.cancelAnimationFrame(requestID);
    }
}

window.onload = function () {
    reset();

    path = [[10, 10], [98, 10], [98, 96], [150, 96]];
    drawPath(path);
    robot.draw(ctx);
}

function getNumberFromLine(str) {
    return parseInt(str.replace(/[^0-9]/g, ''), 10);
}

function reset() {
    robot = new Robot(canvas.width, canvas.height, 0, 0);
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

    robot.queue = queue;
    loop();
}

