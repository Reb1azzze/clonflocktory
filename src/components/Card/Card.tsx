import React from 'react';
import PodrugePng from "../../assets/png/podruge.png";
import "./Card.css"
import MyForm from "../Form/MyForm";
import { useParams } from "react-router-dom";
import { getCardById } from "../../ts/Cards";

const Card = () => {

    const { id } = useParams();
    const cardId = Number(id);
    const card = getCardById(cardId);
    return (
        <div className='card'>
            <img src={PodrugePng} alt='wef' className='company-png-card'/>
            <span className='card-text'>{card?.title}</span>

            <MyForm/>
        </div>
    );
};

export default Card;