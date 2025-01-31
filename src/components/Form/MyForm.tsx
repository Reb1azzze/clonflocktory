import React from 'react';
import type { FormProps } from 'antd';
import { Form, Input } from 'antd';

type FieldType = {
    username?: string;
    phone?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const MyForm = () => {
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Имя"
                name="username"
                rules={[{ required: true, message: 'Введите свое имя!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item<FieldType>
                label="Телефон"
                name="phone"
                rules={[{ required: true, message: 'Введите свой телефон!' }]}
            >
                <Input />
            </Form.Item>

        </Form>
    );
};

{/*          <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Отправить
                </Button>
            </Form.Item>
*/}

export default MyForm;