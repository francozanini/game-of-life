import React from 'react';
import './cell.css'

function Cell(props) {
    const onClick = props.onClick;
    const color = props.alive ? 'alive' : 'dead'
    return (
        <div  id={props.id} onClick={onClick} className={'square ' + color} />);
};

export default Cell;
