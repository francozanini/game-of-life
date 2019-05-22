import React from 'react';
import './board.css'

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {matrix: [...Array(30)].map(
                        () => [...Array(30)].fill({})
                            )};

        this.getCells = this.getCells.bind(this);
        this.randomizeBoard = this.randomizeBoard.bind(this);
    };

    randomizeBoard() {
        let res = [...Array(30)].map(
            () => [...Array(30)].fill({})
                );

        for(let i = 0; i < res.length; i++) {
            for(let j = 0; j < res[0].length; j++) {
                res[i][j] = {alive: Math.random() > 0.5}}};
        this.setState({matrix: res});
    }

    getCells() {
        return this.state.matrix.map((row, indexRow) => (
            row.map(function(col, indexCol) {
                col.alive = Math.random() > 0.5;
                return col.alive ? <div key={`${indexRow}-${indexCol}`} className='square alive'/> :
            <div key={`${indexRow}-${indexCol}`} className='square dead' />})));
    };

    render() {
        const cells = this.getCells();
        return(
            <div className='boardWrapper'>
                <button className='randomize' onClick={this.randomizeBoard}>Randomize</button>
                <div className='board'>
                    {cells}
                </div>
            </div>)
    };
};

export default Board;
