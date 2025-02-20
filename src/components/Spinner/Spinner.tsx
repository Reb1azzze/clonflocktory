import React from 'react';
import './Spinner.scss';

const Spinner = () => {
    return (
        <div>
            <ul className='spinner'>
                <li className='prize' style={{'--rotate': '-22.5deg'} as React.CSSProperties}><div className='prize-text'><span>7</span></div></li>
                <li className='prize' style={{'--rotate': '-67.5deg'} as React.CSSProperties}><div className='prize-text'><span>1</span></div></li>
                <li className='prize' style={{'--rotate': '-112.5deg'} as React.CSSProperties}><div className='prize-text'><span>3</span></div></li>
                <li className='prize' style={{'--rotate': '-157.5deg'} as React.CSSProperties}><div className='prize-text'><span>11</span></div></li>
                <li className='prize' style={{'--rotate': '-202.5deg'} as React.CSSProperties}><div className='prize-text'><span>15</span></div></li>
                <li className='prize' style={{'--rotate': '-247.5deg'} as React.CSSProperties}><div className='prize-text'><span>4</span></div></li>
                <li className='prize' style={{'--rotate': '-292.5deg'} as React.CSSProperties}><div className='prize-text'><span>6</span></div></li>
                <li className='prize' style={{'--rotate': '-337.5deg'} as React.CSSProperties}><div className='prize-text'><span>25</span></div></li>
            </ul>
        </div>
    );
};

export default Spinner;