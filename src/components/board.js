import React from 'react';
import './board.css'
import Clock from './clock';
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                  matrix: [...Array(30)].map(
                            () => [...Array(30)].fill(false)),
                    generation: 0,
                    isRunning: true};
        this.state.matrix[0][0] = true;

        this.getCells = this.getCells.bind(this);
        this.randomizeSeed = this.randomizeSeed.bind(this);
    };

    randomizeSeed() {
        let res = [...Array(30)].map(
            () => [...Array(30)].fill({})
                );

        for(let i = 0; i < res.length; i++) {
            for(let j = 0; j < res[0].length; j++) {
                res[i][j] =  Math.random() > 0.7
            }
        };

        this.setState({matrix: res,
                        generation: 0});
    };

    getCells() {
        return this.state.matrix.map((row, indexRow) => (
            row.map(function(col, indexCol) {
                return col ? <div key={`${indexRow}-${indexCol}`} className='square alive'/> :
            <div key={`${indexRow}-${indexCol}`} className='square dead' />})));
    };

    getNeighbors(row, col) {
        let neighbors = 0;
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];

        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            let y1 = row + dir[0];
            let x1 = col + dir[1];

            if (x1 >= 0 && x1 < 30 && y1 >= 0 && y1 < 30 && this.state.matrix[y1][x1]) {
                neighbors++;
            }
        }

        return neighbors;
    };

    tick() {
        const nextGen = [...Array(30)].map(
            () => [...Array(30)].fill(false));

        for (let i = 0; i < 30; i++) {
            for (let j = 0; j < 30; j++) {
                let neighbors = this.getNeighbors(i, j);
                if(this.state.matrix[i][j]) {
                    if(neighbors === 3 || neighbors === 2) {
                        nextGen[i][j] = true;
                    }
                    else {
                        nextGen[i][j] = false;
                    }
                }
                else {
                    if(neighbors === 3){
                        nextGen[i][j] = true;
                    }
                }
            };
        };

        this.setState({
            matrix: nextGen,
            generation: this.state.generation + 1});
    };

    componentDidMount() {
        this.intervalId = setInterval(
            () => this.tick(),
            1000);
    };

    componentWillUnmount(){
        clearInterval(this.intervalId);
    };

    render() {
        const cells = this.getCells();
        return(
            <div className='boardWrapper'>
                <button className='randomize' onClick={this.randomizeSeed}>Randomize</button>
                <div className='board'>
                    {cells}
                </div>
                <Clock generation={this.state.generation}/>
            </div>)
    };
};

export default Board;
