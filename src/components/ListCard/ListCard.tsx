import React from 'react';
import PresentPng from "../../assets/png/gift.png";
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
            {isMobile ? <img className='company-png' src={props.logo_short} alt={'1'}/> :
                <img className='company-png' src={props.logo_full} alt={'2'}/>}
            <div className='title'>{props.title}</div>
            <img className='present-png' src={PresentPng} alt={'3'}/>
        </div>
    );
};

export default ListCard;