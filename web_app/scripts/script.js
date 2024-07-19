// @author: Erik Zeiner

import Robot from './robot.js';

// setup variables
let canvas = document.getElementById('outputWindow');
let ctx = canvas.getContext('2d');
ctx.lineWidth = 2;
let robot = null;
let lastTime = 0;
let path = [];
let requestID = null;


// Deal with image rescaling issue
const dpr = window.devicePixelRatio;
const rect = canvas.getBoundingClientRect();
canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;

// Draw lines for the given level
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

// Helper method to get numbers from user code
function getNumberFromLine(str) {
    return parseInt(str.replace(/[^0-9]/g, ''), 10);
}

// Reset window and the robot
function reset() {
    robot = new Robot(canvas.width, canvas.height, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    robot.draw(ctx);
}

// Draw path given a list of points
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

// Animation loop
function loop(timestamp) {
    let deltaTime = (timestamp - lastTime);
    lastTime = timestamp;

    // Draw update
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    robot.update(ctx, deltaTime, path);
    drawPath(path);
    robot.draw(ctx);

    // Check if goal was reached
    if (!robot.isDoneMoving()) {
        requestID = window.requestAnimationFrame(loop);
        if (robot.checkFinalPosition(path) && robot.keptOnLine) document.getElementById('aiChat').value = "Success! You got the robot to the end!";
        else if (robot.checkFinalPosition(path) && !robot.keptOnLine) document.getElementById('aiChat').value = "The robot got to the end but it didn't follow the line!";

    } else window.cancelAnimationFrame(requestID);
}

// Used by the RunCode button
export function runCode(code) {
    reset();

    // Convert code from user
    let queue = [];
    code.split('\n').forEach(line => {
        if (line.includes('Left')) queue.push({x: -getNumberFromLine(line), y: robot.position.y});
        else if (line.includes('Right')) queue.push({x: getNumberFromLine(line), y: robot.position.y});
        else if (line.includes('Down')) queue.push({x: robot.position.x, y: getNumberFromLine(line)});
        else if (line.includes('Up')) queue.push({x: robot.position.x, y: -getNumberFromLine(line)});
    });
    // Give the robot where to go and run the animation
    robot.queue = queue;
    loop();
}

// Give the player no level - playground to try moving the robot
window.onload = function () {
    loadLevel(-1);
}

// Handlers for user choosing the levels
document.getElementById('level1select').addEventListener('click', function () {
    loadLevel(1);
});
document.getElementById('level2select').addEventListener('click', function () {
    loadLevel(2);
});
document.getElementById('level3select').addEventListener('click', function () {
    loadLevel(3);
});