import React, {useEffect, useState} from 'react';
import { Button, Form, Input } from 'antd';
import { PostSubmit } from "../../api/v1/Submit";
import { ISubmitData } from "../../api/types/Submit";
import ReactInputMask from "react-input-mask";
import UserFilled from "../../assets/svg/UserFilled";
import PhoneFilled from "../../assets/svg/PhoneFilled";
import Cookies from "js-cookie";
import "./MyForm.css";
import { ICardProps } from '../Card/Card';
interface MyFormProps {
    offer: ICardProps;
    onSuccess: () => void;
}

const MyForm: React.FC<MyFormProps> = ({ offer, onSuccess }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [form] = Form.useForm();
    const [isValid, setIsValid] = useState(false);

    const onFinish = async (values: { name: string; phone: string }) => {
        try {
            await PostSubmit({
                name: values.name,
                phone: values.phone.replace(/\D/g, "").substring(0,11),
                offer_id: offer.id,
                ref: window.location.href,
                uuid: Cookies.get("vid") || ""
            });
            onSuccess();
        } catch {
            console.log('Ошибка при отправке формы');
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        // updateProgressBar(newName, phone);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPhone = e.target.value;
        setPhone(newPhone);
        // updateProgressBar(name, newPhone);
    };

    useEffect(() => {
        const handler = () => {
            const hasErrors = form.getFieldsError().some(({ errors }) => errors.length > 0);
            const allTouched = form.isFieldsTouched(true);
            setIsValid(!hasErrors && allTouched);
        };

        handler(); // call once initially
        const interval = setInterval(handler, 30); // poll form validity

        return () => clearInterval(interval);
    }, [form]);

    return (
        <Form
            layout="vertical"
            form={form}
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            className="form"
            initialValues={{ name: '', phone: '' }}
        >
            <Form.Item<ISubmitData>
                name="name"
                validateDebounce={500}
                rules={[{ required: true, message: 'Введите свое имя!' }]}
            >
                <Input
                    className="form-input"
                    size={"large"}
                    placeholder="Ваше имя"
                    value={name}
                    onChange={handleNameChange}
                    suffix={<UserFilled style={{ color: '#bbb' }} />}
                />
            </Form.Item>
            <Form.Item<ISubmitData>
                name="phone"
                validateDebounce={500}

                rules={[
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
                    {(inputProps) =>
                        <Input {...inputProps}
                               className="form-input"
                               size="large"
                               placeholder="Ваш телефон"
                               suffix={<PhoneFilled style={{ color: '#bbb' }} />}
                        />}
                </ReactInputMask>
            </Form.Item>
            <div className='card-politics' dangerouslySetInnerHTML={{ __html: offer.privacy }}></div>
            <Form.Item label={null}>
                <Button
                    disabled={!isValid}
                    className="form-button"
                    type="primary"
                    variant="solid"
                    color="cyan"
                    htmlType="submit"
                >
                    Забрать подарок
                </Button>
            </Form.Item>
        </Form>
    );
};

export default MyForm;
