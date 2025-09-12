'use client';
import { Card, Table, Typography, Row, Col, Statistic, Progress, Alert, List, Tag, Timeline } from 'antd';
import MainLayout from '@/components/layout/MainLayout';
import {
  TrophyOutlined,
  RiseOutlined,
  BookOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  ProjectOutlined,
  StarOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

export default function DashboardPage() {
  // Academic Performance Stats
  const academicStats = {
    rank: 5,
    totalStudents: 60,
    averageScore: 85.5,
    attendance: 92,
  };

  // Upcoming Projects
  const upcomingProjects = [
    {
      title: 'Science Research Paper',
      subject: 'Biology',
      dueDate: '2025-09-15',
      status: 'pending',
    },
    {
      title: 'Math Problem Set',
      subject: 'Mathematics',
      dueDate: '2025-09-12',
      status: 'in-progress',
    },
    {
      title: 'History Essay',
      subject: 'History',
      dueDate: '2025-09-20',
      status: 'not-started',
    },
  ];

  // Recent Activities
  const recentActivities = [
    {
      date: '2025-09-10',
      title: 'Math Quiz Completed',
      score: '90%',
      type: 'success',
    },
    {
      date: '2025-09-09',
      title: 'Science Project Submitted',
      score: 'Pending Review',
      type: 'processing',
    },
    {
      date: '2025-09-08',
      title: 'English Assignment',
      score: '85%',
      type: 'success',
    },
  ];

  // Sample data for class timetable
  const classColumns = [
    { title: 'Time', dataIndex: 'time', key: 'time' },
    { title: 'Monday', dataIndex: 'monday', key: 'monday' },
    { title: 'Tuesday', dataIndex: 'tuesday', key: 'tuesday' },
    { title: 'Wednesday', dataIndex: 'wednesday', key: 'wednesday' },
    { title: 'Thursday', dataIndex: 'thursday', key: 'thursday' },
    { title: 'Friday', dataIndex: 'friday', key: 'friday' },
  ];

  const classData = [
    {
      key: '1',
      time: '9:00 - 10:00',
      monday: 'Mathematics',
      tuesday: 'English',
      wednesday: 'Science',
      thursday: 'History',
      friday: 'Geography',
    },
    // Add more rows as needed
  ];

  // Sample data for exam timetable
  const examColumns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Subject', dataIndex: 'subject', key: 'subject' },
    { title: 'Time', dataIndex: 'time', key: 'time' },
    { title: 'Room', dataIndex: 'room', key: 'room' },
  ];

  const examData = [
    {
      key: '1',
      date: '2025-09-15',
      subject: 'Mathematics',
      time: '9:00 - 11:00',
      room: 'Room 101',
    },
    // Add more rows as needed
  ];

  return (
    <MainLayout>
      <div className="mb-6">
        <Title level={2}>Dashboard</Title>
        <Text type="secondary">Welcome back, John Doe!</Text>
      </div>

      {/* Academic Performance Stats */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless" className="h-full">
            <Statistic
              title="Class Rank"
              value={`${academicStats.rank}/${academicStats.totalStudents}`}
              prefix={<TrophyOutlined className="text-yellow-500" />}
              suffix="th"
            />
            <Progress
              percent={(1 - academicStats.rank/academicStats.totalStudents) * 100}
              size="small"
              showInfo={false}
              strokeColor="#faad14"
              className="mt-2"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless" className="h-full">
            <Statistic
              title="Average Score"
              value={academicStats.averageScore}
              precision={1}
              prefix={<RiseOutlined className="text-blue-500" />}
              suffix="%"
            />
            <Progress
              percent={academicStats.averageScore}
              size="small"
              showInfo={false}
              strokeColor="#1890ff"
              className="mt-2"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless" className="h-full">
            <Statistic
              title="Attendance Rate"
              value={academicStats.attendance}
              prefix={<CheckCircleOutlined className="text-green-500" />}
              suffix="%"
            />
            <Progress
              percent={academicStats.attendance}
              size="small"
              showInfo={false}
              strokeColor="#52c41a"
              className="mt-2"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="h-full">
            <Statistic
              title="Completed Projects"
              value={15}
              prefix={<ProjectOutlined className="text-purple-500" />}
              suffix="/20"
            />
            <Progress
              percent={75}
              size="small"
              showInfo={false}
              strokeColor="#722ed1"
              className="mt-2"
            />
          </Card>
        </Col>
      </Row>

      {/* Alerts and Notifications */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={24}>
          <Alert
            message="Upcoming Due Dates"
            description="You have 3 assignments due this week"
            type="warning"
            showIcon
            icon={<WarningOutlined />}
            className="mb-4"
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Project Updates */}
        <Col xs={24} lg={12} className="mb-6">
          <Card
            title={
              <span>
                <ProjectOutlined className="mr-2" />
                Project Updates
              </span>
            }
            className="h-full"
          >
            <List
              dataSource={upcomingProjects}
              renderItem={(item) => (
                <List.Item
                  extra={
                    <Tag color={
                      item.status === 'pending' ? 'warning' :
                      item.status === 'in-progress' ? 'processing' :
                      'default'
                    }>
                      {item.status}
                    </Tag>
                  }
                >
                  <List.Item.Meta
                    title={item.title}
                    description={
                      <>
                        <Text type="secondary">{item.subject}</Text>
                        <br />
                        <Text type="danger">Due: {item.dueDate}</Text>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Recent Activities */}
        <Col xs={24} lg={12} className="mb-6">
          <Card
            title={
              <span>
                <StarOutlined className="mr-2" />
                Recent Activities
              </span>
            }
            className="h-full"
          >
            <Timeline
              items={recentActivities.map(activity => ({
                color: activity.type === 'success' ? 'green' : 'blue',
                children: (
                  <>
                    <Text strong>{activity.title}</Text>
                    <br />
                    <Text type="secondary">{activity.date}</Text>
                    <br />
                    <Tag color={activity.type === 'success' ? 'success' : 'processing'}>
                      {activity.score}
                    </Tag>
                  </>
                ),
              }))}
            />
          </Card>
        </Col>

        {/* Class Timetable */}
        <Col span={24}>
          <Card 
            title={
              <span>
                <ClockCircleOutlined className="mr-2" />
                Class Timetable
              </span>
            }
            className="mb-6"
          >
            <Table 
              columns={classColumns} 
              dataSource={classData} 
              scroll={{ x: true }}
              pagination={false}
            />
          </Card>
        </Col>

        {/* Upcoming Exams */}
        <Col span={24}>
          <Card 
            title={
              <span>
                <BookOutlined className="mr-2" />
                Upcoming Exams
              </span>
            }
          >
            <Table 
              columns={examColumns} 
              dataSource={examData}
              scroll={{ x: true }}
            />
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
}
