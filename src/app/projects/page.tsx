'use client';
import { useState } from 'react';
import {
  Card,
  Typography,
  Table,
  Tag,
  Space,
  Tabs,
  Progress,
  Row,
  Col,
  Button,
  Modal,
  Timeline,
  Input,
  Form,
  Upload,
  message,
  Statistic,
  Avatar,
  Badge,
} from 'antd';
import {
  ProjectOutlined,
  TeamOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  UploadOutlined,
  LinkOutlined,
  BookOutlined,
  UserOutlined,
  FireOutlined,
  ThunderboltOutlined,
  EyeOutlined,
  DownloadOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

interface Project {
  key: string;
  title: string;
  subject: string;
  deadline: string;
  status: 'in-progress' | 'completed' | 'pending';
  team: string[];
  progress: number;
  description: string;
  attachments: number;
}

interface Milestone {
  date: string;
  title: string;
  description: string;
  status: 'done' | 'pending' | 'in-progress';
}

export default function Projects() {
  const [isProjectModalVisible, setIsProjectModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      key: '1',
      title: 'Solar System Model',
      subject: 'Physics',
      deadline: '2025-10-15',
      status: 'in-progress',
      team: ['', 'Jane Smith', 'Alex Johnson'],
      progress: 65,
      description: 'Create a working model of the solar system showing planetary movements',
      attachments: 3,
    },
    {
      key: '2',
      title: 'Water Quality Analysis',
      subject: 'Chemistry',
      deadline: '2025-09-30',
      status: 'pending',
      team: ['Mike Brown', 'Sarah Wilson'],
      progress: 25,
      description: 'Analyze water samples from different sources and prepare detailed report',
      attachments: 1,
    },
    {
      key: '3',
      title: 'Ecosystem Study',
      subject: 'Biology',
      deadline: '2025-09-20',
      status: 'completed',
      team: ['Emily Davis', 'Chris Martin'],
      progress: 100,
      description: 'Study local ecosystem and document findings with photographs',
      attachments: 5,
    },
  ];

  const milestones: { [key: string]: Milestone[] } = {
    '1': [
      {
        date: '2025-09-01',
        title: 'Project Initiated',
        description: 'Team formed and initial planning completed',
        status: 'done',
      },
      {
        date: '2025-09-15',
        title: 'Design Phase',
        description: 'Model design and material selection',
        status: 'in-progress',
      },
      {
        date: '2025-10-01',
        title: 'Construction',
        description: 'Building the physical model',
        status: 'pending',
      },
      {
        date: '2025-10-15',
        title: 'Final Presentation',
        description: 'Present the working model',
        status: 'pending',
      },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'processing';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const projectColumns = [
    {
      title: 'Project Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Project) => (
        <div className="flex items-center gap-3">
          <Avatar size={40} icon={<BookOutlined />} className="bg-blue-500" />
          <div>
            <Text strong className="text-slate-900 block">{text}</Text>
            <Text className="text-xs text-slate-500">{record.subject}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Team',
      dataIndex: 'team',
      key: 'team',
      render: (team: string[]) => (
        <Space size="small">
          {team.map((member, index) => (
            <Avatar key={index} size="small" icon={<UserOutlined />} />
          ))}
          <Text className="text-xs text-slate-500">+{team.length} members</Text>
        </Space>
      ),
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (deadline: string) => (
        <div className="flex items-center gap-1">
          <ClockCircleOutlined className="text-blue-500" />
          <Text>{dayjs(deadline).format('MMM DD, YYYY')}</Text>
        </div>
      ),
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => (
        <div>
          <div className="flex justify-between mb-1">
            <Text className="text-xs text-slate-600">Progress</Text>
            <Text className="text-xs font-medium">{progress}%</Text>
          </div>
          <Progress
            percent={progress}
            size="small"
            strokeColor={progress >= 90 ? '#10b981' : progress >= 70 ? '#f59e0b' : '#ef4444'}
            className="modern-progress"
          />
        </div>
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
      title: 'Action',
      key: 'action',
      render: (_: any, record: Project) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EyeOutlined />} 
            onClick={() => {
              setSelectedProject(record);
              setIsProjectModalVisible(true);
            }}
            className="bg-gradient-to-r from-green-500 to-blue-500 border-0"
          >
            View
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <Title level={1} className="!text-white !mb-2 !text-2xl sm:!text-3xl">
                Projects 📋
              </Title>
              <Paragraph className="!text-green-100 !mb-0 text-sm sm:text-base">
                Manage and track your academic projects
              </Paragraph>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{projects.length}</div>
                <div className="text-xs text-green-200">Total Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {projects.filter(p => p.status === 'in-progress').length}
                </div>
                <div className="text-xs text-green-200">In Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <Card className="stat-card modern-card text-center">
              <Statistic
                title="Active Projects"
                value={projects.filter(p => p.status === 'in-progress').length}
                prefix={<ProjectOutlined className="text-blue-500" />}
                valueStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="stat-card modern-card text-center">
              <Statistic
                title="Completed"
                value={projects.filter(p => p.status === 'completed').length}
                prefix={<CheckCircleOutlined className="text-green-500" />}
                valueStyle={{ color: '#10b981', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="stat-card modern-card text-center">
              <Statistic
                title="Pending"
                value={projects.filter(p => p.status === 'pending').length}
                prefix={<ClockCircleOutlined className="text-yellow-500" />}
                valueStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="stat-card modern-card text-center">
              <Statistic
                title="Avg. Progress"
                value={Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)}
                suffix="%"
                prefix={<ThunderboltOutlined className="text-purple-500" />}
                valueStyle={{ color: '#8b5cf6', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Projects Table */}
        <Tabs
          defaultActiveKey="all"
          type="card"
          size="large"
          items={[
            {
              key: 'all',
              label: (
                <div className="flex items-center gap-2">
                  <ProjectOutlined />
                  <span>All Projects</span>
                  <Badge count={projects.length} color="blue" />
                </div>
              ),
              children: (
                <Card className="modern-card">
                  <div className="overflow-x-auto">
                    <Table
                      columns={projectColumns}
                      dataSource={projects}
                      pagination={false}
                      className="modern-table"
                      rowKey="key"
                    />
                  </div>
                </Card>
              )
            },
            {
              key: 'my-projects',
              label: (
                <div className="flex items-center gap-2">
                  <TeamOutlined />
                  <span>My Projects</span>
                  <Badge 
                    count={projects.filter(p => p.team.includes('Prassana Natarajan')).length} 
                    color="green" 
                  />
                </div>
              ),
              children: (
                <Card className="modern-card">
                  <div className="overflow-x-auto">
                    <Table
                      columns={projectColumns}
                      dataSource={projects.filter(p => p.team.includes('Prassana Natarajan'))}
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

        {/* Project Details Modal */}
        <Modal
          title={
            <div className="flex items-center gap-2">
              <BookOutlined className="text-blue-500" />
              <span>{selectedProject?.title}</span>
            </div>
          }
          open={isProjectModalVisible}
          onCancel={() => setIsProjectModalVisible(false)}
          footer={null}
          width={800}
          className="modern-modal"
        >
          {selectedProject && (
            <div className="space-y-6">
              <Row gutter={[16, 16]}>
                <Col span={16}>
                  <Card className="modern-card">
                    <div className="mb-4">
                      <Text type="secondary">Description</Text>
                      <Paragraph className="mt-1">{selectedProject.description}</Paragraph>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Tag color="blue">{selectedProject.subject}</Tag>
                      <Tag color="green">Due: {dayjs(selectedProject.deadline).format('MMM DD, YYYY')}</Tag>
                      <Tag color={getStatusColor(selectedProject.status)} className="capitalize">
                        {selectedProject.status.replace('-', ' ')}
                      </Tag>
                    </div>
                    
                    <div className="mt-4">
                      <Text type="secondary">Team Members</Text>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedProject.team.map((member, index) => (
                          <div key={index} className="flex items-center gap-2 bg-slate-100 rounded-full px-3 py-1">
                            <Avatar size="small" icon={<UserOutlined />} />
                            <Text>{member}</Text>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card className="modern-card">
                    <div className="text-center">
                      <Progress
                        type="circle"
                        percent={selectedProject.progress}
                        strokeColor={selectedProject.progress >= 90 ? '#10b981' : 
                                     selectedProject.progress >= 70 ? '#f59e0b' : '#ef4444'}
                        format={() => (
                          <div className="text-center">
                            <div className="text-lg font-bold text-slate-900">{selectedProject.progress}%</div>
                            <div className="text-xs text-slate-500">Complete</div>
                          </div>
                        )}
                      />
                      <div className="mt-4">
                        <Text strong>Attachments</Text>
                        <div className="mt-2">
                          <Tag icon={<FileTextOutlined />} color="blue">
                            {selectedProject.attachments} files
                          </Tag>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>

              <Card 
                title={
                  <div className="flex items-center gap-2">
                    <ClockCircleOutlined className="text-green-500" />
                    <span>Project Timeline</span>
                  </div>
                } 
                className="modern-card"
              >
                <Timeline
                  className="modern-timeline"
                  items={milestones[selectedProject.key]?.map(milestone => ({
                    color: milestone.status === 'done' ? 'green' : 
                           milestone.status === 'in-progress' ? 'blue' : 'gray',
                    dot: milestone.status === 'done' ? <CheckCircleOutlined /> : 
                         milestone.status === 'in-progress' ? <FireOutlined /> : null,
                    children: (
                      <div className="pb-3">
                        <div className="flex items-start justify-between mb-1">
                          <Text strong className="text-slate-900">{milestone.title}</Text>
                          <Tag 
                            color={milestone.status === 'done' ? 'success' : 
                                   milestone.status === 'in-progress' ? 'processing' : 'default'}
                            className="ml-2 capitalize"
                          >
                            {milestone.status.replace('-', ' ')}
                          </Tag>
                        </div>
                        <Text className="text-xs text-slate-600">{milestone.description}</Text>
                        <div className="mt-1">
                          <Text className="text-xs text-slate-500">
                            <ClockCircleOutlined className="mr-1" />
                            {dayjs(milestone.date).format('MMM DD, YYYY')}
                          </Text>
                        </div>
                      </div>
                    ),
                  }))}
                />
              </Card>

              <Card 
                title={
                  <div className="flex items-center gap-2">
                    <FileTextOutlined className="text-blue-500" />
                    <span>Project Resources</span>
                  </div>
                } 
                className="modern-card"
              >
                <Upload
                  action="/api/upload"
                  listType="text"
                  defaultFileList={[
                    { uid: '1', name: 'project-plan.pdf', status: 'done' },
                    { uid: '2', name: 'research-notes.docx', status: 'done' },
                  ]}
                  className="modern-upload"
                >
                  <Button icon={<UploadOutlined />}>Upload File</Button>
                </Upload>
              </Card>
            </div>
          )}
        </Modal>
      </div>
    </MainLayout>
  );
}