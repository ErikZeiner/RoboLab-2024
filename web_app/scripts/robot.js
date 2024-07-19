// @author: Erik Zeiner

export default class Robot {
    constructor(windowSizeX, windowSizeY, locationX, locationY) {
        this.image = document.getElementById('imgRobot');
        this.target = {x: locationX, y: locationY}
        this.speed = 25;
        this.scale = 7; // for robot size
        this.sizeX = windowSizeX / this.scale;
        this.sizeY = windowSizeY / this.scale;
        this.position = {x: locationX, y: locationY};
        this.queue = []; // places to move to
        this.keptOnLine = true;
    }

    // Helper methods to determine if robot kept being on the line
    // Methods onSegment, orientation, and checkIntersect adapted from https://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/

    onSegment(p, q, r) {
        if (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
            q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y)) {
            return true;
        }
        return false;
    }

    orientation(p, q, r) {
        let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
        if (val == 0) return 0;
        return (val > 0) ? 1 : 2;
    }

    checkIntersect(p1, q1, p2, q2) {
        let o1 = this.orientation(p1, q1, p2);
        let o2 = this.orientation(p1, q1, q2);
        let o3 = this.orientation(p2, q2, p1);
        let o4 = this.orientation(p2, q2, q1);

        if (o1 != o2 && o3 != o4)
            return true;

        if (o1 == 0 && this.onSegment(p1, p2, q1)) return true;
        if (o2 == 0 && this.onSegment(p1, q2, q1)) return true;
        if (o3 == 0 && this.onSegment(p2, p1, q2)) return true;
        if (o4 == 0 && this.onSegment(p2, q1, q2)) return true;

        return false;
    }

    // Check if the robot is on any of the possible paths
    checkOnPath(path) {
        let check = false;
        for (let i = 1; i < path.length; i++) {
            check = check || this.checkIntersect({x: this.position.x, y: this.position.y}, {
                x: this.position.x,
                y: this.position.y + this.sizeY
            }, {x: path[i - 1][0], y: path[i - 1][1]}, {x: path[i][0], y: path[i][1]});
            check = check || this.checkIntersect({x: this.position.x, y: this.position.y}, {
                x: this.position.x + this.sizeX,
                y: this.position.y
            }, {x: path[i - 1][0], y: path[i - 1][1]}, {x: path[i][0], y: path[i][1]});
            check = check || this.checkIntersect({
                x: this.position.x + this.sizeX,
                y: this.position.y + this.sizeY
            }, {x: this.position.x, y: this.position.y + this.sizeY}, {
                x: path[i - 1][0],
                y: path[i - 1][1]
            }, {x: path[i][0], y: path[i][1]});
            check = check || this.checkIntersect({
                x: this.position.x + this.sizeX,
                y: this.position.y + this.sizeY
            }, {x: this.position.x + this.sizeX, y: this.position.y}, {
                x: path[i - 1][0],
                y: path[i - 1][1]
            }, {x: path[i][0], y: path[i][1]});
        }
        return check;
    }

    // Check if robot is done moving - reached the target and has no more moves to do
    isDoneMoving() {
        return Math.round(this.position.x) == this.target.x && Math.round(this.position.y) == this.target.y && this.queue.length == 0;
    }

    // Check if the robot is at the end of the line
    checkFinalPosition(path) {
        let end = path.at(-1);
        return (end[0] >= this.position.x && end[0] <= this.position.x + this.sizeX && end[1] >= this.position.y && end[1] <= this.position.y + this.sizeY);
    }

    // Draw the robot
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.sizeX, this.sizeY);
    }

    // Move the robot to the next target as specified from the user
    update(ctx, deltaTime, path) {
        if (!deltaTime) return;
        if (Math.abs(this.position.x - this.target.x) < 2 && Math.abs(this.position.y - this.target.y) < 2 && this.queue.length > 0) {
            let newPosition = this.queue.shift();
            this.target.x += newPosition.x * 25;
            this.target.y += newPosition.y * 25;
        }

        if (this.position.x < this.target.x) this.position.x += this.speed / deltaTime;
        if (this.position.x > this.target.x) this.position.x -= this.speed / deltaTime;
        if (this.position.y < this.target.y) this.position.y += this.speed / deltaTime;
        if (this.position.y > this.target.y) this.position.y -= this.speed / deltaTime;
        if (this.keptOnLine) this.keptOnLine = this.checkOnPath(path);
    }
}