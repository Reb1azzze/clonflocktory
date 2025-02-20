import React, {useEffect, useState} from 'react';
import WheelPng from '../../assets/png/spinner.png'
import ArrowPng from '../../assets/png/spinner icon.png'
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
                        <span>Поздравляем, вам доступно 3 предложения!</span>
                        <span>Выберите одно из них. У вас есть 5 минут.</span>
                        <Button variant="solid" color='cyan' className='wheel-button' onClick={handleOk}>ОК</Button>
                    </div> :
                    <div className='wheel-text-block'>
                        <span>Определяем количество доступных вам подарков.</span>
                    </div>}
            </div>
        </div>
    );
};

export default Wheel;