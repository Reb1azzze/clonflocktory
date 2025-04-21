import React from 'react';
import PresentPng from "../../assets/png/gift-icon.png";
import test from "../../assets/png/gift.png";
import {useIsMobile} from "../../hooks/useIsMobile";
import './ListCard.css';

interface CardProps {
    title: string;
    description: string;
    logo_full: string;
    logo_short: string;
    id: number;
}

const ListCard = (props: CardProps) => {
    const isMobile = useIsMobile();
    return (
        <div className='list-card'>
            {isMobile ? <img className='company-png' src={props.logo_short} alt={props.description}/> :
                <img className='company-png' src={props.logo_full} alt={props.description}/>}
            <div className='title'>{props.title}</div>
            <img className='present-png' src={test} alt={props.description}/>
        </div>
    );
};

export default ListCard;