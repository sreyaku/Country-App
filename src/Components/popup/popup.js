import React from 'react';
import './popup.css';

function Popup(props) {
    return (props.trigger) ? (
        <div className='popup'>
            <div className='pop-inner'>
                <button className='close-button' onClick={()=>props.setTrigger(false)}>X</button>
                {props.children}
            </div>
        </div>
    ) : ''
}

export default Popup