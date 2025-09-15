'use client';
import { useState } from 'react';
import {
  Card,
  Typography,
  Descriptions,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Divider,
  Avatar,
  Tag,
  Row,
  Col,
  Space,
  Tooltip,
} from 'antd';
import MainLayout from '@/components/layout/MainLayout';
import { 
  EditOutlined, 
  UserOutlined, 
  PhoneOutlined, 
  MailOutlined, 
  HomeOutlined,
  TrophyOutlined,
  TeamOutlined,
  HeartOutlined,
  StarOutlined,
  IdcardOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

interface PersonalInfoFormValues {
  fullName: string;
  dateOfBirth: dayjs.Dayjs;
  gender: string;
  email: string;
  phone: string;
  address: string;
  parentName: string;
  parentContact: string;
  extracurricularActivities: string;
  clubs: string;
  achievements: string;
  hobbies: string;
  [key: string]: any; // For any additional fields
}

export default function PersonalInfo() {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Mock data - replace with actual data from your backend
  const studentInfo = {
    basicInfo: {
      name: 'Prassana Natarajan R',
      admissionNo: 'ADM2023001',
      class: 'X-A',
      rollNo: '23',
      gender: 'Male',
      dateOfBirth: '2008-05-15',
      bloodGroup: 'O+',
      examRegNo: 'ERN2023001',
      emisNo: 'EMIS20230001',
      aadhaarNo: 'XXXX-XXXX-1234',
      profileImage: null,
    },
    contactInfo: {
      houseName: '123 Green Valley Apartments',
      streetAddress: 'Main Street, Anna Nagar',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pinCode: '600001',
      phone: '+91 98765 43210',
      email: 'john.doe@example.com',
    },
    parentsInfo: {
      fatherName: 'James Doe',
      fatherOccupation: 'Software Engineer',
      fatherContact: '+91 98765 43211',
      fatherEmail: 'james.doe@example.com',
      motherName: 'Jane Doe',
      motherOccupation: 'School Principal',
      motherContact: '+91 98765 43212',
      motherEmail: 'jane.doe@example.com',
    },
    extracurricular: {
      sportsActivities: ['Cricket', 'Basketball', 'Swimming'],
      clubs: ['Science Club', 'Literary Club', 'Debate Society'],
      achievements: [
        'District Level Science Fair Winner 2024',
        'School Sports Captain 2023-24',
        'Inter-school Debate Competition - 1st Place',
        'Mathematics Olympiad - State Level Qualifier'
      ],
      hobbies: ['Reading', 'Photography', 'Coding', 'Music'],
    },
    academic: {
      currentGPA: '9.2',
      previousGPA: '8.8',
      rank: 5,
      totalStudents: 60,
      favoriteSubjects: ['Mathematics', 'Physics', 'Computer Science'],
    },
  };

  const handleEdit = () => {
    form.setFieldsValue({
      ...studentInfo.basicInfo,
      ...studentInfo.contactInfo,
      ...studentInfo.parentsInfo,
      dateOfBirth: dayjs(studentInfo.basicInfo.dateOfBirth),
      extracurricularActivities: studentInfo.extracurricular.sportsActivities.join(', '),
      clubs: studentInfo.extracurricular.clubs.join(', '),
      achievements: studentInfo.extracurricular.achievements.join('\n'),
      hobbies: studentInfo.extracurricular.hobbies.join(', '),
    });
    setIsEditModalVisible(true);
  };

  const handleFormSubmit = (values: PersonalInfoFormValues) => {
    console.log('Form values:', values);
    // Here you would typically send the data to your backend
    setIsEditModalVisible(false);
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Avatar 
              size={120} 
              icon={<UserOutlined />} 
              className="bg-white/20 backdrop-blur-sm border-4 border-white/30"
            />
            <div className="flex-1">
              <Title level={1} className="!text-white !mb-2">
                {studentInfo.basicInfo.name}
              </Title>
              <div className="flex flex-wrap gap-3 mb-4">
                <Tag color="blue" className="px-3 py-1">
                  <IdcardOutlined className="mr-1" />
                  {studentInfo.basicInfo.admissionNo}
                </Tag>
                <Tag color="green" className="px-3 py-1">
                  Class {studentInfo.basicInfo.class}
                </Tag>
                <Tag color="purple" className="px-3 py-1">
                  Roll No. {studentInfo.basicInfo.rollNo}
                </Tag>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-blue-100">
                <span className="flex items-center gap-1">
                  <TrophyOutlined />
                  Rank {studentInfo.academic.rank}/{studentInfo.academic.totalStudents}
                </span>
                <span className="flex items-center gap-1">
                  <StarOutlined />
                  GPA {studentInfo.academic.currentGPA}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarOutlined />
                  Born {studentInfo.basicInfo.dateOfBirth}
                </span>
              </div>
            </div>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={handleEdit}
              size="large"
              className="bg-white/20 border-white/30 hover:bg-white/30 backdrop-blur-sm"
            >
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <Card className="modern-card text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{studentInfo.academic.currentGPA}</div>
              <Text className="text-slate-600">Current GPA</Text>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="modern-card text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{studentInfo.academic.rank}</div>
              <Text className="text-slate-600">Class Rank</Text>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="modern-card text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{studentInfo.extracurricular.achievements.length}</div>
              <Text className="text-slate-600">Achievements</Text>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="modern-card text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">{studentInfo.extracurricular.clubs.length}</div>
              <Text className="text-slate-600">Active Clubs</Text>
            </Card>
          </Col>
        </Row>

        {/* Main Information Cards */}
        <Row gutter={[16, 16]}>
          {/* Basic Information */}
          <Col xs={24} lg={12}>
            <Card 
              title={
                <div className="flex items-center gap-2">
                  <UserOutlined className="text-blue-500" />
                  <span>Basic Information</span>
                </div>
              }
              className="modern-card h-full"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Text className="text-slate-500 text-sm block">Full Name</Text>
                    <Text strong className="text-slate-900">{studentInfo.basicInfo.name}</Text>
                  </div>
                  <div>
                    <Text className="text-slate-500 text-sm block">Gender</Text>
                    <Text strong className="text-slate-900">{studentInfo.basicInfo.gender}</Text>
                  </div>
                  <div>
                    <Text className="text-slate-500 text-sm block">Date of Birth</Text>
                    <Text strong className="text-slate-900">{studentInfo.basicInfo.dateOfBirth}</Text>
                  </div>
                  <div>
                    <Text className="text-slate-500 text-sm block">Blood Group</Text>
                    <Tag color="red" className="font-medium">{studentInfo.basicInfo.bloodGroup}</Tag>
                  </div>
                  <div>
                    <Text className="text-slate-500 text-sm block">Exam Reg No</Text>
                    <Text strong className="text-slate-900">{studentInfo.basicInfo.examRegNo}</Text>
                  </div>
                  <div>
                    <Text className="text-slate-500 text-sm block">EMIS No</Text>
                    <Text strong className="text-slate-900">{studentInfo.basicInfo.emisNo}</Text>
                  </div>
                </div>
                <Divider className="my-4" />
                <div>
                  <Text className="text-slate-500 text-sm block mb-2">Favorite Subjects</Text>
                  <Space wrap>
                    {studentInfo.academic.favoriteSubjects.map((subject, index) => (
                      <Tag key={index} color="blue" className="px-3 py-1">
                        {subject}
                      </Tag>
                    ))}
                  </Space>
                </div>
              </div>
            </Card>
          </Col>

          {/* Contact Information */}
          <Col xs={24} lg={12}>
            <Card 
              title={
                <div className="flex items-center gap-2">
                  <EnvironmentOutlined className="text-green-500" />
                  <span>Contact Information</span>
                </div>
              }
              className="modern-card h-full"
            >
              <div className="space-y-4">
                <div>
                  <Text className="text-slate-500 text-sm block">Address</Text>
                  <Text strong className="text-slate-900 block">{studentInfo.contactInfo.houseName}</Text>
                  <Text className="text-slate-700">{studentInfo.contactInfo.streetAddress}</Text>
                  <Text className="text-slate-700">
                    {studentInfo.contactInfo.city}, {studentInfo.contactInfo.state} - {studentInfo.contactInfo.pinCode}
                  </Text>
                </div>
                <Divider className="my-4" />
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <PhoneOutlined className="text-blue-500 text-lg" />
                    <div>
                      <Text className="text-slate-500 text-sm block">Phone Number</Text>
                      <Text strong className="text-slate-900">{studentInfo.contactInfo.phone}</Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <MailOutlined className="text-green-500 text-lg" />
                    <div>
                      <Text className="text-slate-500 text-sm block">Email Address</Text>
                      <Text strong className="text-slate-900">{studentInfo.contactInfo.email}</Text>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Parents Information */}
        <Card 
          title={
            <div className="flex items-center gap-2">
              <TeamOutlined className="text-purple-500" />
              <span>Parents Information</span>
            </div>
          }
          className="modern-card"
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar size={48} icon={<UserOutlined />} className="bg-blue-500" />
                  <div>
                    <Text strong className="text-blue-900 text-lg block">{studentInfo.parentsInfo.fatherName}</Text>
                    <Text className="text-blue-700">Father</Text>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <Text className="text-blue-600 text-sm block">Occupation</Text>
                    <Text strong className="text-blue-900">{studentInfo.parentsInfo.fatherOccupation}</Text>
                  </div>
                  <div>
                    <Text className="text-blue-600 text-sm block">Contact</Text>
                    <Text strong className="text-blue-900">{studentInfo.parentsInfo.fatherContact}</Text>
                  </div>
                  <div>
                    <Text className="text-blue-600 text-sm block">Email</Text>
                    <Text strong className="text-blue-900">{studentInfo.parentsInfo.fatherEmail}</Text>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar size={48} icon={<UserOutlined />} className="bg-pink-500" />
                  <div>
                    <Text strong className="text-pink-900 text-lg block">{studentInfo.parentsInfo.motherName}</Text>
                    <Text className="text-pink-700">Mother</Text>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <Text className="text-pink-600 text-sm block">Occupation</Text>
                    <Text strong className="text-pink-900">{studentInfo.parentsInfo.motherOccupation}</Text>
                  </div>
                  <div>
                    <Text className="text-pink-600 text-sm block">Contact</Text>
                    <Text strong className="text-pink-900">{studentInfo.parentsInfo.motherContact}</Text>
                  </div>
                  <div>
                    <Text className="text-pink-600 text-sm block">Email</Text>
                    <Text strong className="text-pink-900">{studentInfo.parentsInfo.motherEmail}</Text>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Extracurricular Activities */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card 
              title={
                <div className="flex items-center gap-2">
                  <TrophyOutlined className="text-yellow-500" />
                  <span>Achievements</span>
                  <Tag color="gold">{studentInfo.extracurricular.achievements.length}</Tag>
                </div>
              }
              className="modern-card h-full"
            >
              <div className="space-y-3">
                {studentInfo.extracurricular.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <StarOutlined className="text-yellow-500 mt-1" />
                    <Text className="text-yellow-900 font-medium">{achievement}</Text>
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card 
              title={
                <div className="flex items-center gap-2">
                  <HeartOutlined className="text-red-500" />
                  <span>Activities & Interests</span>
                </div>
              }
              className="modern-card h-full"
            >
              <div className="space-y-4">
                <div>
                  <Text className="text-slate-600 text-sm block mb-2">Sports Activities</Text>
                  <Space wrap>
                    {studentInfo.extracurricular.sportsActivities.map((sport, index) => (
                      <Tag key={index} color="green" className="px-3 py-1">
                        {sport}
                      </Tag>
                    ))}
                  </Space>
                </div>
                <div>
                  <Text className="text-slate-600 text-sm block mb-2">Clubs & Organizations</Text>
                  <Space wrap>
                    {studentInfo.extracurricular.clubs.map((club, index) => (
                      <Tag key={index} color="blue" className="px-3 py-1">
                        {club}
                      </Tag>
                    ))}
                  </Space>
                </div>
                <div>
                  <Text className="text-slate-600 text-sm block mb-2">Hobbies</Text>
                  <Space wrap>
                    {studentInfo.extracurricular.hobbies.map((hobby, index) => (
                      <Tag key={index} color="purple" className="px-3 py-1">
                        {hobby}
                      </Tag>
                    ))}
                  </Space>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Edit Modal */}
        <Modal
          title={
            <div className="flex items-center gap-2">
              <EditOutlined className="text-blue-500" />
              <span>Edit Personal Information</span>
            </div>
          }
          open={isEditModalVisible}
          onCancel={() => setIsEditModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsEditModalVisible(false)}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => form.submit()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Save Changes
            </Button>,
          ]}
          width={900}
          className="modern-modal"
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFormSubmit}
            className="mt-4"
          >
            <Title level={5} className="text-slate-700 mb-4">Basic Information</Title>
            <Row gutter={[16, 0]}>
              <Col xs={24} sm={12}>
                <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                  <Select size="large">
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="dateOfBirth" label="Date of Birth" rules={[{ required: true }]}>
                  <DatePicker size="large" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="bloodGroup" label="Blood Group" rules={[{ required: true }]}>
                  <Select size="large">
                    <Option value="A+">A+</Option>
                    <Option value="A-">A-</Option>
                    <Option value="B+">B+</Option>
                    <Option value="B-">B-</Option>
                    <Option value="O+">O+</Option>
                    <Option value="O-">O-</Option>
                    <Option value="AB+">AB+</Option>
                    <Option value="AB-">AB-</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Divider />

            <Title level={5} className="text-slate-700 mb-4">Contact Information</Title>
            <Row gutter={[16, 0]}>
              <Col xs={24}>
                <Form.Item name="houseName" label="House Name/Number" rules={[{ required: true }]}>
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="streetAddress" label="Street Address" rules={[{ required: true }]}>
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item name="city" label="City" rules={[{ required: true }]}>
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item name="state" label="State" rules={[{ required: true }]}>
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item name="pinCode" label="Pin Code" rules={[{ required: true }]}>
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}>
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[{ required: true, type: 'email' }]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Divider />

            <Title level={5} className="text-slate-700 mb-4">Parents Information</Title>
            <Row gutter={[16, 0]}>
              <Col xs={24} sm={12}>
                <Form.Item name="fatherName" label="Father's Name" rules={[{ required: true }]}>
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="fatherOccupation" label="Father's Occupation">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="fatherContact" label="Father's Contact" rules={[{ required: true }]}>
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="fatherEmail" label="Father's Email" rules={[{ type: 'email' }]}>
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="motherName" label="Mother's Name" rules={[{ required: true }]}>
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="motherOccupation" label="Mother's Occupation">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="motherContact" label="Mother's Contact" rules={[{ required: true }]}>
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="motherEmail" label="Mother's Email" rules={[{ type: 'email' }]}>
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Divider />

            <Title level={5} className="text-slate-700 mb-4">Activities & Interests</Title>
            <Row gutter={[16, 0]}>
              <Col xs={24} sm={12}>
                <Form.Item name="extracurricularActivities" label="Sports & Activities">
                  <Input.TextArea 
                    size="large" 
                    placeholder="Enter activities separated by commas" 
                    rows={3}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="clubs" label="Clubs & Organizations">
                  <Input.TextArea 
                    size="large" 
                    placeholder="Enter clubs separated by commas" 
                    rows={3}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="hobbies" label="Hobbies">
                  <Input.TextArea 
                    size="large" 
                    placeholder="Enter hobbies separated by commas" 
                    rows={3}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="achievements" label="Achievements">
                  <Input.TextArea 
                    size="large" 
                    placeholder="Enter achievements (one per line)" 
                    rows={3}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    </MainLayout>
  );
}