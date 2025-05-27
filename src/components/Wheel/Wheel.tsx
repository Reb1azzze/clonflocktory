import React, {useEffect, useState} from 'react';
import WheelPng from '../../assets/png/Wheel svg.png';
import ArrowPng from '../../assets/png/arrow shadow.png';
import { useNavigate } from "react-router-dom";
import {Button} from "antd";
import './Wheel.sass'

const Wheel = () => {
    const [isRotated, setIsRotated] = useState(false);
    const navigate = useNavigate();
    useEffect(() =>{ setTimeout(() => {
        setIsRotated(true);
    }, 5200);},[])

    const handleOk = () => {
        navigate("list");
    };

    return (
        <div className='wheel-page'>
            <div className='wheel-container'>
                <img className='arrow' src={ArrowPng} alt='f'/>
                <img className='wheelpng' src={WheelPng} alt='d'/>
                {isRotated ?
                    <div className='wheel-text-block'>
                        <div className='wheel-text'>Вам доступно 8 подарков</div>
                        <Button variant="solid" color='cyan' className='wheel-button' onClick={handleOk}>Выбрать</Button>
                    </div> :
                    <div className='wheel-text-block'>
                        <span className='wheel-spin-text'>Определяем количество доступных вам подарков.</span>
                    </div>}
            </div>
        </div>
    );
};

export default Wheel;