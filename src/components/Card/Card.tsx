import React, { useState } from 'react';
import MyForm from "../Form/MyForm";
import { Button } from "antd";
import sendOfferLead from "../../api/metrics/sendOfferOnSubmit";
import Cookies from "js-cookie";
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
    const uuid = Cookies.get("vid");
    const moreInfoRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className='card-container'>
            <img src={props.logo_full} alt='wef' className='company-png-card'/>
            <span className='card-text'>{props.title}</span>
            <div className='card-description'>{props.description_short}</div>
            <div className='card-more-info-button' onClick={()=> {setMoreInfo(!moreInfo)}}>Подробнее&gt;</div>
            <div
                ref={moreInfoRef}
                style={{
                    maxHeight: moreInfo ? `${moreInfoRef.current?.scrollHeight}px` : "0px",
                    opacity: moreInfo ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 250ms ease-in-out, opacity 250ms ease-in-out"}}
                className='card-more-info'>
                {props.description}
            </div>
            {success ? <div className="success-message">
                <span>Спасибо за выбор клиники «Подружки»! Наш оператор свяжется с Вами с 9:00 до 21:00 по МСК времени для согласования деталей и получения
«Лазерная эпиляция бикини + подмышки за 1990₽» и СЮРПРИЗА от Сети клиник лазерной эпиляции «Подружки». Хорошего дня! "{props.title}" и СЮРПРИЗА от Сети клиник лазерной эпиляции "Подружки". Хорошего дня!</span>
                <Button type="primary"
                        variant="solid"
                        color="cyan"
                        onClick={props.onSuccess}
                        className="close-modal-button">Выбрать еще 1 подарок</Button>
            </div> :
                <div>
                    <MyForm offerId={props.id}
                            onSuccess={() =>
                            {
                                setSuccess(true);
                                sendOfferLead(props.id, window.location.href, uuid || "");
                                const savedOffers = JSON.parse(Cookies.get("hiddenOffers") || "[]");
                                Cookies.set("hiddenOffers", JSON.stringify([...savedOffers, props.id]), { expires: 1 });
                            }}
                    />
            </div>}
        </div>
    );
};

export default Card;