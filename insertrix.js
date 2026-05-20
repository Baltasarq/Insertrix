// Insertrix (c) Baltasar 2024 MIT License <baltasarq@gmail.com>


class Piece {
    #shapes = null;
    #color = "black";
    #height = 1;
    #width = 1;
    #row = 0;
    #col = 0;
    #shapeNum = 0;
    
    constructor(shapes, color)
    {
        this.#row = 0;
        this.#col = 0;
        
        if ( color != null ) {
            this.#color = color;
        }

        // Copy shapes
        this.#shapes = new Array( shapes.length );
        for(let i = 0; i < shapes.length; ++i) {
            this.#shapes[ i ] = [ ...shapes[ i ] ];
        }
        
        this.selectShape( 0 );
    }
    
    get shape()
    {
        return this.#shapes[ this.#shapeNum ];
    }
    
    get width()
    {
        return this.#width;
    }
    
    get height()
    {
        return this.#height;
    }
    
    get row()
    {
        return this.#row;
    }
    
    set row(v)
    {
        this.#row = v;
    }
    
    get col()
    {
        return this.#col;
    }
    
    set col(v)
    {
        this.#col = v;
    }
    
    get color()
    {
        return this.#color;
    }
    
    reset(board_width)
    {
        this.#row = 0;
        this.#col = parseInt( ( board_width / 2 ) - 1 );
        this.selectShape( 0 );
    }
    
