import React from 'react';
import './board.css'
import Clock from './clock';
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {matrix: [...Array(30)].map(
                        () => [...Array(30)].fill({})),
                      generation: 0};

        this.getCells = this.getCells.bind(this);
        this.randomizeBoard = this.randomizeBoard.bind(this);
    };

    randomizeBoard() {
        let res = [...Array(30)].map(
            () => [...Array(30)].fill({})
                );

        for(let i = 0; i < res.length; i++) {
            for(let j = 0; j < res[0].length; j++) {
                res[i][j] = {alive: Math.random() > 0.5}
            }
        };

        this.setState({matrix: res,
                        generation: 0});
    };

    getCells() {
        return this.state.matrix.map((row, indexRow) => (
            row.map(function(col, indexCol) {
                return col.alive ? <div key={`${indexRow}-${indexCol}`} className='square alive'/> :
            <div key={`${indexRow}-${indexCol}`} className='square dead' />})));
    };

    tick() {
        this.setState({generation: this.state.generation + 1});
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
                <button className='randomize' onClick={this.randomizeBoard}>Randomize</button>
                <div className='board'>
                    {cells}
                </div>
                <Clock generation={this.state.generation}/>
            </div>)
    };
};

export default Board;
