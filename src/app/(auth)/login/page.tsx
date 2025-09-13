'use client';
import { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  Space,
  Divider,
  Select,
  message,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  LoginOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;
const { Option } = Select;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('student');

  const onFinish = (values: any) => {
    setLoading(true);
    // Simulate login API call
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
      message.success('Login successful!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#538D22] to-[#245501] flex items-center justify-center p-3 sm:p-4">
      <Card 
        className="w-full max-w-[420px] shadow-2xl p-3 sm:p-6"
        bordered={false}
      >
        <div className="text-center mb-3 sm:mb-4">
          <div className="flex flex-col items-center justify-center">
            <div className="w-[150px] sm:w-[200px]">
              <Image
                src="/images/CULTrix.png"
                alt="CULTrix Logo"
                width={200}
                height={80}
                priority
                className="w-full h-auto"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
          <Title level={3} className="!text-xl sm:!text-2xl !mt-3 !mb-1" style={{ color: '#245501' }}>
            Welcome Back
          </Title>
          <Text type="secondary" className="text-sm sm:text-base">
            Sign in to continue to your account
          </Text>
        </div>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
          layout="vertical"
          className="w-full"
        >
          <Form.Item
            name="userType"
            className="mb-4 sm:mb-6"
          >
            <Select
              defaultValue="student"
              onChange={setUserType}
              style={{ width: '100%' }}
              suffixIcon={<SafetyOutlined style={{ color: '#538D22' }} />}
              size="large"
              className="!h-[40px] sm:!h-[45px]"
              dropdownClassName="text-sm sm:text-base"
            >
              <Option value="student">Student</Option>
              <Option value="teacher">Teacher</Option>
              <Option value="parent">Parent</Option>
              <Option value="admin">Administrator</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            className="mb-3 sm:mb-4"
          >
            <Input 
              prefix={<UserOutlined className="text-[#538D22]" />} 
              placeholder={`Enter your ${userType} ID`}
              className="rounded-lg !h-[40px] sm:!h-[45px] !text-sm sm:!text-base"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            className="mb-4 sm:mb-6"
          >
            <Input.Password
              prefix={<LockOutlined className="text-[#538D22]" />}
              placeholder="Enter your password"
              className="rounded-lg !h-[40px] sm:!h-[45px] !text-sm sm:!text-base"
            />
          </Form.Item>

          <Form.Item className="mb-3 sm:mb-4">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full !h-[40px] sm:!h-[45px] rounded-lg !text-sm sm:!text-base flex items-center justify-center"
              style={{ 
                backgroundColor: '#538D22',
                borderColor: '#538D22',
              }}
              loading={loading}
              icon={<LoginOutlined />}
            >
              Sign In
            </Button>
          </Form.Item>

          <div className="flex justify-between items-center mb-4 px-1">
            <Button 
              type="link" 
              style={{ color: '#538D22', padding: 0 }}
              className="!text-xs sm:!text-sm !h-[28px] sm:!h-[32px]"
            >
              Forgot Password?
            </Button>
            <Button 
              type="link" 
              style={{ color: '#538D22', padding: 0 }}
              className="!text-xs sm:!text-sm !h-[28px] sm:!h-[32px]"
            >
              Need Help?
            </Button>
          </div>

          <Divider plain className="!my-3 sm:!my-4">
            <Text type="secondary" className="text-xs sm:text-sm">Or</Text>
          </Divider>

          <Space direction="vertical" size="middle" className="w-full">
            <Button 
              className="w-full !h-[40px] sm:!h-[45px] rounded-lg border-2 !text-sm sm:!text-base"
              style={{ borderColor: '#538D22', color: '#538D22' }}
            >
              Contact Administrator
            </Button>
            <div className="text-center px-2">
              <Text type="secondary" className="text-xs sm:text-sm">
                By signing in, you agree to our{' '}
                <Button 
                  type="link" 
                  style={{ color: '#538D22', padding: 0 }}
                  className="!text-xs sm:!text-sm !h-[20px] sm:!h-[24px]"
                >
                  Terms of Service
                </Button>
                {' '}and{' '}
                <Button 
                  type="link" 
                  style={{ color: '#538D22', padding: 0 }}
                  className="!text-xs sm:!text-sm !h-[20px] sm:!h-[24px]"
                >
                  Privacy Policy
                </Button>
              </Text>
            </div>
          </Space>
        </Form>
      </Card>

      <div 
        className="fixed bottom-0 left-0 right-0 p-4 text-center text-white/80"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
      >
    
      </div>
    </div>
  );
}
