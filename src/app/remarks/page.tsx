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
  Statistic,
  message,
} from 'antd';
import MainLayout from '@/components/layout/MainLayout';
import {
  MessageOutlined,
  UserOutlined,
  FileTextOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CommentOutlined,
  BookOutlined,
  FireOutlined,
  ThunderboltOutlined,
  EyeOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

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
        name: 'Prassana NatarajanSmith',
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'success';
      case 'in-review': return 'processing';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'academic': return 'blue';
      case 'administrative': return 'purple';
      case 'facility': return 'green';
      case 'other': return 'orange';
      default: return 'default';
    }
  };

  const complaintColumns = [
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (text: string, record: Complaint) => (
        <div className="flex items-center gap-3">
          <Avatar size={40} icon={<MessageOutlined />} className="bg-blue-500" />
          <div>
            <Text strong className="text-slate-900 block">{text}</Text>
            <Text className="text-xs text-slate-500">
              Submitted by {record.submittedBy.name}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={getTypeColor(type)} className="capitalize">
          {type}
        </Tag>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => (
        <Tag color={getPriorityColor(priority)} className="capitalize">
          {priority}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)} className="capitalize">
          {status.replace('-', ' ')}
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => (
        <div className="flex items-center gap-1">
          <ClockCircleOutlined className="text-blue-500" />
          <Text>{dayjs(date).format('MMM DD, YYYY')}</Text>
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Complaint) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EyeOutlined />} 
            onClick={() => {
              setSelectedComplaint(record);
              setIsComplaintModalVisible(true);
            }}
            className="bg-gradient-to-r from-green-500 to-blue-500 border-0"
          >
            View
          </Button>
        </Space>
      ),
    },
  ];

  const handleNewComplaint = (values: any) => {
    console.log('New complaint:', values);
    message.success('Complaint submitted successfully!');
    setIsNewComplaintModalVisible(false);
    complaintForm.resetFields();
  };

  const handleNewResponse = (values: any) => {
    console.log('New response:', values);
    message.success('Response added successfully!');
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <Title level={1} className="!text-white !mb-2 !text-2xl sm:!text-3xl">
                Remarks & Complaints 💬
              </Title>
              <Paragraph className="!text-green-100 !mb-0 text-sm sm:text-base">
                Submit and track your remarks and complaints
              </Paragraph>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{complaints.length}</div>
                <div className="text-xs text-green-200">Total Issues</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {complaints.filter(c => c.status === 'pending' || c.status === 'in-review').length}
                </div>
                <div className="text-xs text-green-200">Pending</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <Card className="stat-card modern-card text-center">
              <Statistic
                title="Pending"
                value={complaints.filter(c => c.status === 'pending').length}
                prefix={<ClockCircleOutlined className="text-yellow-500" />}
                valueStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="stat-card modern-card text-center">
              <Statistic
                title="In Review"
                value={complaints.filter(c => c.status === 'in-review').length}
                prefix={<FireOutlined className="text-blue-500" />}
                valueStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="stat-card modern-card text-center">
              <Statistic
                title="Resolved"
                value={complaints.filter(c => c.status === 'resolved').length}
                prefix={<CheckCircleOutlined className="text-green-500" />}
                valueStyle={{ color: '#10b981', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="stat-card modern-card text-center">
              <Statistic
                title="Rejected"
                value={complaints.filter(c => c.status === 'rejected').length}
                prefix={<ExclamationCircleOutlined className="text-red-500" />}
                valueStyle={{ color: '#ef4444', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Complaints Table */}
        <Tabs
          defaultActiveKey="all"
          type="card"
          size="large"
          items={[
            {
              key: 'all',
              label: (
                <div className="flex items-center gap-2">
                  <MessageOutlined />
                  <span>All Complaints</span>
                  <Badge count={complaints.length} color="blue" />
                </div>
              ),
              children: (
                <Card className="modern-card">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div>
                      <Title level={4} className="!mb-1">All Complaints</Title>
                      <Text className="text-slate-600">List of all submitted complaints</Text>
                    </div>
                    <Button
                      type="primary"
                      icon={<MessageOutlined />}
                      onClick={() => setIsNewComplaintModalVisible(true)}
                      className="bg-gradient-to-r from-green-500 to-blue-500 border-0"
                    >
                      Submit New Complaint
                    </Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <Table
                      columns={complaintColumns}
                      dataSource={complaints}
                      pagination={false}
                      className="modern-table"
                      rowKey="key"
                    />
                  </div>
                </Card>
              )
            },
            {
              key: 'my',
              label: (
                <div className="flex items-center gap-2">
                  <UserOutlined />
                  <span>My Complaints</span>
                  <Badge 
                    count={complaints.filter(c => c.submittedBy.name === 'Prassana NatarajanSmith').length} 
                    color="green" 
                  />
                </div>
              ),
              children: (
                <Card className="modern-card">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <Title level={4} className="!mb-1">My Complaints</Title>
                      <Text className="text-slate-600">List of complaints submitted by you</Text>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <Table
                      columns={complaintColumns}
                      dataSource={complaints.filter(c => c.submittedBy.name === 'Prassana NatarajanSmith')}
                      pagination={false}
                      className="modern-table"
                      rowKey="key"
                    />
                  </div>
                </Card>
              )
            }
          ]}
          className="modern-tabs"
        />

        {/* New Complaint Modal */}
        <Modal
          title={
            <div className="flex items-center gap-2">
              <MessageOutlined className="text-blue-500" />
              <span>Submit New Complaint</span>
            </div>
          }
          open={isNewComplaintModalVisible}
          onCancel={() => setIsNewComplaintModalVisible(false)}
          footer={null}
          className="modern-modal"
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
              <Input placeholder="Enter complaint subject" />
            </Form.Item>
            <Form.Item
              name="type"
              label="Type"
              rules={[{ required: true, message: 'Please select the type' }]}
            >
              <Select placeholder="Select complaint type">
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
              <TextArea rows={4} placeholder="Describe your complaint in detail" />
            </Form.Item>
            <Form.Item className="mb-0">
              <Space className="w-full justify-end">
                <Button onClick={() => setIsNewComplaintModalVisible(false)}>
                  Cancel
                </Button>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  className="bg-gradient-to-r from-green-500 to-blue-500 border-0"
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
              <div className="flex items-center gap-2">
                <MessageOutlined className="text-blue-500" />
                <span>Complaint Details</span>
              </div>
              {selectedComplaint && (
                <Tag color={getStatusColor(selectedComplaint.status)} className="capitalize">
                  {selectedComplaint.status.replace('-', ' ')}
                </Tag>
              )}
            </Space>
          }
          open={isComplaintModalVisible}
          onCancel={() => setIsComplaintModalVisible(false)}
          footer={null}
          width={700}
          className="modern-modal"
        >
          {selectedComplaint && (
            <div className="space-y-6">
              <Card className="modern-card">
                <div className="mb-4">
                  <Text type="secondary">Subject</Text>
                  <Paragraph className="mt-1 text-lg font-medium">{selectedComplaint.subject}</Paragraph>
                </div>
                
                <div className="mb-4">
                  <Text type="secondary">Description</Text>
                  <Paragraph className="mt-1">{selectedComplaint.description}</Paragraph>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Tag color={getTypeColor(selectedComplaint.type)} className="capitalize">
                    {selectedComplaint.type}
                  </Tag>
                  <Tag color={getPriorityColor(selectedComplaint.priority)} className="capitalize">
                    {selectedComplaint.priority} Priority
                  </Tag>
                  <Tag icon={<ClockCircleOutlined />} color="blue">
                    {dayjs(selectedComplaint.date).format('MMM DD, YYYY')}
                  </Tag>
                  <div className="flex items-center gap-2 bg-slate-100 rounded-full px-3 py-1">
                    <Avatar size="small" icon={<UserOutlined />} />
                    <Text>{selectedComplaint.submittedBy.name} ({selectedComplaint.submittedBy.role})</Text>
                  </div>
                </div>
              </Card>

              <Card 
                title={
                  <div className="flex items-center gap-2">
                    <CommentOutlined className="text-green-500" />
                    <span>Responses</span>
                  </div>
                } 
                className="modern-card"
              >
                {selectedComplaint.responses.length > 0 ? (
                  <Timeline
                    className="modern-timeline"
                    items={selectedComplaint.responses.map((response, index) => ({
                      color: 'blue',
                      dot: <CheckCircleOutlined className="text-blue-500" />,
                      children: (
                        <div className="pb-3">
                          <div className="flex items-start justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <Avatar size="small" icon={<UserOutlined />} />
                              <Text strong className="text-slate-900">{response.from}</Text>
                              <Tag color="blue">{response.role}</Tag>
                            </div>
                          </div>
                          <Paragraph className="mb-1">{response.message}</Paragraph>
                          <Text className="text-xs text-slate-500">
                            <ClockCircleOutlined className="mr-1" />
                            {dayjs(response.date).format('MMM DD, YYYY')}
                          </Text>
                        </div>
                      ),
                    }))}
                  />
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
                      className="bg-gradient-to-r from-green-500 to-blue-500 border-0"
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
    </MainLayout>
  );
}