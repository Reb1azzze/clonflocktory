import React, {useEffect, useState} from 'react';
import {CountdownProps, List, Modal, Progress, ProgressProps} from 'antd';
import ListCard from "../ListCard/ListCard";
import { Statistic } from 'antd';
import useOfferList from "../../hooks/useOfferList";
import { IOfferListItem } from "../../api/types/OfferList";
import sendOfferList from "../../api/metrics/sendOfferList";
import sendOfferOnClick from "../../api/metrics/sendOfferOnClick";
import Card from "../Card/Card";
import Cookies from "js-cookie";
import "./MyList.css";

const { Countdown } = Statistic;
const fiveMin = 1000 * 60 * 5;

const twoColors: ProgressProps['strokeColor'] = {
    '0%': '#71fdc0',
    '100%': '#c2f3d6',
};

const MyList: React.FC = () => {
    const data = useOfferList();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<IOfferListItem | null>(null);
    const [deadline, setDeadline] = useState<number>(Date.now() + fiveMin);
    const [time, setTime] = useState(fiveMin);
    const hiddenOffers = JSON.parse(Cookies.get("hiddenOffers") || "[]");
    const [visibleOffers, setVisibleOffers] = useState<Record<number, number>>({});
    const [sentOffers, setSentOffers] = useState<Set<number>>(new Set());
    const uuid = Cookies.get("vid");

    const handleOpenModal = (item: IOfferListItem) => {
        sendOfferOnClick(item.id, window.location.href);
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

    const handleFormSuccess = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    useEffect(() => {
        const newDeadline = Date.now() + fiveMin;
        setDeadline(newDeadline);
        setTime(fiveMin);
    }, []);
/*
* useEffect(() => {
        if (data?.data?.length) {
            sendOfferList(data.data.map((offer) => String(offer.id)), window.location.href, uuid);
        }
    }, [data]);
*
* */

    useEffect(() => {
        let scrollTimeout: NodeJS.Timeout;

        const observer = new IntersectionObserver((entries) => {
            setVisibleOffers((prevVisibleOffers) => {
                const newVisibleOffers = { ...prevVisibleOffers };

                entries.forEach((entry) => {
                    const offerId = Number(entry.target.getAttribute("data-id"));
                    if (entry.isIntersecting) {
                        newVisibleOffers[offerId] = Date.now();
                    } else {
                        delete newVisibleOffers[offerId];
                    }
                });

                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    setSentOffers((prevSentOffers) => {
                        const newOffers = Object.entries(newVisibleOffers)
                            .map(([id, ts]) => ({ oid: Number(id), ts }))
                            .filter(({ oid }) => !prevSentOffers.has(oid));

                        if (newOffers.length > 0) {
                            console.log("📤 Sending request:", newOffers.map(o => o.oid));
                            sendOfferList(newOffers.map(o => String(o.oid)), window.location.href, uuid || "");

                            return new Set([...prevSentOffers, ...newOffers.map(o => o.oid)]);
                        }
                        return prevSentOffers;
                    });
                }, 2000);

                return newVisibleOffers;
            });
        }, { threshold: 0.5 });

        const startObserving = () => {
            const items = document.querySelectorAll(".offer-item");
            if (items.length > 0) {
                items.forEach((el) => observer.observe(el));
            } else {
                setTimeout(startObserving, 500); // ⏳ Ждём появления элементов
            }
        };

        startObserving();

        return () => observer.disconnect();
    }, [data]); // ✅ Перезапускаем `useEffect` после загрузки данных
    

    return(
    <div className={'list-component'}>
        <div className='list-header'>
            Выберите 1 подарок
        </div>
        <div className="progress-bar">
            <Progress type="line" percent={+((time / fiveMin) * 99).toFixed(0)} strokeColor={twoColors} />
            <Countdown title="Осталось времени: " value={deadline} onChange={onChangeTimer} format="mm:ss" />
        </div>

        <List
            size="large"
            bordered
            dataSource={data?.data?.filter(item => !hiddenOffers.includes(item.id)) || []}
            className={'my-list'}
            renderItem={(item: IOfferListItem) =>
                <List.Item
                    onClick={() => handleOpenModal(item)} style={{ cursor: "pointer" }}
                    className="offer-item"
                    data-id={item.id}>
                    <ListCard
                        title={item.title}
                        description={item.description}
                        logo_full={item.logo_full}
                        logo_short={item.logo_short}
                        id={item.id}/>
                </List.Item>}/>
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
                    description_short={selectedItem.description_short}
                    logo_full={selectedItem.logo_full}
                    logo_short={selectedItem.logo_short}
                    id={selectedItem.id}
                    privacy={selectedItem.privacy}
                    onSuccess={handleFormSuccess}
                />
            )}
        </Modal>
        <div className='list-footer'>
            <a className='link' href={'https://podruge.ru/politika-konfidentsialnosti/'}>Политика конфиденциальности</a>
        </div>
    </div>
)};

export default MyList;