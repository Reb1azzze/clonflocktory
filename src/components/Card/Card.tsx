import React, {useState} from 'react';
import "./Card.css"
import MyForm from "../Form/MyForm";

interface ICardProps {
    title: string;
    description: string;
    image: string;
    id: number;
}

const Card = (props: ICardProps) => {

    const [moreInfo, setMoreInfo] = useState(false);

    return (
        <div className='card'>
            <img src={props.image} alt='wef' className='company-png-card'/>
            <span className='card-text'>{props.title}</span>
            <MyForm offerId={props.id}/>
            <div className='card-politics'>Нажимая кнопку «Получить подарок», я соглашаюсь с политикой конфиденциальности</div>
            <div className='card-description'>{props.description}</div>
            <div className='card-more-info-button' onClick={()=> {setMoreInfo(!moreInfo)}}>Подробнее</div>
            <div style={{ maxHeight: moreInfo ? "300px" : "0px", opacity: moreInfo ? 1 : 0,}} className='card-more-info'>Скидка 15% предоставляется на покупку основного курса по любому предмету только на 1 месяц и только для новых клиентов.
                Новый клиент — это человек, который не имел транзакций на сумму свыше 600 рублей включительно последние 120 дней.</div>
        </div>
    );
};

export default Card;