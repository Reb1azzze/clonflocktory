import React, {useState} from 'react';
import {CountdownProps, List, Modal, Progress, ProgressProps} from 'antd';
import ListCard from "../ListCard/ListCard";
import { Statistic } from 'antd';
import useOfferList from "../../hooks/useOfferList";
import { IOfferListItem } from "../../api/types/OfferList";
import Card from "../Card/Card";
import {useIsMobile} from "../../hooks/useIsMobile";
import "./MyList.css";


const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 5;
const fiveMin = 1000 * 60 * 5 + 1500;

const twoColors: ProgressProps['strokeColor'] = {
    '0%': '#71fdc0',
    '100%': '#c2f3d6',
};


const MyList: React.FC = () => {
    const data = useOfferList();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<IOfferListItem | null>(null);
    const [time, setTime] = useState(deadline);
    const isMobile = useIsMobile();

    const handleOpenModal = (item: IOfferListItem) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const onChangeTimer: CountdownProps['onChange'] = (val) => {
        if (typeof val === 'number' ) {
            setTime(val);
        }
    }

    return(
    <div className={'list-component'}>
        <div className='list-header'>
            Выберите 1 подарок
        </div>
        {isMobile ?
            <div className='progress-bar'>
                <Progress type="line" percent={+((time/fiveMin)*100).toFixed(0)} strokeColor={twoColors}/>
                <Countdown title="Осталось времени: " value={deadline} onChange={onChangeTimer} format="mm:ss" />
            </div>
            : <div className='progress-bar'>
                <Progress type="line" percent={+((time/fiveMin)*100).toFixed(0)} strokeColor={twoColors}/>
                <Countdown title="Осталось времени: " value={deadline} onChange={onChangeTimer} format="mm:ss" />
        </div>}

        <List
            size="large"
            bordered
            dataSource={data?.data || []}
            className={'my-list'}
            renderItem={(item: IOfferListItem) => <List.Item onClick={() => handleOpenModal(item)} style={{ cursor: "pointer" }}>
                <ListCard
                title={item.title}
                description={item.description}
                logo_full={item.logo_full}
                logo_short={item.logo_short}
                id={item.id}
            /></List.Item>}
        />
        <Modal
            title={null}
            open={isModalOpen}
            onCancel={handleCloseModal}
            footer={null}
            centered
        >
            {selectedItem && (
                <Card
                    key={selectedItem.id}
                    title={selectedItem.title}
                    description={selectedItem.description}
                    logo_full={selectedItem.logo_full}
                    logo_short={selectedItem.logo_short}
                    id={selectedItem.id}
                />
            )}
        </Modal>

        <div className='list-footer'>
            <a className='link' href={'https://podruge.ru/politika-konfidentsialnosti/'}>Политика конфиденциальности</a>
        </div>
    </div>
)};

export default MyList;