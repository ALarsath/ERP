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
  Checkbox,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  LoginOutlined,
  SafetyOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  GoogleOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;
const { Option } = Select;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('student');
  const [showPassword, setShowPassword] = useState(false);

  interface LoginFormValues {
    username: string;
    password: string;
    remember?: boolean;
    userType?: string;
  }

  const onFinish = (values: LoginFormValues) => {
    setLoading(true);
    // Simulate login API call
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
      message.success('Welcome back!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-emerald-50 via-cyan-50 to-sky-50 flex items-center justify-center p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 text-white shadow-2xl">
          <div>
            <div className="flex items-center gap-3 mb-12">
              <div className="bg-white/20 p-2 rounded-xl">
                <Image
                  src="/images/CULTrix.png"
                  alt="CULTrix Logo"
                  width={40}
                  height={40}
                  priority
                  className="w-10 h-10"
                />
              </div>
              <span className="text-2xl font-bold">CULTrix</span>
            </div>
            
            <div className="max-w-md">
              <h1 className="text-4xl font-bold mb-4">Welcome to Your Learning Hub</h1>
              <p className="text-emerald-100 text-lg leading-relaxed">
                Access your academic resources, track progress, and connect with peers and instructors in one seamless platform.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 max-w-md">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">95%</div>
              <div className="text-emerald-200 text-sm">Student Satisfaction</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-emerald-200 text-sm">Access Support</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-emerald-200 text-sm">Active Users</div>
            </div>
          </div>
        </div>
        
        {/* Right side - Login Form */}
        <div className="flex items-center justify-center">
          <Card 
            className="w-full max-w-md shadow-xl border-0 rounded-2xl overflow-hidden"
            style={{ 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
            }}
          >
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="flex flex-col items-center justify-center mb-4">
                  <div className="bg-emerald-100 p-3 rounded-2xl mb-4">
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-xl">
                      <Image
                        src="/images/CULTrix.png"
                        alt="CULTrix Logo"
                        width={40}
                        height={40}
                        priority
                        className="w-10 h-10"
                      />
                    </div>
                  </div>
                  
                  <Title level={2} className="!text-2xl !font-bold !mb-2 !text-slate-800">
                    Sign In to Account
                  </Title>
                  <Text type="secondary" className="text-base">
                    Enter your credentials to continue
                  </Text>
                </div>
                
                <div className="lg:hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-6 rounded-xl inline-flex items-center gap-2">
                    <span className="font-medium">CULTrix Portal</span>
                  </div>
                </div>
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
                  className="mb-6"
                >
                  <Select
                    defaultValue="student"
                    onChange={setUserType}
                    style={{ width: '100%' }}
                    suffixIcon={<SafetyOutlined className="text-emerald-500" />}
                    size="large"
                    className="rounded-xl !h-12"
                  >
                    <Option value="student">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">S</div>
                        <span>Student</span>
                      </div>
                    </Option>
                    <Option value="teacher">
                      <div className="flex items-center gap-2">
                        <div className="bg-purple-100 text-purple-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">T</div>
                        <span>Teacher</span>
                      </div>
                    </Option>
                    <Option value="parent">
                      <div className="flex items-center gap-2">
                        <div className="bg-amber-100 text-amber-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">P</div>
                        <span>Parent</span>
                      </div>
                    </Option>
                    <Option value="admin">
                      <div className="flex items-center gap-2">
                        <div className="bg-rose-100 text-rose-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">A</div>
                        <span>Administrator</span>
                      </div>
                    </Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                  className="mb-5"
                >
                  <Input 
                    prefix={<UserOutlined className="text-emerald-500" />} 
                    placeholder={`Enter your ${userType} ID`}
                    className="rounded-xl !h-12 !border-slate-300 hover:!border-emerald-400 focus:!border-emerald-500 focus:!shadow-emerald-500/20"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                  className="mb-4"
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-emerald-500" />}
                    suffix={
                      <div 
                        className="cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOutlined className="text-slate-400" />
                        ) : (
                          <EyeInvisibleOutlined className="text-slate-400" />
                        )}
                      </div>
                    }
                    placeholder="Enter your password"
                    className="rounded-xl !h-12 !border-slate-300 hover:!border-emerald-400 focus:!border-emerald-500 focus:!shadow-emerald-500/20"
                    iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>

                <div className="flex justify-between items-center mb-6">
                  <Checkbox className="text-slate-600">
                    <Text className="text-slate-600">Remember me</Text>
                  </Checkbox>
                  <Button 
                    type="link" 
                    className="!p-0 !text-emerald-600 hover:!text-emerald-700"
                  >
                    Forgot Password?
                  </Button>
                </div>

                <Form.Item className="mb-6">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full !h-12 rounded-xl !text-base font-medium flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{ 
                      background: 'linear-gradient(to right, #059669, #047857)',
                      borderColor: '#059669',
                    }}
                    loading={loading}
                    icon={<LoginOutlined />}
                  >
                    Sign In
                  </Button>
                </Form.Item>

                <Divider className="!my-6" plain>
                  <Text type="secondary" className="text-sm">Or continue with</Text>
                </Divider>

                <Space className="w-full flex justify-center mb-6">
                  <Button 
                    className="!border-slate-300 !text-slate-600 hover:!border-emerald-400 hover:!text-emerald-600 rounded-xl !h-11 !w-11"
                    icon={<GoogleOutlined />}
                  />
                  <Button 
                    className="!border-slate-300 !text-slate-600 hover:!border-emerald-400 hover:!text-emerald-600 rounded-xl !h-11 !w-11"
                    icon={<GithubOutlined />}
                  />
                </Space>

                <div className="text-center px-2">
                  <Text type="secondary" className="text-sm">
                    By signing in, you agree to our{' '}
                    <Button 
                      type="link" 
                      className="!p-0 !text-emerald-600 hover:!text-emerald-700"
                    >
                      Terms of Service
                    </Button>
                    {' '}and{' '}
                    <Button 
                      type="link" 
                      className="!p-0 !text-emerald-600 hover:!text-emerald-700"
                    >
                      Privacy Policy
                    </Button>
                  </Text>
                </div>
              </Form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}