import React from 'react';
import { List } from 'antd';
import "./MyList.css";
import ListCard from "../ListCard/ListCard";
import PodrugeSvg from "../../assets/svg/logo-sm.svg";

const data = [
    <ListCard title="Сертификат 3000р" description="круто" image={PodrugeSvg} id={1} />,
    <ListCard title="Скидка 15%" description="круто" image={PodrugeSvg} id={2} />,
    <ListCard title="Клубная карта" description="круто" image={PodrugeSvg} id={3} />,
];

const MyList: React.FC = () => (
    <div>
        <List
            size="large"
            header={<div className='list-header'>Выберите 1 подарок</div>}
            footer={<div className='list-footer'></div>}
            bordered
            dataSource={data}
            className={'my-list'}
            renderItem={(item) => <List.Item>{item}</List.Item>}
        />
    </div>
);

export default MyList;