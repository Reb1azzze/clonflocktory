import React from 'react';
import PresentPng from "../../assets/png/gift.svg";
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
            <img className='company-png' src={props.logo_full} alt={'1'}/>
            <div className='title'>{props.title}</div>
            {isMobile ? <></> : <img className='present-png' src={PresentPng} alt={'3'}/>}
            {!isMobile ? <></> : <button type="button" className="pre-button">Забрать подарок</button> }
        </div>
    );
};

export default ListCard;