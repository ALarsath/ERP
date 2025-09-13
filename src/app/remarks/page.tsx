'use client';
import { useState } from 'react';
import {
  Card,
  Typography,
  Table,
  Tag,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Timeline,
  Radio,
  Tabs,
  Badge,
  Empty,
  Avatar,
} from 'antd';
import PageLayout from '@/components/layout/PageLayout';
import {
  MessageOutlined,
  UserOutlined,
  FileTextOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CommentOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface Complaint {
  key: string;
  subject: string;
  description: string;
  date: string;
  status: 'pending' | 'in-review' | 'resolved' | 'rejected';
  type: 'academic' | 'administrative' | 'facility' | 'other';
  priority: 'high' | 'medium' | 'low';
  submittedBy: {
    name: string;
    role: 'parent' | 'teacher' | 'student';
  };
  responses: Array<{
    date: string;
    message: string;
    from: string;
    role: string;
  }>;
}

export default function Remarks() {
  const [isComplaintModalVisible, setIsComplaintModalVisible] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isNewComplaintModalVisible, setIsNewComplaintModalVisible] = useState(false);
  const [complaintForm] = Form.useForm();

  // Mock data for complaints
  const complaints: Complaint[] = [
    {
      key: '1',
      subject: 'Classroom Ventilation Issue',
      description: 'The air conditioning in Room 301 is not functioning properly.',
      date: '2025-09-10',
      status: 'in-review',
      type: 'facility',
      priority: 'high',
      submittedBy: {
        name: 'John Smith',
        role: 'teacher',
      },
      responses: [
        {
          date: '2025-09-11',
          message: 'Maintenance team has been notified. Will inspect tomorrow.',
          from: 'Admin Staff',
          role: 'administrator',
        },
      ],
    },
    {
      key: '2',
      subject: 'Homework Overload Concern',
      description: 'Students are receiving too much homework from multiple subjects simultaneously.',
      date: '2025-09-08',
      status: 'pending',
      type: 'academic',
      priority: 'medium',
      submittedBy: {
        name: 'Mary Johnson',
        role: 'parent',
      },
      responses: [],
    },
    {
      key: '3',
      subject: 'Library Access Hours',
      description: 'Request to extend library hours during exam preparation week',
      date: '2025-09-05',
      status: 'resolved',
      type: 'administrative',
      priority: 'low',
      submittedBy: {
        name: 'David Wilson',
        role: 'teacher',
      },
      responses: [
        {
          date: '2025-09-06',
          message: 'Library hours will be extended by 2 hours during exam weeks.',
          from: 'Library Head',
          role: 'administrator',
        },
        {
          date: '2025-09-07',
          message: 'Thank you for addressing this concern.',
          from: 'David Wilson',
          role: 'teacher',
        },
      ],
    },
  ];

  const complaintColumns = [
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (text: string) => <strong style={{ color: '#245501' }}>{text}</strong>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color="#73A942">{type.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => {
        const colors = {
          high: '#ff4d4f',
          medium: '#faad14',
          low: '#538D22',
        };
        return <Tag color={colors[priority as keyof typeof colors]}>{priority.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          pending: '#faad14',
          'in-review': '#1890ff',
          resolved: '#538D22',
          rejected: '#ff4d4f',
        };
        return <Tag color={colors[status as keyof typeof colors]}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Submitted By',
      dataIndex: 'submittedBy',
      key: 'submittedBy',
      render: (submittedBy: { name: string; role: string }) => (
        <Space>
          <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#538D22' }} />
          <span>{submittedBy.name}</span>
          <Tag color="#73A942">{submittedBy.role}</Tag>
        </Space>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Complaint) => (
        <Button
          type="primary"
          onClick={() => {
            setSelectedComplaint(record);
            setIsComplaintModalVisible(true);
          }}
          style={{ 
            backgroundColor: '#538D22',
            borderColor: '#538D22',
          }}
        >
          View Details
        </Button>
      ),
    },
  ];

  const handleNewComplaint = (values: any) => {
    console.log('New complaint:', values);
    setIsNewComplaintModalVisible(false);
    complaintForm.resetFields();
  };

  const handleNewResponse = (values: any) => {
    console.log('New response:', values);
  };

  return (
        <PageLayout title="Remarks & Complaints">
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Title level={4} style={{ color: '#245501', margin: 0 }}>Remarks & Complaints</Title>
        <Button
          type="primary"
          icon={<MessageOutlined />}
          onClick={() => setIsNewComplaintModalVisible(true)}
          style={{ 
            backgroundColor: '#538D22',
            borderColor: '#538D22',
          }}
        >
          Submit New Complaint
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={6}>
          <Card variant="borderless">
            <Paragraph className="text-center mb-2">Pending</Paragraph>
            <Title level={2} className="text-center m-0" style={{ color: '#faad14' }}>
              {complaints.filter(c => c.status === 'pending').length}
            </Title>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card variant="borderless">
            <Paragraph className="text-center mb-2">In Review</Paragraph>
            <Title level={2} className="text-center m-0" style={{ color: '#1890ff' }}>
              {complaints.filter(c => c.status === 'in-review').length}
            </Title>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card variant="borderless">
            <Paragraph className="text-center mb-2">Resolved</Paragraph>
            <Title level={2} className="text-center m-0" style={{ color: '#538D22' }}>
              {complaints.filter(c => c.status === 'resolved').length}
            </Title>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card variant="borderless">
            <Paragraph className="text-center mb-2">Rejected</Paragraph>
            <Title level={2} className="text-center m-0" style={{ color: '#ff4d4f' }}>
              {complaints.filter(c => c.status === 'rejected').length}
            </Title>
          </Card>
        </Col>
      </Row>

      <Tabs
        defaultActiveKey="all"
        type="card"
        items={[
          {
            key: 'all',
            label: (
              <span>
                <MessageOutlined />
                All Complaints
              </span>
            ),
            children: (
              <Card className="shadow-sm">
                <Table
                  columns={complaintColumns}
                  dataSource={complaints}
                  pagination={false}
                  className="w-full"
                  rowKey="key"
                />
              </Card>
            )
          },
          {
            key: 'my',
            label: (
              <span>
                <UserOutlined />
                My Complaints
              </span>
            ),
            children: (
              <Card className="shadow-sm">
                <Table
                  columns={complaintColumns}
                  dataSource={complaints.filter(c => c.submittedBy.name === 'John Smith')}
                  pagination={false}
                  className="w-full"
                  rowKey="key"
                />
              </Card>
            )
          }
        ]}
      />

      {/* New Complaint Modal */}
      <Modal
        title="Submit New Complaint"
        open={isNewComplaintModalVisible}
        onCancel={() => setIsNewComplaintModalVisible(false)}
        footer={null}
      >
        <Form
          form={complaintForm}
          layout="vertical"
          onFinish={handleNewComplaint}
        >
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: 'Please enter the subject' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: 'Please select the type' }]}
          >
            <Select>
              <Option value="academic">Academic</Option>
              <Option value="administrative">Administrative</Option>
              <Option value="facility">Facility</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: 'Please select the priority' }]}
          >
            <Radio.Group>
              <Radio.Button value="low">Low</Radio.Button>
              <Radio.Button value="medium">Medium</Radio.Button>
              <Radio.Button value="high">High</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item className="mb-0">
            <Space className="w-full justify-end">
              <Button onClick={() => setIsNewComplaintModalVisible(false)}>
                Cancel
              </Button>
              <Button 
                type="primary" 
                htmlType="submit"
                style={{ 
                  backgroundColor: '#538D22',
                  borderColor: '#538D22',
                }}
              >
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Complaint Details Modal */}
      <Modal
        title={
          <Space>
            <Text strong>Complaint Details</Text>
            {selectedComplaint && (
              <Tag color={
                selectedComplaint.status === 'resolved' ? '#538D22' :
                selectedComplaint.status === 'in-review' ? '#1890ff' :
                selectedComplaint.status === 'rejected' ? '#ff4d4f' : '#faad14'
              }>
                {selectedComplaint.status.toUpperCase()}
              </Tag>
            )}
          </Space>
        }
        open={isComplaintModalVisible}
        onCancel={() => setIsComplaintModalVisible(false)}
        footer={null}
        width={700}
      >
        {selectedComplaint && (
          <div className="space-y-6">
            <Card variant="borderless" className="bg-gray-50">
              <Space direction="vertical" className="w-full">
                <div>
                  <Text type="secondary">Subject:</Text>
                  <Paragraph strong>{selectedComplaint.subject}</Paragraph>
                </div>
                <div>
                  <Text type="secondary">Description:</Text>
                  <Paragraph>{selectedComplaint.description}</Paragraph>
                </div>
                <Space>
                  <Tag color="#73A942">{selectedComplaint.type.toUpperCase()}</Tag>
                  <Tag color={
                    selectedComplaint.priority === 'high' ? '#ff4d4f' :
                    selectedComplaint.priority === 'medium' ? '#faad14' : '#538D22'
                  }>
                    {selectedComplaint.priority.toUpperCase()}
                  </Tag>
                </Space>
              </Space>
            </Card>

            <Card title="Responses" variant="borderless" className="bg-gray-50">
              {selectedComplaint.responses.length > 0 ? (
                <Timeline>
                  {selectedComplaint.responses.map((response, index) => (
                    <Timeline.Item 
                      key={index}
                      color="#538D22"
                    >
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <Space className="mb-2">
                          <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#538D22' }} />
                          <Text strong>{response.from}</Text>
                          <Tag color="#73A942">{response.role}</Tag>
                        </Space>
                        <Paragraph>{response.message}</Paragraph>
                        <Text type="secondary">{response.date}</Text>
                      </div>
                    </Timeline.Item>
                  ))}
                </Timeline>
              ) : (
                <Empty description="No responses yet" />
              )}

              <Form onFinish={handleNewResponse} className="mt-4">
                <Form.Item
                  name="response"
                  rules={[{ required: true, message: 'Please enter your response' }]}
                >
                  <TextArea rows={3} placeholder="Write your response..." />
                </Form.Item>
                <Form.Item className="mb-0">
                  <Button 
                    type="primary" 
                    htmlType="submit"
                    style={{ 
                      backgroundColor: '#538D22',
                      borderColor: '#538D22',
                    }}
                  >
                    Send Response
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        )}
      </Modal>
    </div>
    </PageLayout>
  );
}