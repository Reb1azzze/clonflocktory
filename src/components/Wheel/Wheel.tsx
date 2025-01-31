import React, {useEffect, useState} from 'react';
import WheelPng from '../../assets/png/wheelfq.png'
import ArrowPng from '../../assets/png/arrow.png'
import PodrugePng from '../../assets/png/podruge.png'
import PresentPng from '../../assets/png/present.png'
import './Wheel.sass'
import {Modal} from "antd";
import MyForm from "../Form/MyForm";


const Wheel = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() =>{ setTimeout(() => {
        setIsModalOpen(true);
    }, 5200);},[])

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <img className='arrow' src={ArrowPng} alt='f'/>
            <img className='wheelpng' src={WheelPng} alt='d'/>
            <Modal className='modal' title="Поздравляем! Вы выиграли сертификат на 3000р!" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className={'pngs'}>
                    <img src={PodrugePng} alt='d'/>
                    <img src={PresentPng} alt='d'/>
                </div>
                <MyForm/>
            </Modal>
        </div>
    );
};

export default Wheel;