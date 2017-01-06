export default class Vector {

    constructor (x, y) {
        if (!(this instanceof Vector)) return new Vector(x, y);

        if (x && typeof x === 'object') {
            this.x = x.x || 0;
            this.y = x.y || 0;
        } else {
            this.x = x || 0;
            this.y = y || 0;
        }
    }

    set (p) {
        this.x = p.x;
        this.y = p.y;
    }

    clone () {
        return new Vector(this.x, this.y);
    }

    interpolate (p, t) {
        return new Vector(
            this.x + (p.x - this.x) * t,
            this.y + (p.y - this.y) * t
        );
    }

    add (p) {
        return new Vector(this.x + p.x, this.y + p.y);
    }

    subtract (p) {
        return new Vector(this.x - p.x, this.y - p.y);
    }

    multiply (p) {
        return new Vector(this.x * p.x, this.y * p.y);
    }

    divide (p) {
        return new Vector(this.x / p.x, this.y / p.y);
    }

    length (length) {
        if (length || length === 0) {
            const angle = this.angle();
            return new Vector(Math.cos(angle) * length, Math.sin(angle) * length);
        } else {
            const x = this.x;
            const y = this.y;

            return x || y ? Math.sqrt(x * x + y * y) : 0;
        }
    }

    length2 () {
        const x = this.x;
        const y = this.y;

        return x * x + y * y;
    }

    angle (angle) {
        if (angle || angle === 0) {
            const length = this.length();
            return new Vector(Math.cos(angle) * length, Math.sin(angle) * length);
        } else {
            return Math.atan2(this.y, this.x);
        }
    }

    project (matrixA, matrixB) {
        let x = this.x;
        let y = this.y;

        if (matrixA) {
            let matrix = 'from' in matrixA ? matrixA.from : matrixA;
            x = x * matrix[0] + y * matrix[2] + matrix[4];
            y = x * matrix[1] + y * matrix[3] + matrix[5];
        }

        if (matrixB) {
            let matrix = 'to' in matrixB ? matrixB.to : matrixB;
            x = x * matrix[0] + y * matrix[2] + matrix[4];
            y = x * matrix[1] + y * matrix[3] + matrix[5];
        }

        return new Vector(x, y);
    }

    toJSON () {
        return {
            x: this.x,
            y: this.y
        }
    }
}
