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
} from 'antd';
import {
  ProjectOutlined,
  TeamOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  UploadOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import PageLayout from '@/components/layout/PageLayout';

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
      team: ['John Doe', 'Jane Smith', 'Alex Johnson'],
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

  const projectColumns = [
    {
      title: 'Project Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <strong style={{ color: '#245501' }}>{text}</strong>,
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
    },
    {
      title: 'Team',
      dataIndex: 'team',
      key: 'team',
      render: (team: string[]) => (
        <Space>
          {team.map((member, index) => (
            <Tag key={index} color="#73A942">{member}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => (
        <Progress
          percent={progress}
          size="small"
          strokeColor={{
            '0%': '#538D22',
            '100%': '#AAD576',
          }}
        />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          'in-progress': '#faad14',
          completed: '#538D22',
          pending: '#ff4d4f',
        };
        return <Tag color={colors[status as keyof typeof colors]}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Project) => (
        <Button
          type="primary"
          onClick={() => {
            setSelectedProject(record);
            setIsProjectModalVisible(true);
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

  return (
     <PageLayout title="Projects">
    <div className="space-y-6">
      <Title level={4} style={{ color: '#245501', margin: 0 }}>Projects</Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card variant="borderless">
            <Space direction="vertical" className="w-full">
              <Text type="secondary">Active Projects</Text>
              <Title level={2} style={{ color: '#538D22', margin: 0 }}>
                {projects.filter(p => p.status === 'in-progress').length}
              </Title>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card variant="borderless">
            <Space direction="vertical" className="w-full">
              <Text type="secondary">Completed</Text>
              <Title level={2} style={{ color: '#538D22', margin: 0 }}>
                {projects.filter(p => p.status === 'completed').length}
              </Title>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card variant="borderless">
            <Space direction="vertical" className="w-full">
              <Text type="secondary">Pending</Text>
              <Title level={2} style={{ color: '#faad14', margin: 0 }}>
                {projects.filter(p => p.status === 'pending').length}
              </Title>
            </Space>
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
                <ProjectOutlined />
                All Projects
              </span>
            ),
            children: (
              <Card className="shadow-sm">
                <Table
                  columns={projectColumns}
                  dataSource={projects}
                  pagination={false}
                  className="w-full"
                  rowKey="key"
                />
              </Card>
            )
          },
          {
            key: 'my-projects',
            label: (
              <span>
                <TeamOutlined />
                My Projects
              </span>
            ),
            children: (
              <Card className="shadow-sm">
                <Table
                  columns={projectColumns}
                  dataSource={projects.filter(p => p.team.includes('John Doe'))}
                  pagination={false}
                  className="w-full"
                  rowKey="key"
                />
              </Card>
            )
          }
        ]}
      />

      <Modal
        title={<Text strong>{selectedProject?.title}</Text>}
        open={isProjectModalVisible}
        onCancel={() => setIsProjectModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedProject && (
          <div className="space-y-6">
            <Row gutter={[16, 16]}>
              <Col span={16}>
                <Card variant="borderless" className="bg-gray-50">
                  <Paragraph>{selectedProject.description}</Paragraph>
                  <Space className="mt-4">
                    <Tag color="#538D22">{selectedProject.subject}</Tag>
                    <Tag color="#73A942">Due: {selectedProject.deadline}</Tag>
                  </Space>
                </Card>
              </Col>
              <Col span={8}>
                <Card variant="borderless" className="bg-gray-50">
                  <Progress
                    type="circle"
                    percent={selectedProject.progress}
                    strokeColor={{
                      '0%': '#538D22',
                      '100%': '#AAD576',
                    }}
                  />
                </Card>
              </Col>
            </Row>

            <Card title="Project Timeline" variant="borderless" className="bg-gray-50">
              <Timeline
                items={milestones[selectedProject.key]?.map(milestone => ({
                  color: milestone.status === 'done' ? '#538D22' : 
                         milestone.status === 'in-progress' ? '#faad14' : '#ff4d4f',
                  children: (
                    <>
                      <Text strong>{milestone.title}</Text>
                      <br />
                      <Text type="secondary">{milestone.date}</Text>
                      <br />
                      <Text>{milestone.description}</Text>
                    </>
                  ),
                }))}
              />
            </Card>

            <Card title="Project Resources" variant="borderless" className="bg-gray-50">
              <Upload
                action="/api/upload"
                listType="text"
                defaultFileList={[
                  { uid: '1', name: 'project-plan.pdf', status: 'done' },
                  { uid: '2', name: 'research-notes.docx', status: 'done' },
                ]}
              >
                <Button icon={<UploadOutlined />}>Upload File</Button>
              </Upload>
            </Card>
          </div>
        )}
      </Modal>
    </div>
    </PageLayout>
  );
}