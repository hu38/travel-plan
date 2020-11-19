import React, { useState } from "react";
import { Modal, Form, Input, Button, Select, Checkbox, AutoComplete, message } from 'antd';

const LogIn = (props) => {
    
    const [visibleLogIn, setVisibleLogIn] = useState(false);
    const [visibleRegister, setVisibleRegister] = useState(false);

    const showLogIn = () => {
        setVisibleLogIn(true);
    }

    const hideLogIn = () => {
        setVisibleLogIn(false);
    }

    const showRegister = () => {
        setVisibleRegister(true);
    }

    const handleOk = () => {
        setVisibleLogIn(false);
        setVisibleRegister(false);
    }
      
    const handleCancel = () => {
        console.log("cancel");
        setVisibleLogIn(false);
        setVisibleRegister(false);
    }

    // Log in Form
    const layout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 14 },
      };
    const tailLayout = {
        wrapperCol: { offset: 7, span: 16 },
    };
      
    const onFinish = (values) => {
        props.getLogin(values);
    };
      
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    // Reigister Form
    const { Option } = Select;
    const AutoCompleteOption = AutoComplete.Option;
    
    const formItemLayout = {
      labelCol: {xs: {span: 24,},sm: {span: 8,},},
      wrapperCol: {xs: {span: 24,},sm: {span: 16,},},
    };
    const tailFormItemLayout = {
      wrapperCol: {xs: {span: 24,offset: 0,},sm: {span: 16,offset: 8,},},
    };
  
    const [form] = Form.useForm();
  
    const onFinishForm = (values) => {
        props.postRegister(values);
        setVisibleRegister(false);
        console.log('Received values of form: ', values);
    };
  
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    

    return (
        <>
            <Button type="link" className='LogIn' onClick={showLogIn}> Log in</Button>
            <Modal
              title="Log in"
              visible={visibleLogIn}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    >
                    <Form.Item
                        label="User ID"
                        name="user_id"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                        <br></br>
                        <Button type="link" onClick={()=> {hideLogIn(); showRegister();}}>Register</Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
              title="Register"
              visible={visibleRegister}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinishForm}
                    initialValues={{
                    }}
                    scrollToFirstError
                >
                    <Form.Item
                    name="username"
                    label="User ID"
                    rules={[
                        {
                        pattern: /^(?:\d*)$/,
                        message: 'Value should contain just number!',
                        },
                        {
                        required: true,
                        message: 'Please input your User ID!',
                        },
                    ]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                    >
                    <Input.Password />
                    </Form.Item>

                    <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                        required: true,
                        message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                            }

                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                        }),
                    ]}
                    >
                    <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default LogIn;