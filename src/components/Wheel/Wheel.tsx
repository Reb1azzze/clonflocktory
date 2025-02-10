import React, {useEffect, useState} from 'react';
import WheelPng from '../../assets/png/wheel-numbers.png'
import ArrowPng from '../../assets/png/arrow.png'
import './Wheel.sass'
import {Modal} from "antd";
import { useNavigate } from "react-router-dom";

const Wheel = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() =>{ setTimeout(() => {
        setIsModalOpen(true);
    }, 5200);},[])

    const handleOk = () => {
        setIsModalOpen(false);
        navigate("list");
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <img className='arrow' src={ArrowPng} alt='f'/>
            <img className='wheelpng' src={WheelPng} alt='d'/>
            <Modal className='modal' title="Поздравляем! Вам доступно 5 предложений! Выберите одно из них!" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}/>
        </div>
    );
};

export default Wheel;