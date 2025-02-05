import React from 'react';
import PresentPng from "../../assets/png/present.png";
import './ListCard.css';
import {useNavigate} from "react-router-dom";

interface CardProps {
    title: string;
    description: string;
    image: string;
    id: number;
}

const ListCard = (props: CardProps) => {
    let navigate = useNavigate();
    return (
        <div className='list-card' onClick={() => {navigate("card")}}>
            <img className='company-png' src={props.image} alt={props.description}/>
            <div className='title'>{props.title}</div>
            <img className='present-png' src={PresentPng} alt={props.description}/>
        </div>
    );
};

/*const image = `url(${props.image})`;
* const navigate = useNavigate();
    const handleclick= () => {
        navigate(props.id);
    }
*
* */

export default ListCard;