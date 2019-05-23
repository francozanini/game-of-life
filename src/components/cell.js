import React from 'react';
import './cell.css'

function Cell(props) {
    const color = props.alive ? 'alive' : 'dead'
    return (
        <div  className={'square ' + color} />);
};

export default Cell;
