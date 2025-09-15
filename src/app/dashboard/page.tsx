'use client';
import { Card, Table, Typography, Row, Col, Statistic, Progress, Alert, List, Tag, Timeline, Avatar, Space, Divider, Modal } from 'antd';
import { useState } from 'react';
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
  CalendarOutlined,
  UserOutlined,
  FireOutlined,
  ThunderboltOutlined,
  HeartOutlined,
  TeamOutlined,
  CrownOutlined,
  DollarOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

export default function DashboardPage() {
  // Modal states
  const [totalPointsModalVisible, setTotalPointsModalVisible] = useState(false);
  const [currentPointsModalVisible, setCurrentPointsModalVisible] = useState(false);

  // Points data
  const totalEarnedPoints = 850;
  const pointsData = {
    totalPoints: totalEarnedPoints,
    maxTotalPoints: 1000,
    // Current points measured against total earned points
    currentPoints: 720, // Current points earned out of total earned points
    maxCurrentPoints: totalEarnedPoints, // Maximum is the total earned points
    totalPointsBreakdown: [
      { category: 'Academic Performance', points: 350, maxPoints: 400 },
      { category: 'Attendance', points: 180, maxPoints: 200 },
      { category: 'Extracurricular Activities', points: 150, maxPoints: 200 },
      { category: 'Behavior and Discipline', points: 170, maxPoints: 200 },
    ],
    currentPointsBreakdown: [
      { 
        category: 'Class Participation', 
        points: 250,
        maxPoints: totalEarnedPoints
      },
      { 
        category: 'Homework Completion', 
        points: 200,
        maxPoints: totalEarnedPoints
      },
      { 
        category: 'Quiz Performance', 
        points: 170,
        maxPoints: totalEarnedPoints
      },
      { 
        category: 'Behavior', 
        points: 100,
        maxPoints: totalEarnedPoints
      },
    ],
  };

  // Academic Performance Stats
  const academicStats = {
    totalStudents: 60,
    averageScore: 85.5, 
    attendance: 92,
    upcomingExams: 3,
    pendingAssignments: 4,
  };

  // Upcoming Projects with priority levels
  const upcomingProjects = [
    {
      title: 'Advanced Machine Learning Research Paper',
      subject: 'Computer Science',
      dueDate: '2025-01-15',
      status: 'in-progress',
      priority: 'high',
      progress: 65,
      instructor: 'Dr. Sarah Johnson',
    },
    {
      title: 'Calculus Problem Set - Chapter 12',
      subject: 'Mathematics',
      dueDate: '2025-01-12',
      status: 'pending',
      priority: 'medium',
      progress: 30,
      instructor: 'Prof. Michael Chen',
    },
    {
      title: 'World War II Historical Analysis',
      subject: 'History',
      dueDate: '2025-01-20',
      status: 'not-started',
      priority: 'low',
      progress: 0,
      instructor: 'Dr. Emily Rodriguez',
    },
  ];

  // Recent Activities with more details
  const recentActivities = [
    {
      date: '2025-01-10',
      time: '2:30 PM',
      title: 'Advanced Algorithms Quiz',
      score: '94%',
      type: 'success',
      subject: 'Computer Science',
      icon: <BookOutlined />,
    },
    {
      date: '2025-01-09',
      time: '11:45 AM',
      title: 'Physics Lab Report Submitted',
      score: 'Under Review',
      type: 'processing',
      subject: 'Physics',
      icon: <ProjectOutlined />,
    },
    {
      date: '2025-01-08',
      time: '4:15 PM',
      title: 'Literature Essay Graded',
      score: '88%',
      type: 'success',
      subject: 'English Literature',
      icon: <StarOutlined />,
    },
    {
      date: '2025-01-07',
      time: '9:20 AM',
      title: 'Chemistry Midterm',
      score: '91%',
      type: 'success',
      subject: 'Chemistry',
      icon: <TrophyOutlined />,
    },
  ];

  // Enhanced class timetable
  const classColumns = [
    { 
      title: 'Time', 
      dataIndex: 'time', 
      key: 'time',
      width: 120,
      render: (text: string) => <Text strong className="text-slate-700">{text}</Text>
    },
    { 
      title: 'Monday', 
      dataIndex: 'monday', 
      key: 'monday',
      render: (subject: any) => subject ? (
        <div className="p-2 bg-blue-50 rounded-md border-l-4 border-blue-400">
          <Text className="text-blue-800 font-medium text-xs">{subject.name}</Text>
          <br />
          <Text className="text-blue-600 text-xs">{subject.room}</Text>
        </div>
      ) : null
    },
    { 
      title: 'Tuesday', 
      dataIndex: 'tuesday', 
      key: 'tuesday',
      render: (subject: any) => subject ? (
        <div className="p-2 bg-green-50 rounded-md border-l-4 border-green-400">
          <Text className="text-green-800 font-medium text-xs">{subject.name}</Text>
          <br />
          <Text className="text-green-600 text-xs">{subject.room}</Text>
        </div>
      ) : null
    },
    { 
      title: 'Wednesday', 
      dataIndex: 'wednesday', 
      key: 'wednesday',
      render: (subject: any) => subject ? (
        <div className="p-2 bg-purple-50 rounded-md border-l-4 border-purple-400">
          <Text className="text-purple-800 font-medium text-xs">{subject.name}</Text>
          <br />
          <Text className="text-purple-600 text-xs">{subject.room}</Text>
        </div>
      ) : null
    },
    { 
      title: 'Thursday', 
      dataIndex: 'thursday', 
      key: 'thursday',
      render: (subject: any) => subject ? (
        <div className="p-2 bg-orange-50 rounded-md border-l-4 border-orange-400">
          <Text className="text-orange-800 font-medium text-xs">{subject.name}</Text>
          <br />
          <Text className="text-orange-600 text-xs">{subject.room}</Text>
        </div>
      ) : null
    },
    { 
      title: 'Friday', 
      dataIndex: 'friday', 
      key: 'friday',
      render: (subject: any) => subject ? (
        <div className="p-2 bg-pink-50 rounded-md border-l-4 border-pink-400">
          <Text className="text-pink-800 font-medium text-xs">{subject.name}</Text>
          <br />
          <Text className="text-pink-600 text-xs">{subject.room}</Text>
        </div>
      ) : null
    },
  ];

  const classData = [
    {
      key: '1',
      time: '9:00 - 10:00',
      monday: { name: 'Advanced Mathematics', room: 'Room 201' },
      tuesday: { name: 'Physics Lab', room: 'Lab 301' },
      wednesday: { name: 'Computer Science', room: 'Room 105' },
      thursday: { name: 'Literature', room: 'Room 150' },
      friday: { name: 'Chemistry', room: 'Lab 205' },
    },
    {
      key: '2',
      time: '10:15 - 11:15',
      monday: { name: 'History', room: 'Room 180' },
      tuesday: { name: 'Mathematics', room: 'Room 201' },
      wednesday: { name: 'English', room: 'Room 120' },
      thursday: { name: 'Physics', room: 'Room 250' },
      friday: { name: 'Biology', room: 'Lab 310' },
    },
    {
      key: '3',
      time: '11:30 - 12:30',
      monday: { name: 'Computer Science', room: 'Room 105' },
      tuesday: { name: 'Chemistry', room: 'Lab 205' },
      wednesday: { name: 'Mathematics', room: 'Room 201' },
      thursday: { name: 'Art', room: 'Studio A' },
      friday: { name: 'Physical Education', room: 'Gym' },
    },
  ];

  // Enhanced exam timetable
  const examColumns = [
    { 
      title: 'Date', 
      dataIndex: 'date', 
      key: 'date',
      render: (date: string) => (
        <div className="flex items-center gap-2">
          <CalendarOutlined className="text-blue-500" />
          <Text strong>{date}</Text>
        </div>
      )
    },
    { 
      title: 'Subject', 
      dataIndex: 'subject', 
      key: 'subject',
      render: (subject: string) => (
        <Tag color="blue" className="font-medium">{subject}</Tag>
      )
    },
    { 
      title: 'Time', 
      dataIndex: 'time', 
      key: 'time',
      render: (time: string) => (
        <div className="flex items-center gap-2">
          <ClockCircleOutlined className="text-green-500" />
          <Text>{time}</Text>
        </div>
      )
    },
    { 
      title: 'Room', 
      dataIndex: 'room', 
      key: 'room',
      render: (room: string) => (
        <Text className="text-slate-600">{room}</Text>
      )
    },
    { 
      title: 'Type', 
      dataIndex: 'type', 
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'Final' ? 'red' : type === 'Midterm' ? 'orange' : 'green'}>
          {type}
        </Tag>
      )
    },
  ];

  const examData = [
    {
      key: '1',
      date: '2025-01-15',
      subject: 'Advanced Mathematics',
      time: '9:00 - 11:00 AM',
      room: 'Exam Hall A',
      type: 'Final',
    },
    {
      key: '2',
      date: '2025-01-17',
      subject: 'Computer Science',
      time: '2:00 - 4:00 PM',
      room: 'Exam Hall B',
      type: 'Final',
    },
    {
      key: '3',
      date: '2025-01-20',
      subject: 'Physics',
      time: '10:00 - 12:00 PM',
      room: 'Exam Hall C',
      type: 'Midterm',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'blue';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'processing';
      case 'pending': return 'warning';
      case 'not-started': return 'default';
      default: return 'default';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <Title level={1} className="!text-white !mb-2 !text-2xl sm:!text-3xl">
                Welcome back, Prassana Natarajan! 👋
              </Title>
              <Paragraph className="!text-blue-100 !mb-0 text-sm sm:text-base">
                You're doing great this semester. Keep up the excellent work!
              </Paragraph>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{pointsData.currentPoints}</div>
                <div className="text-xs text-blue-200">Current Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{academicStats.averageScore}%</div>
                <div className="text-xs text-blue-200">Average</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <Row gutter={[16, 16]} className="animate-slide-up">
          <Col xs={12} sm={6}>
            <Card className="stat-card modern-card cursor-pointer hover:shadow-md transition-all" onClick={() => setTotalPointsModalVisible(true)}>
              <Statistic
                title="Total Earned Points"
                value={`${pointsData.totalPoints}/${pointsData.maxTotalPoints}`}
                prefix={<CrownOutlined className="text-yellow-500" />}
                valueStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
              />
              <Progress
                percent={(pointsData.totalPoints/pointsData.maxTotalPoints) * 100}
                size="small"
                showInfo={false}
                strokeColor="#f59e0b"
                className="mt-3 modern-progress"
              />
            </Card>
          </Col>
          
          <Col xs={12} sm={6}>
            <Card className="stat-card modern-card">
              <Statistic
                title="Average Score"
                value={academicStats.averageScore}
                precision={1}
                prefix={<RiseOutlined className="text-blue-500" />}
                suffix="%"
                valueStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
              />
              <Progress
                percent={academicStats.averageScore}
                size="small"
                showInfo={false}
                strokeColor="#3b82f6"
                className="mt-3 modern-progress"
              />
            </Card>
          </Col>
          
          <Col xs={12} sm={6}>
            <Card className="stat-card modern-card">
              <Statistic
                title="Attendance"
                value={academicStats.attendance}
                prefix={<CheckCircleOutlined className="text-green-500" />}
                suffix="%"
                valueStyle={{ color: '#10b981', fontWeight: 'bold' }}
              />
              <Progress
                percent={academicStats.attendance}
                size="small"
                showInfo={false}
                strokeColor="#10b981"
                className="mt-3 modern-progress"
              />
            </Card>
          </Col>
          
          <Col xs={12} sm={6}>
            <Card className="stat-card modern-card cursor-pointer hover:shadow-md transition-all" onClick={() => setCurrentPointsModalVisible(true)}>
              <Statistic
                title="Current Points"
                value={`${pointsData.currentPoints}/${pointsData.maxCurrentPoints}`}
                prefix={<DollarOutlined className="text-purple-500" />}
                valueStyle={{ color: '#8b5cf6', fontWeight: 'bold' }}
              />
              <Progress
                percent={(pointsData.currentPoints / pointsData.maxCurrentPoints) * 100}
                size="small"
                showInfo={false}
                strokeColor="#8b5cf6"
                className="mt-3 modern-progress"
              />
            </Card>
          </Col>
        </Row>

        {/* Alerts */}
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Alert
              message={
                <div className="flex items-center gap-2">
                  <FireOutlined className="text-orange-500" />
                  <Text strong>Upcoming Deadlines</Text>
                </div>
              }
              description={
                <div className="mt-2">
                  <Text>You have {academicStats.pendingAssignments} assignments due this week and {academicStats.upcomingExams} exams scheduled.</Text>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Tag color="red" icon={<ClockCircleOutlined />}>Due Tomorrow: Math Problem Set</Tag>
                    <Tag color="orange" icon={<BookOutlined />}>Due Friday: Research Paper</Tag>
                  </div>
                </div>
              }
              type="warning"
              showIcon={false}
              className="modern-alert animate-scale-in"
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          {/* Project Updates */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <div className="flex items-center gap-2">
                  <ProjectOutlined className="text-blue-500" />
                  <span>Active Projects</span>
                  <Tag color="blue">{upcomingProjects.length}</Tag>
                </div>
              }
              className="modern-card h-full"
              extra={<Text type="secondary" className="text-xs">Updated 2 hours ago</Text>}
            >
              <div className="space-y-4">
                {upcomingProjects.map((project, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <Text strong className="text-slate-900 block mb-1">{project.title}</Text>
                        <div className="flex items-center gap-2 mb-2">
                          <Tag color="blue" >{project.subject}</Tag>
                          <Tag color={getPriorityColor(project.priority)} >
                            {project.priority.toUpperCase()}
                          </Tag>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-600">
                          <span className="flex items-center gap-1">
                            <UserOutlined />
                            {project.instructor}
                          </span>
                          <span className="flex items-center gap-1">
                            <CalendarOutlined />
                            Due: {project.dueDate}
                          </span>
                        </div>
                      </div>
                      <Tag color={getStatusColor(project.status)} className="ml-2">
                        {project.status.replace('-', ' ').toUpperCase()}
                      </Tag>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <Text className="text-xs text-slate-600">Progress</Text>
                        <Text className="text-xs font-medium text-slate-700">{project.progress}%</Text>
                      </div>
                      <Progress
                        percent={project.progress}
                        size="small"
                        showInfo={false}
                        strokeColor={project.progress > 70 ? '#10b981' : project.progress > 40 ? '#f59e0b' : '#ef4444'}
                        className="modern-progress"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          {/* Recent Activities */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <div className="flex items-center gap-2">
                  <StarOutlined className="text-yellow-500" />
                  <span>Recent Activities</span>
                  <Tag color="green">Latest</Tag>
                </div>
              }
              className="modern-card h-full"
              extra={<Text type="secondary" className="text-xs">Last 7 days</Text>}
            >
              <Timeline
                className="modern-timeline"
                items={recentActivities.map((activity, index) => ({
                  color: activity.type === 'success' ? 'green' : activity.type === 'processing' ? 'blue' : 'orange',
                  dot: activity.icon,
                  children: (
                    <div className="pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <Text strong className="text-slate-900 block">{activity.title}</Text>
                          <Text className="text-xs text-slate-600">{activity.subject}</Text>
                        </div>
                        <Tag 
                          color={activity.type === 'success' ? 'success' : activity.type === 'processing' ? 'processing' : 'warning'}
                          className="ml-2"
                        >
                          {activity.score}
                        </Tag>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>{activity.date}</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  ),
                }))}
              />
            </Card>
          </Col>
        </Row>

        {/* Timetables */}
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card 
              title={
                <div className="flex items-center gap-2">
                  <ClockCircleOutlined className="text-green-500" />
                  <span>Weekly Class Schedule</span>
                  <Tag color="green">Current Week</Tag>
                </div>
              }
              className="modern-card"
              extra={
                <Space>
                  <Text type="secondary" className="text-xs">Week of Jan 8-12, 2025</Text>
                </Space>
              }
            >
              <div className="overflow-x-auto">
                <Table 
                  columns={classColumns} 
                  dataSource={classData} 
                  pagination={false}
                  size="small"
                  className="modern-table"
                  scroll={{ x: 800 }}
                />
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card 
              title={
                <div className="flex items-center gap-2">
                  <BookOutlined className="text-red-500" />
                  <span>Upcoming Examinations</span>
                  <Tag color="red">Important</Tag>
                </div>
              }
              className="modern-card"
              extra={
                <Space>
                  <ThunderboltOutlined className="text-red-500" />
                  <Text type="secondary" className="text-xs">Next 2 weeks</Text>
                </Space>
              }
            >
              <div className="overflow-x-auto">
                <Table 
                  columns={examColumns} 
                  dataSource={examData}
                  size="small"
                  className="modern-table"
                  scroll={{ x: 600 }}
                  pagination={false}
                />
              </div>
            </Card>
          </Col>
        </Row>

        {/* Quick Actions */}
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card 
              title={
                <div className="flex items-center gap-2">
                  <HeartOutlined className="text-pink-500" />
                  <span>Quick Actions</span>
                </div>
              }
              className="modern-card"
            >
              <Row gutter={[12, 12]}>
                <Col xs={12} sm={8} md={6}>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-200 cursor-pointer text-center">
                    <BookOutlined className="text-2xl text-blue-500 mb-2" />
                    <Text className="block text-sm font-medium text-blue-700">View Grades</Text>
                  </div>
                </Col>
                <Col xs={12} sm={8} md={6}>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200 hover:shadow-md transition-all duration-200 cursor-pointer text-center">
                    <CalendarOutlined className="text-2xl text-green-500 mb-2" />
                    <Text className="block text-sm font-medium text-green-700">Check Attendance</Text>
                  </div>
                </Col>
                <Col xs={12} sm={8} md={6}>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 hover:shadow-md transition-all duration-200 cursor-pointer text-center">
                    <ProjectOutlined className="text-2xl text-purple-500 mb-2" />
                    <Text className="block text-sm font-medium text-purple-700">Submit Assignment</Text>
                  </div>
                </Col>
                <Col xs={12} sm={8} md={6}>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 hover:shadow-md transition-all duration-200 cursor-pointer text-center">
                    <TeamOutlined className="text-2xl text-orange-500 mb-2" />
                    <Text className="block text-sm font-medium text-orange-700">Contact Support</Text>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Total Points Modal */}
        <Modal
          title={
            <div className="flex items-center gap-2">
              <CrownOutlined className="text-yellow-500" />
              <span>Total Points Breakdown</span>
            </div>
          }
          open={totalPointsModalVisible}
          onCancel={() => setTotalPointsModalVisible(false)}
          footer={null}
          width={600}
        >
          <div className="space-y-4">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Statistic
                title="Total Points Earned"
                value={`${pointsData.totalPoints}/${pointsData.maxTotalPoints}`}
                suffix="points"
                valueStyle={{ color: '#f59e0b' }}
              />
              <Progress
                percent={(pointsData.totalPoints/pointsData.maxTotalPoints) * 100}
                strokeColor="#f59e0b"
              />
            </div>
            <List
              dataSource={pointsData.totalPointsBreakdown}
              renderItem={item => (
                <List.Item>
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-2">
                      <Text strong>{item.category}</Text>
                      <Text>{item.points}/{item.maxPoints} points</Text>
                    </div>
                    <Progress
                      percent={(item.points/item.maxPoints) * 100}
                      size="small"
                      showInfo={false}
                      strokeColor="#f59e0b"
                    />
                  </div>
                </List.Item>
              )}
            />
          </div>
        </Modal>

        {/* Current Points Modal */}
        <Modal
          title={
            <div className="flex items-center gap-2">
              <DollarOutlined className="text-purple-500" />
              <span>Current Points Breakdown</span>
            </div>
          }
          open={currentPointsModalVisible}
          onCancel={() => setCurrentPointsModalVisible(false)}
          footer={null}
          width={600}
        >
          <div className="space-y-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Statistic
                title="Current Period Points"
                value={`${pointsData.currentPoints}/${pointsData.maxCurrentPoints}`}
                suffix="points"
                valueStyle={{ color: '#8b5cf6' }}
              />
              <Progress
                percent={(pointsData.currentPoints/pointsData.maxCurrentPoints) * 100}
                strokeColor="#8b5cf6"
              />
            </div>
            <List
              dataSource={pointsData.currentPointsBreakdown}
              renderItem={item => (
                <List.Item>
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-2">
                      <Text strong>{item.category}</Text>
                      <Text>{item.points}/{item.maxPoints} points</Text>
                    </div>
                    <Progress
                      percent={(item.points/item.maxPoints) * 100}
                      size="small"
                      showInfo={false}
                      strokeColor="#8b5cf6"
                    />
                  </div>
                </List.Item>
              )}
            />
          </div>
        </Modal>
      </div>
    </MainLayout>
  );
}