    rotate()
    {
        this.selectShape( ( this.#shapeNum + 1 ) % this.#shapes.length );
    }
    
    selectShape(n)
    {
        this.#shapeNum = n;
        this.#height = this.#shapes[ n ].length;
        this.#width = this.#shapes[ n ][ 0 ].length;
    }
    
    unrotate()
    {
        let n = this.#shapeNum - 1;
        
        if ( n < 0 ) {
            n = this.#shapes.length - 1;
        }
        
        this.selectShape( n );
    }
    
    toString() {
        return this.row + ", " + this.col;
    }
}


class PieceSquare extends Piece {
    constructor()
    {
        super( [
                   [ [ 1, 1 ],
                     [ 1, 1] ]
               ],
               "#FFB81C" );   // color
    }
    
    toString() {
        return "sq: " + super.toString();
    }
}


class PieceBar extends Piece {
    constructor()
    {
        super( [
                   [ [ 1 ],
                     [ 1 ],
                     [ 1 ],
                     [ 1 ] ],
                   [ [ 1, 1, 1, 1 ] ],
               ],
               "darkcyan" );  // color
    }
    
    toString() {
        return "bar: " + super.toString();
    }
}


class PieceL extends Piece {
    constructor()
    {
        super( [
                   [ [ 1, 0 ],
                     [ 1, 0 ],
                     [ 1, 1 ] ],
                   [ [ 1, 1, 1 ],
                     [ 1, 0, 0 ] ],
                   [ [ 1, 1 ],
                     [ 0, 1 ],
                     [ 0, 1 ] ],
                   [ [ 0, 0, 1 ],
                     [ 1, 1, 1 ] ],
               ],
               "orange" );    // color
    }
    
    toString() {
        return "L: " + super.toString();
    }
}

class PieceInverseL extends Piece {
    constructor()
    {
        super( [
                   [ [ 0, 1 ],
                     [ 0, 1 ],
                     [ 1, 1 ] ],
                   [ [ 1, 0, 0 ],
                     [ 1, 1, 1 ] ],
                   [ [ 1, 1 ],
                     [ 1, 0 ],
                     [ 1, 0 ] ],
                   [ [ 1, 1, 1 ],
                     [ 0, 0, 1 ] ],  
               ],  
               "navy" );    // color  
    }
    
    toString() {
        return "inv L: " + super.toString();
    }
}

class PieceS extends Piece {
    constructor()
    {
        super( [
                   [ [ 1, 0 ],
                     [ 1, 1 ],
                     [ 0, 1 ] ],
                   [ [ 0, 1, 1 ],
                     [ 1, 1, 0 ] ],
               ],
               "darkgreen" );// color
    }
    
    toString() {
        return "S: " + super.toString();
    }
}

class PieceInverseS extends Piece {
    constructor()
    {
        super( [
                   [ [ 0, 1 ],
                     [ 1, 1 ],
                     [ 1, 0 ] ],
                   [ [ 1, 1, 0 ],
                     [ 0, 1, 1 ] ],
               ],
               "darkred" );  // color
    }
    
    toString() {
        return "inv S: " + super.toString();
    }
}

class PiecePodium extends Piece {
    constructor()
    {
        super( [
                   [ [ 0, 1, 0 ],
                     [ 1, 1, 1 ] ],
                   [ [ 1, 0 ],
                     [ 1, 1 ],
                     [ 1, 0 ] ],
                   [ [ 1, 1, 1 ],
                     [ 0, 1, 0 ] ],
                   [ [ 0, 1 ],
                     [ 1, 1 ],
                     [ 0, 1 ] ],
               ], 
               "purple" );  // color
    }
    
    toString() {
        return "podium: " + super.toString();
    }
}


const PIECES = [
            new PieceSquare(),
            new PieceBar(),
            new PieceL(),
            new PieceInverseL(),
            new PieceS(),
            new PieceInverseS() ];


class Board {
    static get PIXEL_SIZE() { return 24; };
    #color = "gray";
    #rows;
    #cols;
    #board;
    
    constructor(rows, cols, color)
    {
        this.#rows = rows;
        this.#cols = cols;
        
        if ( color != null ) {
            this.#color = color;
        }
        
        this.#board = new Array( rows );
        for(let i = 0; i < rows; ++i) {
            this.#board[ i ] = new Array( cols ).fill( 0 );
        }
    }
    
    get color()
    {
        return this.#color;
    }
    
    get rows()
    {
        return this.#rows;
    }
        
    get cols()
    {
        return this.#cols;
    }
    
    getRow(num)
    {
        if ( num < 0
          || num >= this.rows)
        {
            throw new RangeError( "0 - " + this.rows + ": " + num + "??" );
        }
        
        return this.#board[ num ];
    }
    
    cell(row, col)
    {
        if ( row < 0
          || row >= this.rows)
        {
            throw new RangeError( "row: 0 - " + this.rows + ": " + row + "??" );
        }
        
        if ( col < 0
          || col >= this.cols)
        {
            throw new RangeError( "col: 0 - " + this.cols + ": " + col + "??" );
        }

        return this.#board[ row ][ col ];
    }
    
    setCell(row, col, val = 1)
    {
        if ( row < 0
          || row >= this.rows)
        {
            throw new RangeError( "row: 0 - " + this.rows + ": " + row + "??" );
        }
        
        if ( col < 0
          || col >= this.cols)
        {
            throw new RangeError( "col: 0 - " + this.cols + ": " + col + "??" );
        }

        
        this.#board[ row ][ col ] = val;
    }
    
    insertEmptyRows(numRows)
    {
        for(let i = 0; i < numRows; ++i) {
            this.#board.unshift( new Array( this.cols ).fill( 0 ) );
        }
    }
    
    removeRows(listRows)
    {
        let newBoard = [];
        
        this.#board.forEach(
                        (v, index) => {
                            if ( !listRows.includes( index ) ) {
                                newBoard.push( v );
                            } });

        this.#board = newBoard;
    }
    
    toString()
    {
        return "Board: " + this.rows + " x " + this.cols;
    }
}


class Canvas {
    static get SEPARATION() { return 2; };
    #painting = false;
    #element = null;
    #board = null;
    #piece = null;
    
    constructor(element, board)
    {        
        element.width = 5 + ( board.cols * Board.PIXEL_SIZE );
        element.height = 5 + ( board.rows * Board.PIXEL_SIZE );
        
        this.#board = board;
        this.#element = element;
    }
    
    get piece()
    {
        return this.#piece;
    }
    
    set piece(p)
    {
        this.#piece = p;
    }
    
    get element()
    {
        return this.#element;
    }
    
    get board()
    {
        return this.#board;
    }
    
    paintBoard(ctx, SEP)
    {
        // Draw frame
        ctx.strokeWidth = 1;
        ctx.strokeStyle = this.board.color;
        ctx.strokeRect( 1, 1,
                  this.element.width - 1,
                  this.element.height  -1 );
        
        // Draw board
        for(let numRow = 0; numRow < this.board.rows; ++numRow)
        {
            const row = this.board.getRow( numRow );
            
            for(let numCol = 0; numCol < row.length; ++numCol) {
                if ( Boolean( row[ numCol ] ) ) {
                    ctx.strokeWidth = 1;
                    ctx.strokeStyle = this.board.color;
                    ctx.fillStyle = this.board.color;
                    ctx.fillRect(
                        SEP + ( Board.PIXEL_SIZE * numCol ),
                        SEP + ( Board.PIXEL_SIZE * numRow ),
                        Board.PIXEL_SIZE,
                        Board.PIXEL_SIZE );
                }
            }            
        }

        return;
    }
    
