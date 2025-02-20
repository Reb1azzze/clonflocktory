import React from 'react';
import PresentPng from "../../assets/png/gift-icon.png";
import './ListCard.css';

interface CardProps {
    title: string;
    description: string;
    image: string;
    id: number;
}

const ListCard = (props: CardProps) => {
    return (
        <div className='list-card'>
            <img className='company-png' src={props.image} alt={props.description}/>
            <div className='title'>{props.title}</div>
            <img className='present-png' src={PresentPng} alt={props.description}/>
        </div>
    );
};

export default ListCard;