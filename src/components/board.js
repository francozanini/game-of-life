import React from 'react';
import './board.css'
import Clock from './clock';
import Cell from './cell';
class Board extends React.Component {
    constructor(props) {
        super(props);
        const rows = 30;
        const cols = 30;

        this.state = {
            matrix: this.createNewMatrix(rows, cols),
            rows: rows,
            cols: cols,
            generation: 0,
            isRunning: false,
            randomness: 0.8,
            intervalId: ''
        };

        this.tick = this.tick.bind(this);
        this.handleStartOrPause = this.handleStartOrPause.bind(this);
        this.handleRandomization = this.handleRandomization.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.getNeighbors = this.getNeighbors.bind(this);
        this.createNewMatrix = this.createNewMatrix.bind(this);
        this.handleCellToggle = this.handleCellToggle.bind(this);
    };

    handleStartOrPause() {
        const newState = this.state.isRunning ? false : true;

        if (newState) {
            this.setState({
                intervalId: setInterval(
                    this.tick,
                    200),
                isRunning: newState
            })
        }
        else {
            this.setState({
                isRunning: newState
            });
            clearInterval(this.state.intervalId);
        };
    };

    createNewMatrix(rows, cols) {
        return ([...Array(rows)].map(
            () => [...Array(cols)].fill(false)));
    }

    handleRandomization() {
        let res = this.createNewMatrix(this.state.rows, this.state.cols);

        for (let i = 0; i < res.length; i++) {
            for (let j = 0; j < res[0].length; j++) {
                res[i][j] = Math.random() > this.state.randomness;
            }
        };

        this.setState({
            matrix: res,
            generation: 0
        });
    };

    getNeighbors(row, col) {
        let neighbors = 0;
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];

        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            let y1 = row + dir[0];
            let x1 = col + dir[1];

            if (x1 >= 0 && x1 < this.state.rows &&
                y1 >= 0 && y1 < this.state.cols &&
                this.state.matrix[y1][x1]) {
                neighbors++;
            }
        }

        return neighbors;
    };

    tick() {
        const nextGen = this.createNewMatrix(this.state.rows, this.state.cols);

        for (let i = 0; i < this.state.rows; i++) {
            for (let j = 0; j < this.state.cols; j++) {
                let neighbors = this.getNeighbors(i, j);
                if (this.state.matrix[i][j]) {
                    if (neighbors === 3 || neighbors === 2) {
                        nextGen[i][j] = true;
                    }
                    else {
                        nextGen[i][j] = false;
                    }
                }
                else if (neighbors === 3) {
                    nextGen[i][j] = true;
                }
            };
        };

        this.setState({
            matrix: nextGen,
            generation: this.state.generation + 1
        });
    };

    handleCellToggle(e) {
        const id = e.target.id;
        const x = id.split('-')[0];
        const y = id.split('-')[1];
        const update = this.state.matrix;

        update[x][y] = !this.state.matrix[x][y];
        this.setState({ matrix: update });
    }

    handleReset() {
        this.setState({
            matrix: this.createNewMatrix(this.state.rows, this.state.cols),
            isRunning: false,
            generation: 0
        });
        clearInterval(this.state.intervalId);
    };

    render() {
        return (
            <div className='boardWrapper'>
                <div className='options'>
                    <button className='option' onClick={this.handleRandomization}>
                        Randomize
                    </button>
                    <button onClick={this.handleStartOrPause} className={'option'} >
                        {this.state.isRunning ? 'Pause' : 'Start'}
                    </button>
                    <button onClick={this.handleReset}>
                        Reset
                    </button>
                </div>
                <div className='board'>
                    {this.state.matrix.map((row, x) =>
                        row.map(
                            (col, y) => <Cell id={x + '-' + y} onClick={this.handleCellToggle} alive={col} key={x + y} />
                        )
                    )}
                </div>
                <Clock generation={this.state.generation} />
            </div>)
    };
};

export default Board;
