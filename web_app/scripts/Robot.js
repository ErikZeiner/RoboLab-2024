export default class Robot {
    constructor(windowSizeX, windowSizeY, locationX, locationY) {
        this.image = document.getElementById('imgRobot');
        this.target = {x: locationX, y: locationY}
        this.speed = 25;
        this.scale = 7;
        this.sizeX = windowSizeX / this.scale;
        this.sizeY = windowSizeY / this.scale;
        this.position = {x: locationX, y: locationY};
        this.queue = [];
        this.keptOnLine = true;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.sizeX, this.sizeY);
    }


    // Methods: adapted from https://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/

    onSegment(p, q, r) {
        if (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
            q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y))
            return true;

        return false;
    }


    orientation(p, q, r) {
        let val = (q.y - p.y) * (r.x - q.x) -
            (q.x - p.x) * (r.y - q.y);

        if (val == 0) return 0; // collinear

        return (val > 0) ? 1 : 2; // clock or counterclock wise
    }

// The main function that returns true if line segment 'p1q1'
// and 'p2q2' intersect.
    function

    doIntersect(p1, q1, p2, q2) {

        // Find the four orientations needed for general and
        // special cases
        let o1 = this.orientation(p1, q1, p2);
        let o2 = this.orientation(p1, q1, q2);
        let o3 = this.orientation(p2, q2, p1);
        let o4 = this.orientation(p2, q2, q1);

        // General case
        if (o1 != o2 && o3 != o4)
            return true;

        // Special Cases
        // p1, q1 and p2 are collinear and p2 lies on segment p1q1
        if (o1 == 0 && this.onSegment(p1, p2, q1)) return true;

        // p1, q1 and q2 are collinear and q2 lies on segment p1q1
        if (o2 == 0 && this.onSegment(p1, q2, q1)) return true;

        // p2, q2 and p1 are collinear and p1 lies on segment p2q2
        if (o3 == 0 && this.onSegment(p2, p1, q2)) return true;

        // p2, q2 and q1 are collinear and q1 lies on segment p2q2
        if (o4 == 0 && this.onSegment(p2, q1, q2)) return true;

        return false; // Doesn't fall in any of the above cases
    }

    //
    // checkOnLine(pathLine) {
    //     let check = false;
    //     for (let i = 0; i < this.sizeX; i++) {
    //         for (let j = 0; j < this.sizeY; j++) {
    //             let x = this.position.x + i;
    //             let y = this.position.y + j;
    //             check = check || this.checkThreePoints(x, y, pathLine);
    //         }
    //     }
    //     return check;
    // }
    //


    checkOnPath(path) {
        let check = false;
        for (let i = 1; i < path.length; i++) {

            check = check || this.doIntersect({x: this.position.x, y: this.position.y}, {
                x: this.position.x,
                y: this.position.y + this.sizeY
            }, {x: path[i - 1][0], y: path[i - 1][1]}, {x: path[i][0], y: path[i][1]});
            check = check || this.doIntersect({x: this.position.x, y: this.position.y}, {
                x: this.position.x + this.sizeX,
                y: this.position.y
            }, {x: path[i - 1][0], y: path[i - 1][1]}, {x: path[i][0], y: path[i][1]});
            check = check || this.doIntersect({
                x: this.position.x + this.sizeX,
                y: this.position.y + this.sizeY
            }, {x: this.position.x, y: this.position.y + this.sizeY}, {
                x: path[i - 1][0],
                y: path[i - 1][1]
            }, {x: path[i][0], y: path[i][1]});
            check = check || this.doIntersect({
                x: this.position.x + this.sizeX,
                y: this.position.y + this.sizeY
            }, {x: this.position.x + this.sizeX, y: this.position.y}, {
                x: path[i - 1][0],
                y: path[i - 1][1]
            }, {x: path[i][0], y: path[i][1]});
        }

        return check;
    }

    isDoneMoving() {
        let done = Math.round(this.position.x) == this.target.x && Math.round(this.position.y) == this.target.y && this.queue.length == 0;
        return done;
    }

    checkFinalPosition(path) {
        let end = path.at(-1);
        return (end[0] >= this.position.x && end[0] <= this.position.x + this.sizeX && end[1] >= this.position.y && end[1] <= this.position.y + this.sizeY);
    }

    update(ctx, deltaTime, path) {

        if (!deltaTime) return;
        if (Math.abs(this.position.x - this.target.x) < 2 && Math.abs(this.position.y - this.target.y) < 2 && this.queue.length > 0) {
            let newPosition = this.queue.shift();
            this.target.x += newPosition.x * 25;
            this.target.y += newPosition.y * 25;
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
        if (this.keptOnLine) {
            this.keptOnLine = this.checkOnPath(path);
        }
    }
}