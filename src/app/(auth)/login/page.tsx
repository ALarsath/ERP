'use client';
import { useState } from 'react';
import { Card, Form, Input, Button, Radio, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Title } = Typography;

export default function LoginPage() {
  const router = useRouter();
  const [userType, setUserType] = useState('parent');

  const onFinish = (values: any) => {
    // Handle login logic here
    console.log('Login values:', values);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <Title level={2}>CULTrix ERP</Title>
          <Title level={4}>Welcome Back</Title>
        </div>

        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <div className="mb-6">
            <Radio.Group 
              value={userType} 
              onChange={(e) => setUserType(e.target.value)}
              className="w-full flex justify-between"
            >
              <Radio.Button value="parent">Parent</Radio.Button>
              <Radio.Button value="teacher">Teacher</Radio.Button>
              <Radio.Button value="admin">Administration</Radio.Button>
            </Radio.Group>
          </div>

          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full bg-blue-600">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
