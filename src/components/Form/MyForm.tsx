import React, { useState } from 'react';
import { Button, Progress, ProgressProps, Form, Input } from 'antd';
import { PostSubmit } from "../../api/v1/Submit";
import { ISubmitData } from "../../api/types/Submit";
import ReactInputMask from "react-input-mask";
import "./MyForm.css";

interface MyFormProps {
    offerId: number;
    onSuccess: () => void;
}

const twoColors: ProgressProps['strokeColor'] = {
    '0%': '#d1fdef',
    '100%': '#b7fdeb',
};

const MyForm: React.FC<MyFormProps> = ({ offerId, onSuccess }) => {
    const [fillPercent, setFillPercent] = useState(0);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const onFinish = async (values: { name: string; phone: string }) => {
        try {
            await PostSubmit({
                name: values.name,
                phone: values.phone.replace(/\D/g, "").substring(0,11),
                offer_id: offerId,
            });
            console.log('Success:');
            onSuccess();
        } catch {
            console.log('Ошибка при отправке формы');
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        updateProgressBar(newName, phone);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPhone = e.target.value;
        setPhone(newPhone);
        updateProgressBar(name, newPhone);
    };

    const updateProgressBar = (name: string, phone: string) => {
        const isPhoneValid = phone.replace(/\D/g, "").length >= 11;
        const isNameValid = name.trim() !== '';

        if (isNameValid && isPhoneValid) {
            setFillPercent(100);
        } else if (isNameValid || isPhoneValid) {
            setFillPercent(50);
        } else {
            setFillPercent(0);
        }
    };

    return (
        <Form
            layout="vertical"
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            className="form"
            initialValues={{ name: '', phone: '' }}
        >
            <Progress percent={fillPercent} strokeColor={twoColors} />
            <Form.Item<ISubmitData>
                hasFeedback
                name="name"
                validateDebounce={500}
                rules={[{ required: true, message: 'Введите свое имя!' }]}
            >
                <Input
                    className="form-input"
                    style={{ marginTop: '3dvh' }}
                    size={"large"}
                    placeholder="Ваше имя"
                    value={name}
                    onChange={handleNameChange}
                />
            </Form.Item>
            <Form.Item<ISubmitData>
                hasFeedback
                name="phone"
                validateDebounce={500}
                rules={[
                    { required: true, message: 'Введите свой телефон!' },
                    {
                        validator: (_, value) => {
                            let cleanedValue = value.replace(/\D/g, "");
                            cleanedValue = cleanedValue.length > 11 ? cleanedValue.substring(0,11) : cleanedValue;
                            return cleanedValue.length === 11 ? Promise.resolve() : Promise.reject(new Error("Введите корректный номер!"));
                        },
                    },
                ]}
            >
                <ReactInputMask mask="+7 999 999-99-99" value={phone} onChange={handlePhoneChange} >
                    {(inputProps) => <Input {...inputProps} className="form-input" size="large" placeholder="Ваш телефон" />}
                </ReactInputMask>
            </Form.Item>
            <Form.Item label={null}>
                <Button
                    disabled={fillPercent !== 100}
                    className="form-button"
                    type="primary"
                    variant="solid"
                    color="cyan"
                    htmlType="submit"
                >
                    Получить подарок
                </Button>
            </Form.Item>
        </Form>
    );
};

export default MyForm;
