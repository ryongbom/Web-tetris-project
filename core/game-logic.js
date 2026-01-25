import Tetromino from "./piece.js";

export default class GameLogic {
    constructor(board, playerType) {
        this.board = board;
        this.playerType = playerType;
        this.currentPiece = null;
        this.gameLoop = null;
        this.aaa = false;

        this.spawnNewPiece();
        this.draw();
    }

    // 랜덤 블럭 생성기
    spawnNewPiece() {
        const types = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
        const randomType = types[Math.floor(Math.random() * types.length)];

        this.currentPiece = new Tetromino(randomType, this.playerType);

        const pieceWidth = this.currentPiece.getWidth();
        if (pieceWidth === 2) {
            this.currentPiece.position.x = 4;
        } else {
            this.currentPiece.position.x = 3;
        }
        this.currentPiece.position.y = 0;
    }

    // 충돌확인 함수
    isValidMove(dx, dy) {
        if (!this.currentPiece) return false;

        const coords = this.currentPiece.getCoordinates();

        for (const coord of coords) {
            const newX = coord.x + dx;
            const newY = coord.y + dy;

            if (newX < 0 || newX >= 10 || newY >= 20) {
                return false;
            }

            if (newY < 0) {
                return false;
            }
        }
        return true;
    }

    // 블럭 이동시 처리함수
    movePiece(dx, dy) {
        if (!this.currentPiece) return false;

        if (!this.isValidMove(dx, dy)) {
            if (dy > 0) {
                console.log(`${this.playerType} 블록 바닥에 닿음!`);
                this.spawnNewPiece();
            }
            return false;
        }

        this.currentPiece.position.x += dx;
        this.currentPiece.position.y += dy;

        this.draw();
        return true;
    }

    // 볼럭 회전함수
    rotatePiece() {
        if (!this.currentPiece) return;

        this.currentPiece.rotate();
        this.draw();
    }

    // 생성된 볼록그리기 함수
    draw() {
        // 게임보드초기화
        for (let i = 0; i < this.board.boardElement.children.length; i++) {
            this.board.boardElement.children[i].style.backgroundColor = '';
        }

        // 보드새로그리기
        if (this.currentPiece) {
            this.board.drawPiece(this.currentPiece);
        }
    }


    // 자동락하 함수
    startGame() {
        console.log(`${this.playerType} 게임 시작!`);

        if (this.gameLoop) {
            clearInterval(this.gameLoop);
        }

        this.gameLoop = setInterval(() => {
            console.log(`${this.playerType} 블록 떨어지는 중...`);

            this.movePiece(0, 1);
        }, 1000);
    }

    // 오락정지 함수
    stopGame() {
        console.log(`${this.playerType} 게임 정지!`);

        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }
    }
}