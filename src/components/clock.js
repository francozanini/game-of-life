import React from 'react';
import './clock.css'
function Clock(props) {
    return (
    <div className='clock'>
        <h1>{props.generation}</h1>
    </div>)
};

export default Clock;
