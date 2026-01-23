export default class Tetromino {
    constructor(type, playerType) {
        this.type = type;
        this.playerType = playerType;
        this.shape = this.getShape();
        this.position = { x: 3, y: 0 };
        this.color = this.getColor();
    }

    getShape() {
        const shapes = {
            I: [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            J: [
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0]
            ],
            L: [
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0]
            ],
            O: [
                [1, 1],
                [1, 1]
            ],
            S: [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0]
            ],
            T: [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0]
            ],
            Z: [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0]
            ]
        }
        return shapes[this.type] || shapes.I;   
    }

    getColor() {
        const colors = {
            police: '#3498db',
            terrorist: '#e74c3c'
        };
        return colors[this.playerType];
    }

    rotate(direction = 'clockwise') {
        const rows = this.shape.length;
        const cols = this.shape[0].length;
        const rotated = [];

        if (direction === 'clockwise') {
            for (let col = 0; col < cols; col++) {
                rotated[col] = [];
                for (let row = rows - 1; row >= 0; row--) {
                    rotated[col][rows - 1 - row] = this.shape[row][col];
                }
            }
        } else {
            for (let col = cols - 1; col >= 0; col--) {
                rotated[cols - 1 - col] = [];
                for (let row = 0; row < rows; row++) {
                    rotated[cols - 1 - col][row] = this.shape[row][col];
                }
            }
        }
        this.shape = rotated;
        return this;
    }

    move(dx, dy) {
        this.position.x += dx;
        this.position.y += dy;
        return this;
    }

    getCoordinates() {
        const coordinates = [];
        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[i].length; j++) {
                if (this.shape[i][j] === 1) {
                    coordinates.push({
                        x: this.position.x + j,
                        y: this.position.y + i
                    });
                }
            }
        }
        return coordinates;
    }

    getWidth() {
        return this.shape[0].length;
    }

    getHeight() {
        return this.shape.length;
    }
}