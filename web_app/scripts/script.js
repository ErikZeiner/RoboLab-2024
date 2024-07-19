// @author: Erik Zeiner
import Robot from './Robot.js';

let canvas = document.getElementById('outputWindow');
let ctx = canvas.getContext('2d');
ctx.lineWidth = 2;
let robot;
let lastTime = 0;
let path;


const dpr = window.devicePixelRatio;
const rect = canvas.getBoundingClientRect();

// Set the "actual" size of the canvas
canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;

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


function loadLevel(num) {
    reset();
    switch (num) {
        case 1:
            path = [[10, 35], [124, 35], [124, 230]];
            break;
        case 2:
            path = [[10, 35], [75, 35], [75, 235], [150, 235], [150, 130], [174, 130], [174, 40]];
            break;
        case 3:
            path = [[10, 35], [124, 35], [124, 85], [90, 85], [90, 155], [173, 155], [173, 53], [220, 53], [220, 240]];
            break;
        default:
            path = [];
            break;
    }
    drawPath(path);
    robot.draw(ctx);
}


window.onload = function () {
    loadLevel(-1);

}

document.getElementById('level1select').addEventListener('click', function () {
    loadLevel(1);
});
document.getElementById('level2select').addEventListener('click', function () {
    loadLevel(2);
});
document.getElementById('level3select').addEventListener('click', function () {
    loadLevel(3);
});

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

