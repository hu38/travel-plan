import React, { useState } from "react";
import { Modal, Form, Input, Button, Checkbox, message } from 'antd';

const LogIn = (props) => {
    
    const [visible, setVisible] = useState(false);
    
    const showModel = () => {
        setVisible(true);
    }

    const handleOk = () => {
        setVisible(false);  
    }
      
    const handleCancel = () => {
        console.log("cancel");
        setVisible(false);
    }

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
    

    return (
        <>
            <Button type="link" className='LogIn' onClick={showModel}> Log in</Button>
            <Modal
              title="Log in"
              visible={visible}
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
                    visible={visible}
                    >
                    <Form.Item
                        label="Username"
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
                        <Button type="link">Register</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default LogIn;