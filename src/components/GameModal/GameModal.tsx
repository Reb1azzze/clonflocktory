import React, {useEffect, useState} from "react";
import {Button, Modal} from "antd";
import MyForm from "../Form/MyForm";
import GamePresentPng from "../../assets/png/game-present.png"
import "./GameModal.css";


interface HtmlPopupProps {
    isOpen: boolean;
    onClose: () => void;
    url: string;
}

const GameModal: React.FC<HtmlPopupProps> = ({ isOpen, onClose, url }) => {

    const [startGame, setStartGame] = useState(false);
    const [finishGame, setFinishGame] = useState(false);
    const [Present, SetPresent] = useState(false);

    useEffect(() => {
        const handleGameMessage = (event: MessageEvent) => {
            if (event.data?.gameEnded) {
                setFinishGame(true);
            }
        };

        window.addEventListener("message", handleGameMessage);

        return () => {
            window.removeEventListener("message", handleGameMessage);
        };
    }, []);

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null} // Hides default buttons
            width={800} // Adjust modal size as needed
            className={'game-modal'}
        >
            <div className="game-modal-inner">
                {finishGame ? <div className='game-winner-container'>
                    <img src={"https://podruge.ru/local/templates/main/assets/img/logo.svg"} alt={"logo"}/>
                        <span className="game-winner-text">🎁Поздравляем, вы выиграли "Сертификат на 3000р!" Заполните поля</span>
                </div> :
                    <iframe className={startGame ? 'game-enabled' : 'game-disabled'}
                            src={url}
                            width="100%"
                            height="500px"
                            style={{ border: "none" }} />}

                {finishGame ?
                    <div className={'after-game-container'}>
                        <img className={Present ? 'game-present-png' : 'game-present-png-disabled'} src={GamePresentPng} alt={'gamepng'}/>
                        <MyForm offerId={1} onSuccess={()=>{}} onProgress={(percent)=> {SetPresent(percent === 100)}}/>
                    </div>:
                    <div className={'before-game-container'}>
                        <img className={'game-present-png'} src={GamePresentPng} alt={'gamepng'}/>
                        <h3>Испытай свою удачу</h3>
                        <span>У вас есть шанс получить крутой бонус! Вам стоит всего лишь нажать кнопку ниже:</span>
                        <Button type="primary"
                                variant="solid"
                                color="cyan"
                                onClick={()=>{setStartGame(true)}}
                                className="close-modal-button">Играть</Button>
                    </div>}

            </div>
        </Modal>
    );
};

export default GameModal;