    paintPiece(ctx, SEP)
    {
        const SHAPE = this.piece.shape;
        
        for(let numRow = 0; numRow < SHAPE.length; ++numRow) {
            const ROW = SHAPE[ numRow ];
            for(let numCol = 0; numCol < ROW.length; ++numCol) {
                if ( Boolean( ROW[ numCol ] ) ) {
                    ctx.strokeWidth = 1;
                    ctx.strokeStyle = this.piece.color;
                    ctx.fillStyle = this.piece.color;
                    ctx.fillRect(
                        SEP
                        + ( this.piece.col * Board.PIXEL_SIZE )
                        + ( numCol * Board.PIXEL_SIZE ),
                        SEP + 
                        + ( this.piece.row * Board.PIXEL_SIZE )
                        + ( numRow * Board.PIXEL_SIZE ),
                        Board.PIXEL_SIZE,
                        Board.PIXEL_SIZE );
                }
            }
        }

        return;
    }
    
    paint()
    {
        if ( this._painting ) {
            return;
        }
        
        const ctx = this.element.getContext( "2d" );
        const SEP = Canvas.SEPARATION;

        this._painting = true;
        this.clear();
        
        this.paintBoard( ctx, SEP );
        this.paintPiece( ctx, SEP );
        
        this._painting = false;
    }
    
