import React, { useState } from 'react';
import MyForm from "../Form/MyForm";
import { Button } from "antd";
import "./Card.css"

interface ICardProps {
    title: string;
    description: string;
    description_short: string;
    logo_full: string;
    logo_short: string
    privacy: string;
    id: number;
    onSuccess: () => void;
}

const Card = (props: ICardProps) => {

    const [moreInfo, setMoreInfo] = useState(false);
    const [success, setSuccess] = useState(false);

    return (
        <div className='card'>
            <img src={props.logo_full} alt='wef' className='company-png-card'/>
            <span className='card-text'>{props.title}</span>
            {success ? <div className="success-message">
                <span>🎁Спасибо за выбор клиники "Подружки"! Наш оператор свяжется с Вами с 9:00 до 21:00 по МСК времени для согласования деталей и получения "{props.title}" и СЮРПРИЗА от Сети клиник лазерной эпиляции "Подружки". Хорошего дня!</span>
                <Button type="primary"
                        variant="solid"
                        color="cyan"
                        onClick={props.onSuccess}
                        className="close-modal-button">Выбрать еще 1 подарок</Button>
            </div> : <div> <MyForm offerId={props.id} onSuccess={() => setSuccess(true)}/>
                <div className='card-politics'>{props.privacy}</div>
                <div className='card-description'>{props.description_short}</div>
                <div className='card-more-info-button' onClick={()=> {setMoreInfo(!moreInfo)}}>Подробнее</div>
                <div
                    style={{ maxHeight: moreInfo ? "300px" : "0px", opacity: moreInfo ? 1 : 0,}} className='card-more-info'>
                    {props.description}
                </div>
            </div>}
        </div>
    );
};

export default Card;