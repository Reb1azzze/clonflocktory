import React from 'react';
import { List } from 'antd';
import "./MyList.css";
import ListCard from "../ListCard/ListCard";
import PodrugeSvg from "../../assets/svg/logo-sm.svg";
import PodrugePng from "../../assets/png/podruge.png"
import { Statistic } from 'antd';

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 5;


const data = [
    <ListCard title="Сертификат 3000р" description="круто" image={PodrugePng} id={1} />,
    <ListCard title="Скидка 15%" description="круто" image={PodrugePng} id={2} />,
    <ListCard title="Клубная карта" description="круто" image={PodrugePng} id={3} />,
    <ListCard title="Сертификат 1000р" description="круто" image={PodrugePng} id={4} />,
    <ListCard title="Скидка 10%" description="круто" image={PodrugePng} id={5} />,
];

const MyList: React.FC = () => (
    <div className={'list-component'}>
        <div className='list-header'>
            Выберите 1 подарок
            <Countdown title="Осталось времени: " value={deadline} format="HH:mm:ss:SSS" />
        </div>
        <List
            size="large"
            bordered
            dataSource={data}
            className={'my-list'}
            renderItem={(item) => <List.Item>{item}</List.Item>}
        />
    </div>
);

export default MyList;