    clear()
    {
        const ctx = this.element.getContext( "2d" );

        ctx.clearRect( 0, 0, this.element.width, this.element.height );
    }
}


const game = {
    pushPieceDownTime: 0,
    startTime: 0,
    score: 0,
    piece: null,
    board: null,
    canvas: null,
    keysPressed: [],
    
    stopGame: () => {
        const dvStart = document.getElementById( "dvStart" );
        const dvGame = document.getElementById( "dvGame" );

        dvStart.style.display = "block";
        dvGame.disabled = true;
    },

    startGame: () => {
        const dvStart = document.getElementById( "dvStart" );
        const dvGame = document.getElementById( "dvGame" );
        const cvPaint = document.getElementById( "cvPaint" );
        
        // Set
        dvStart.style.display = "none";
        dvGame.disabled = false;
        
        game.score = 0;
        game.board = new Board( 26, 12 );
        game.canvas = new Canvas( cvPaint, game.board );
        game.chooseNewPiece();
        game.startTime = performance.now();
        
        // Listeners
        window.requestAnimationFrame( () => game.showFrame() );
        document.onkeydown = (e) => {
            if ( e.isComposing
              || e.keyCode === 229 )
            {
                return;
            }
            
            game.keysPressed.push( e );
        };
        
        return false;
    },
    
    pickRandomPiece: () => {
        return PIECES[ Math.ceil( Math.random() * PIECES.length ) - 1 ];
    },
    
    chooseNewPiece: () => {
        game.piece = game.pickRandomPiece();
        game.canvas.piece = game.piece;
        game.piece.reset( game.board.cols );
    },
    
    showFrame: () => {
        const pScore = document.getElementById( "pScore" );
        let millis = performance.now() - game.startTime;

        if ( millis >= 10 ) {
            game.pushPieceDownTime += 1;
            
            if ( game.pushPieceDownTime >= 40 ) {
                game.pushPieceDownTime = 0;
                game.piece.row += 1;
                const isAtBottom = ( game.piece.row + game.piece.height ) >= game.board.rows;
                                
                if ( game.chkPieceClash()
                  || isAtBottom )
                {
                    if ( !isAtBottom ) {
                        game.piece.row -= 1;
                    }
                    
                    if ( game.piece.row != 0 ) {
                        let newScore = 0;
                        
                        game.portPieceToBoard();
                        newScore = game.calculateScore();
                        if ( newScore > 0 ) {
                            game.score += newScore;
                            pScore.innerText = "" + game.score;
                        }
                        
                        let filledRows = game.chkFilledRows();
                        game.board.removeRows( filledRows );
                        game.board.insertEmptyRows( filledRows.length );
                    } else {
                        game.stopGame();
                    }
                    
                    game.chooseNewPiece();
                }
            }

            game.chkKeyboard();            
            game.drawFrame();
            game.startTime = performance.now();
        }
        
        window.requestAnimationFrame( () => game.showFrame() );
    },
    
    drawFrame: () => {
        game.canvas.paint();
    },
    
    chkPieceClash: () => {
        const PIECE = game.piece;
        const BOARD = game.board;
        
        let toret = 1;
        
        if ( game.chkInbounds() ) {
            toret = 0;
            
            for(let i = 0; i < PIECE.height; ++i)
            {
                if ( ( PIECE.row + i ) >= BOARD.rows ) {
                    break;
                }
                    
                for(let j = 0; j < PIECE.width; ++j)
                {
                    if ( ( PIECE.col + j ) >= BOARD.cols ) {
                        break;
                    }
                            
                    toret |= PIECE.shape[i][j]
                           & BOARD.cell( PIECE.row + i, PIECE.col + j );
                           
                    if ( Boolean( toret ) ) {
                        break;
                    }
                }
            }
        }
        
        return Boolean( toret );
    },
    
    chkKeyboard: () => {
        for(let key of game.keysPressed) {
            if ( key.code == "ArrowLeft" ) {
                game.piece.col -= 1;
                if ( game.chkPieceClash() ) {
                    game.piece.col += 1;
                }
            }
            else
            if ( key.code == "ArrowRight" ) {
                game.piece.col += 1;
                if ( game.chkPieceClash() ) {
                    game.piece.col -= 1;
                }
            }
            else
            if ( key.code == "ArrowUp" ) {
                game.piece.rotate();
                if ( game.chkPieceClash() ) {
                    game.piece.unrotate();
                }
            }
            else
            if ( key.code == "ArrowDown" ) {
                game.piece.row += 1;
                if ( game.chkPieceClash() ) {
                    game.piece.row -= 1;
                }
            }
        }
        
        game.keysPressed = [];
    },
    
    chkInbounds: () => {
        const PIECE = game.piece;
        const BOARD = game.board;
        
        return PIECE.row >= 0
          && ( PIECE.row + PIECE.height ) < BOARD.rows
          && PIECE.col >= 0
          && ( PIECE.col + PIECE.width ) <= BOARD.cols;
    },
    
    calculateScore: () => {
        const PIECE = game.piece;
        const BOARD = game.board;
        let toret = 0;
        
        for(let i = 0; i < PIECE.height; ++i) {
            const NUM_ROW = i + PIECE.row;
            
            if ( BOARD.getRow( NUM_ROW ).every( x => Boolean(x) ) ) {
                let rowScore = BOARD.rows - NUM_ROW;
                toret += BOARD.cols * rowScore * 1000;
            }
        }
        
        return toret;
    },
    
    chkFilledRows: () => {
        const PIECE = game.piece;
        const BOARD = game.board;
        let toret = [];
        
        for(let i = 0; i < PIECE.height; ++i) {
            const NUM_ROW = i + PIECE.row;
            
            if ( BOARD.getRow( NUM_ROW ).every( x => Boolean(x) ) ) {
                toret.push( NUM_ROW );
            }
        }
        
        return toret;
    },
    
    portPieceToBoard: () => {
        const PIECE = game.piece;
        const BOARD = game.board;
        const MAX_HEIGHT = Math.min( BOARD.rows - 1, PIECE.row + PIECE.height );
        const MAX_WIDTH = Math.min( BOARD.cols - 1, PIECE.col + PIECE.width );
        
        for(let i = 0; i < PIECE.height; ++i) {
            for(let j = 0; j < PIECE.width; ++j) {
                const BOARD_POS_ROW = PIECE.row + i;
                const BOARD_POS_COL = PIECE.col + j;
                
                if ( BOARD_POS_ROW >= BOARD.rows
                  || BOARD_POS_COL >= BOARD.cols )
                {
                    break;
                }
                
                if ( Boolean( PIECE.shape[ i ][ j ] ) ) {
                    BOARD.setCell( BOARD_POS_ROW, BOARD_POS_COL );
                }
            }
        }
        
        return;
    }
}
