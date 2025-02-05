import React from 'react';
import PodrugePng from "../../assets/png/podruge.png";
import "./Card.css"
import MyForm from "../Form/MyForm";

const Card = () => {
    return (
        <div className='card'>
            <img src={PodrugePng} alt='wef' className='company-png-card'/>
            <span className='card-text'>Сертификат на 3000 рублей!</span>
            <MyForm/>
        </div>
    );
};

export default Card;