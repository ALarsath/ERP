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
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

export default function PersonalInfo() {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Mock data - replace with actual data from your backend
  const studentInfo = {
    basicInfo: {
      name: 'John Doe',
      admissionNo: 'ADM2023001',
      class: 'X-A',
      rollNo: '23',
      gender: 'Male',
      dateOfBirth: '2008-05-15',
      bloodGroup: 'O+',
      examRegNo: 'ERN2023001',
      emisNo: 'EMIS20230001',
      aadhaarNo: 'XXXX-XXXX-1234',
    },
    contactInfo: {
      houseName: '123 Green Valley',
      streetAddress: 'Main Street',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pinCode: '600001',
      phone: '+91 98765 43210',
      email: 'john.doe@example.com',
    },
    parentsInfo: {
      fatherName: 'James Doe',
      fatherOccupation: 'Business',
      fatherContact: '+91 98765 43211',
      motherName: 'Jane Doe',
      motherOccupation: 'Teacher',
      motherContact: '+91 98765 43212',
    },
    extracurricular: {
      sportsActivities: ['Cricket', 'Basketball'],
      clubs: ['Science Club', 'Literary Club'],
      achievements: ['District Level Science Fair Winner 2024', 'School Sports Captain'],
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
      achievements: studentInfo.extracurricular.achievements.join('\\n'),
    });
    setIsEditModalVisible(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Title level={4} style={{ color: '#245501', margin: 0 }}>Personal Information</Title>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={handleEdit}
          style={{ backgroundColor: '#538D22' }}
        >
          Edit Information
        </Button>
      </div>

      <Card className="shadow-sm">
        <Descriptions
          title="Basic Information"
          bordered
          column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label="Name">{studentInfo.basicInfo.name}</Descriptions.Item>
          <Descriptions.Item label="Admission No">{studentInfo.basicInfo.admissionNo}</Descriptions.Item>
          <Descriptions.Item label="Class">{studentInfo.basicInfo.class}</Descriptions.Item>
          <Descriptions.Item label="Roll No">{studentInfo.basicInfo.rollNo}</Descriptions.Item>
          <Descriptions.Item label="Gender">{studentInfo.basicInfo.gender}</Descriptions.Item>
          <Descriptions.Item label="Date of Birth">{studentInfo.basicInfo.dateOfBirth}</Descriptions.Item>
          <Descriptions.Item label="Blood Group">{studentInfo.basicInfo.bloodGroup}</Descriptions.Item>
          <Descriptions.Item label="Exam Reg No">{studentInfo.basicInfo.examRegNo}</Descriptions.Item>
          <Descriptions.Item label="EMIS No">{studentInfo.basicInfo.emisNo}</Descriptions.Item>
          <Descriptions.Item label="Aadhaar No">{studentInfo.basicInfo.aadhaarNo}</Descriptions.Item>
        </Descriptions>

        <Divider />

        <Descriptions
          title="Contact Information"
          bordered
          column={{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label="House Name">{studentInfo.contactInfo.houseName}</Descriptions.Item>
          <Descriptions.Item label="Street Address">{studentInfo.contactInfo.streetAddress}</Descriptions.Item>
          <Descriptions.Item label="City">{studentInfo.contactInfo.city}</Descriptions.Item>
          <Descriptions.Item label="State">{studentInfo.contactInfo.state}</Descriptions.Item>
          <Descriptions.Item label="Pin Code">{studentInfo.contactInfo.pinCode}</Descriptions.Item>
          <Descriptions.Item label="Phone">{studentInfo.contactInfo.phone}</Descriptions.Item>
          <Descriptions.Item label="Email">{studentInfo.contactInfo.email}</Descriptions.Item>
        </Descriptions>

        <Divider />

        <Descriptions
          title="Parents Information"
          bordered
          column={{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label="Father's Name">{studentInfo.parentsInfo.fatherName}</Descriptions.Item>
          <Descriptions.Item label="Occupation">{studentInfo.parentsInfo.fatherOccupation}</Descriptions.Item>
          <Descriptions.Item label="Contact">{studentInfo.parentsInfo.fatherContact}</Descriptions.Item>
          <Descriptions.Item label="Mother's Name">{studentInfo.parentsInfo.motherName}</Descriptions.Item>
          <Descriptions.Item label="Occupation">{studentInfo.parentsInfo.motherOccupation}</Descriptions.Item>
          <Descriptions.Item label="Contact">{studentInfo.parentsInfo.motherContact}</Descriptions.Item>
        </Descriptions>

        <Divider />

        <Descriptions
          title="Extracurricular Activities"
          bordered
          column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label="Sports & Activities">
            {studentInfo.extracurricular.sportsActivities.join(', ')}
          </Descriptions.Item>
          <Descriptions.Item label="Clubs & Organizations">
            {studentInfo.extracurricular.clubs.join(', ')}
          </Descriptions.Item>
          <Descriptions.Item label="Achievements" span={2}>
            <ul className="list-disc pl-4">
              {studentInfo.extracurricular.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Modal
        title="Edit Personal Information"
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
            style={{ backgroundColor: '#538D22' }}
          >
            Save Changes
          </Button>,
        ]}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            console.log('Form values:', values);
            setIsEditModalVisible(false);
          }}
        >
          <Typography.Title level={5} style={{ color: '#245501' }}>Basic Information</Typography.Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="admissionNo" label="Admission No" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="class" label="Class" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="rollNo" label="Roll No" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
              <Select>
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item name="dateOfBirth" label="Date of Birth" rules={[{ required: true }]}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="bloodGroup" label="Blood Group" rules={[{ required: true }]}>
              <Select>
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
            <Form.Item name="examRegNo" label="Exam Reg No">
              <Input />
            </Form.Item>
            <Form.Item name="emisNo" label="EMIS No">
              <Input />
            </Form.Item>
            <Form.Item name="aadhaarNo" label="Aadhaar No">
              <Input />
            </Form.Item>
          </div>

          <Divider />

          <Typography.Title level={5} style={{ color: '#245501' }}>Contact Information</Typography.Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item name="houseName" label="House Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="streetAddress" label="Street Address" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="city" label="City" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="state" label="State" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="pinCode" label="Pin Code" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: 'email' }]}
              className="col-span-2"
            >
              <Input />
            </Form.Item>
          </div>

          <Divider />

          <Typography.Title level={5} style={{ color: '#245501' }}>Parents Information</Typography.Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item name="fatherName" label="Father's Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="fatherOccupation" label="Father's Occupation">
              <Input />
            </Form.Item>
            <Form.Item name="fatherContact" label="Father's Contact" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="motherName" label="Mother's Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="motherOccupation" label="Mother's Occupation">
              <Input />
            </Form.Item>
            <Form.Item name="motherContact" label="Mother's Contact" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </div>

          <Divider />

          <Typography.Title level={5} style={{ color: '#245501' }}>Extracurricular Activities</Typography.Title>
          <div className="grid grid-cols-1 gap-4">
            <Form.Item name="extracurricularActivities" label="Sports & Activities">
              <Input.TextArea placeholder="Enter activities separated by commas" />
            </Form.Item>
            <Form.Item name="clubs" label="Clubs & Organizations">
              <Input.TextArea placeholder="Enter clubs separated by commas" />
            </Form.Item>
            <Form.Item name="achievements" label="Achievements">
              <Input.TextArea placeholder="Enter achievements (one per line)" rows={4} />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
