'use client';
import { useState } from 'react';
import {
  Card,
  Typography,
  Table,
  Progress,
  Tabs,
  Tag,
  Space,
  Row,
  Col,
  Statistic,
  Avatar,
  Button,
  Tooltip,
  Badge,
  Timeline,
  Alert,
} from 'antd';
import MainLayout from '@/components/layout/MainLayout';
import {
  BookOutlined,
  TrophyOutlined,
  LineChartOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  StarOutlined,
  FireOutlined,
  ThunderboltOutlined,
  RiseOutlined,
  FallOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  DownloadOutlined,
  EditOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

interface Course {
  key: string;
  subject: string;
  teacher: string;
  schedule: string;
  lastScore: number;
  progress: number;
  status: string;
  credits: number;
  assignments: number;
  nextExam: string;
  teacherAvatar?: string;
}

interface Ranking {
  key: string;
  rank: number;
  name: string;
  class: string;
  totalMarks: number;
  percentage: number;
  trend: 'up' | 'down' | 'same';
  avatar?: string;
}

interface SubjectProgress {
  subject: string;
  score: number;
  improvement: number;
  grade: string;
  color: string;
}

interface PerformanceMetrics {
  overallScore: number;
  attendance: number;
  rankImprovement: number;
  subjectWiseProgress: SubjectProgress[];
  gpa: number;
  creditsCompleted: number;
  totalCredits: number;
}

interface RecentActivity {
  date: string;
  time: string;
  activity: string;
  subject: string;
  score?: string;
  type: 'exam' | 'assignment' | 'quiz' | 'project';
  status: 'completed' | 'pending' | 'graded';
}

export default function Academics() {
  const [activeTab, setActiveTab] = useState('overview');

  const courses: Course[] = [
    {
      key: '1',
      subject: 'Advanced Mathematics',
      teacher: 'Dr. Sarah Johnson',
      schedule: 'Mon, Wed, Fri - 9:00 AM',
      lastScore: 92,
      progress: 85,
      status: 'Excellent',
      credits: 4,
      assignments: 3,
      nextExam: '2025-01-20',
    },
    {
      key: '2',
      subject: 'Physics',
      teacher: 'Mr. Robert Smith',
      schedule: 'Tue, Thu - 10:30 AM',
      lastScore: 88,
      progress: 78,
      status: 'Good',
      credits: 4,
      assignments: 2,
      nextExam: '2025-01-22',
    },
    {
      key: '3',
      subject: 'Chemistry',
      teacher: 'Mrs. Emily Brown',
      schedule: 'Mon, Wed - 11:45 AM',
      lastScore: 85,
      progress: 72,
      status: 'Good',
      credits: 3,
      assignments: 4,
      nextExam: '2025-01-18',
    },
    {
      key: '4',
      subject: 'Biology',
      teacher: 'Dr. Michael Davis',
      schedule: 'Tue, Thu - 2:15 PM',
      lastScore: 90,
      progress: 82,
      status: 'Excellent',
      credits: 3,
      assignments: 1,
      nextExam: '2025-01-25',
    },
    {
      key: '5',
      subject: 'English Literature',
      teacher: 'Ms. Patricia Wilson',
      schedule: 'Mon, Fri - 1:00 PM',
      lastScore: 87,
      progress: 75,
      status: 'Good',
      credits: 3,
      assignments: 2,
      nextExam: '2025-01-19',
    },
  ];

  const rankings: Ranking[] = [
    {
      key: '1',
      rank: 1,
      name: 'Alice Johnson',
      class: 'X-A',
      totalMarks: 482,
      percentage: 96.4,
      trend: 'up',
    },
    {
      key: '2',
      rank: 2,
      name: 'Bob Smith',
      class: 'X-A',
      totalMarks: 475,
      percentage: 95.0,
      trend: 'same',
    },
    {
      key: '3',
      rank: 3,
      name: 'John Doe (You)',
      class: 'X-A',
      totalMarks: 470,
      percentage: 94.0,
      trend: 'up',
    },
    {
      key: '4',
      rank: 4,
      name: 'Emma Wilson',
      class: 'X-A',
      totalMarks: 465,
      percentage: 93.0,
      trend: 'down',
    },
    {
      key: '5',
      rank: 5,
      name: 'David Brown',
      class: 'X-A',
      totalMarks: 460,
      percentage: 92.0,
      trend: 'up',
    },
  ];

  const performanceMetrics: PerformanceMetrics = {
    overallScore: 88.5,
    attendance: 95,
    rankImprovement: 2,
    gpa: 3.8,
    creditsCompleted: 45,
    totalCredits: 60,
    subjectWiseProgress: [
      { subject: 'Mathematics', score: 92, improvement: 3, grade: 'A', color: 'blue' },
      { subject: 'Physics', score: 88, improvement: 2, grade: 'B+', color: 'green' },
      { subject: 'Chemistry', score: 85, improvement: -1, grade: 'B+', color: 'orange' },
      { subject: 'Biology', score: 90, improvement: 4, grade: 'A-', color: 'purple' },
      { subject: 'English', score: 87, improvement: 1, grade: 'B+', color: 'pink' },
    ],
  };

  const recentActivities: RecentActivity[] = [
    {
      date: '2025-01-10',
      time: '2:30 PM',
      activity: 'Calculus Quiz',
      subject: 'Mathematics',
      score: '92%',
      type: 'quiz',
      status: 'graded',
    },
    {
      date: '2025-01-09',
      time: '11:45 AM',
      activity: 'Lab Report Submission',
      subject: 'Chemistry',
      type: 'assignment',
      status: 'pending',
    },
    {
      date: '2025-01-08',
      time: '4:15 PM',
      activity: 'Essay Assignment',
      subject: 'English',
      score: '87%',
      type: 'assignment',
      status: 'graded',
    },
    {
      date: '2025-01-07',
      time: '10:30 AM',
      activity: 'Physics Midterm',
      subject: 'Physics',
      score: '88%',
      type: 'exam',
      status: 'graded',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'excellent': return 'success';
      case 'good': return 'processing';
      case 'average': return 'warning';
      case 'poor': return 'error';
      default: return 'default';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'success';
    if (grade.startsWith('B')) return 'processing';
    if (grade.startsWith('C')) return 'warning';
    return 'error';
  };

  const courseColumns = [
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (text: string, record: Course) => (
        <div className="flex items-center gap-3">
          <Avatar size={40} icon={<BookOutlined />} className="bg-blue-500" />
          <div>
            <Text strong className="text-slate-900 block">{text}</Text>
            <Text className="text-xs text-slate-500">{record.credits} Credits</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Instructor',
      dataIndex: 'teacher',
      key: 'teacher',
      render: (teacher: string) => (
        <div className="flex items-center gap-2">
          <Avatar size={32} icon={<UserOutlined />} className="bg-green-500" />
          <Text className="text-slate-700">{teacher}</Text>
        </div>
      ),
    },
    {
      title: 'Schedule',
      dataIndex: 'schedule',
      key: 'schedule',
      render: (schedule: string) => (
        <div className="flex items-center gap-1">
          <ClockCircleOutlined className="text-blue-500" />
          <Text className="text-slate-600 text-sm">{schedule}</Text>
        </div>
      ),
    },
    {
      title: 'Latest Score',
      dataIndex: 'lastScore',
      key: 'lastScore',
      render: (score: number) => (
        <div className="text-center">
          <div className="text-lg font-bold text-slate-900">{score}%</div>
          <Tag color={score >= 90 ? 'success' : score >= 80 ? 'processing' : 'warning'}>
            {score >= 90 ? 'A' : score >= 80 ? 'B' : 'C'}
          </Tag>
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
            <Text className="text-xs text-slate-600">Course Progress</Text>
            <Text className="text-xs font-medium">{progress}%</Text>
          </div>
          <Progress
            percent={progress}
            size="small"
            strokeColor={progress >= 80 ? '#10b981' : progress >= 60 ? '#f59e0b' : '#ef4444'}
            className="modern-progress"
          />
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: Course) => (
        <div className="text-center">
          <Tag color={getStatusColor(status)} className="mb-2">
            {status}
          </Tag>
          <div className="text-xs text-slate-500">
            {record.assignments} assignments pending
          </div>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: Course) => (
        <Space>
          <Tooltip title="View Details">
            <Button type="text" icon={<EyeOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Download Materials">
            <Button type="text" icon={<DownloadOutlined />} size="small" />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const rankingColumns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      render: (rank: number) => (
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
            rank === 1 ? 'bg-yellow-500' : rank === 2 ? 'bg-gray-400' : rank === 3 ? 'bg-orange-500' : 'bg-blue-500'
          }`}>
            {rank}
          </div>
          {rank <= 3 && <TrophyOutlined className="text-yellow-500" />}
        </div>
      ),
    },
    {
      title: 'Student',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: Ranking) => (
        <div className="flex items-center gap-3">
          <Avatar size={36} icon={<UserOutlined />} className="bg-purple-500" />
          <div>
            <Text strong className={name.includes('You') ? 'text-blue-600' : 'text-slate-900'}>
              {name}
            </Text>
            <div className="text-xs text-slate-500">{record.class}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Total Marks',
      dataIndex: 'totalMarks',
      key: 'totalMarks',
      render: (marks: number) => (
        <Text strong className="text-slate-900">{marks}/500</Text>
      ),
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (percentage: number) => (
        <div className="text-center">
          <div className="text-lg font-bold text-slate-900">{percentage}%</div>
          <Progress
            percent={percentage}
            size="small"
            showInfo={false}
            strokeColor="#10b981"
            className="modern-progress"
          />
        </div>
      ),
    },
    {
      title: 'Trend',
      dataIndex: 'trend',
      key: 'trend',
      render: (trend: 'up' | 'down' | 'same') => (
        <div className="text-center">
          {trend === 'up' && <ArrowUpOutlined className="text-green-500 text-lg" />}
          {trend === 'down' && <ArrowDownOutlined className="text-red-500 text-lg" />}
          {trend === 'same' && <span className="text-gray-400">—</span>}
        </div>
      ),
    },
  ];

  const tabItems = [
    {
      key: 'overview',
      label: (
        <div className="flex items-center gap-2">
          <StarOutlined />
          <span>Overview</span>
        </div>
      ),
      children: (
        <div className="space-y-6">
          {/* Performance Alert */}
          <Alert
            message={
              <div className="flex items-center gap-2">
                <FireOutlined className="text-orange-500" />
                <Text strong>Academic Performance Update</Text>
              </div>
            }
            description={
              <div className="mt-2">
                <Text>Great progress this semester! You've improved your rank by 2 positions and maintained excellent grades.</Text>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Tag color="green" icon={<CheckCircleOutlined />}>GPA: 3.8/4.0</Tag>
                  <Tag color="blue" icon={<TrophyOutlined />}>Rank: 3rd</Tag>
                  <Tag color="purple" icon={<BookOutlined />}>Credits: 45/60</Tag>
                </div>
              </div>
            }
            type="success"
            showIcon={false}
            className="modern-alert"
          />

          {/* Quick Stats */}
          <Row gutter={[16, 16]}>
            <Col xs={12} sm={6}>
              <Card className="stat-card modern-card text-center">
                <Statistic
                  title="Overall GPA"
                  value={performanceMetrics.gpa}
                  precision={1}
                  prefix={<StarOutlined className="text-yellow-500" />}
                  suffix="/4.0"
                  valueStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="stat-card modern-card text-center">
                <Statistic
                  title="Class Rank"
                  value="3rd"
                  prefix={<TrophyOutlined className="text-blue-500" />}
                  suffix="/60"
                  valueStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="stat-card modern-card text-center">
                <Statistic
                  title="Attendance"
                  value={performanceMetrics.attendance}
                  prefix={<CheckCircleOutlined className="text-green-500" />}
                  suffix="%"
                  valueStyle={{ color: '#10b981', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="stat-card modern-card text-center">
                <Statistic
                  title="Credits"
                  value={`${performanceMetrics.creditsCompleted}/${performanceMetrics.totalCredits}`}
                  prefix={<BookOutlined className="text-purple-500" />}
                  valueStyle={{ color: '#8b5cf6', fontWeight: 'bold' }}
                />
                <Progress
                  percent={(performanceMetrics.creditsCompleted / performanceMetrics.totalCredits) * 100}
                  size="small"
                  showInfo={false}
                  strokeColor="#8b5cf6"
                  className="mt-2 modern-progress"
                />
              </Card>
            </Col>
          </Row>

          {/* Subject Performance */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={14}>
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <LineChartOutlined className="text-blue-500" />
                    <span>Subject Performance</span>
                    <Badge count={performanceMetrics.subjectWiseProgress.length} color="blue" />
                  </div>
                }
                className="modern-card h-full"
              >
                <div className="space-y-4">
                  {performanceMetrics.subjectWiseProgress.map((subject, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar size={36} icon={<BookOutlined />} className={`bg-${subject.color}-500`} />
                          <div>
                            <Text strong className="text-slate-900">{subject.subject}</Text>
                            <div className="flex items-center gap-2 mt-1">
                              <Tag color={getGradeColor(subject.grade)}>{subject.grade}</Tag>
                              <span className={`text-sm flex items-center gap-1 ${
                                subject.improvement > 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {subject.improvement > 0 ? <RiseOutlined /> : <FallOutlined />}
                                {Math.abs(subject.improvement)}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-900">{subject.score}%</div>
                        </div>
                      </div>
                      <Progress
                        percent={subject.score}
                        strokeColor={subject.score >= 90 ? '#10b981' : subject.score >= 80 ? '#f59e0b' : '#ef4444'}
                        className="modern-progress"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={10}>
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <ClockCircleOutlined className="text-green-500" />
                    <span>Recent Activities</span>
                  </div>
                }
                className="modern-card h-full"
              >
                <Timeline
                  className="modern-timeline"
                  items={recentActivities.map((activity, index) => ({
                    color: activity.status === 'graded' ? 'green' : activity.status === 'pending' ? 'blue' : 'orange',
                    dot: activity.type === 'exam' ? <BookOutlined /> : 
                         activity.type === 'quiz' ? <ThunderboltOutlined /> : 
                         activity.type === 'assignment' ? <EditOutlined /> : <ProjectOutlined />,
                    children: (
                      <div className="pb-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <Text strong className="text-slate-900 block">{activity.activity}</Text>
                            <Text className="text-sm text-slate-600">{activity.subject}</Text>
                          </div>
                          {activity.score && (
                            <Tag color={activity.status === 'graded' ? 'success' : 'processing'}>
                              {activity.score}
                            </Tag>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span>{activity.date}</span>
                          <span>{activity.time}</span>
                          <Tag size="small" color={
                            activity.status === 'graded' ? 'success' : 
                            activity.status === 'pending' ? 'warning' : 'processing'
                          }>
                            {activity.status}
                          </Tag>
                        </div>
                      </div>
                    ),
                  }))}
                />
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: 'courses',
      label: (
        <div className="flex items-center gap-2">
          <BookOutlined />
          <span>Courses</span>
          <Badge count={courses.length} color="blue" />
        </div>
      ),
      children: (
        <Card className="modern-card">
          <div className="overflow-x-auto">
            <Table
              columns={courseColumns}
              dataSource={courses}
              pagination={false}
              className="modern-table"
              rowKey="key"
              scroll={{ x: 1200 }}
            />
          </div>
        </Card>
      ),
    },
    {
      key: 'rankings',
      label: (
        <div className="flex items-center gap-2">
          <TrophyOutlined />
          <span>Rankings</span>
          <Badge count="3rd" color="gold" />
        </div>
      ),
      children: (
        <div className="space-y-6">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Card className="stat-card modern-card text-center">
                <Statistic
                  title="Current Rank"
                  value={3}
                  prefix="#"
                  suffix="/60"
                  valueStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className="stat-card modern-card text-center">
                <Statistic
                  title="Percentile"
                  value={94.0}
                  suffix="%"
                  valueStyle={{ color: '#10b981', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card className="stat-card modern-card text-center">
                <Statistic
                  title="Rank Change"
                  value={2}
                  prefix={<ArrowUpOutlined />}
                  suffix="positions"
                  valueStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
          </Row>

          <Card className="modern-card">
            <div className="overflow-x-auto">
              <Table
                columns={rankingColumns}
                dataSource={rankings}
                pagination={false}
                className="modern-table"
                rowKey="key"
                scroll={{ x: 800 }}
              />
            </div>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <Title level={1} className="!text-white !mb-2 !text-2xl sm:!text-3xl">
                Academic Performance 📚
              </Title>
              <Paragraph className="!text-blue-100 !mb-0 text-sm sm:text-base">
                Track your academic progress and achievements
              </Paragraph>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">3rd</div>
                <div className="text-xs text-blue-200">Class Rank</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">3.8</div>
                <div className="text-xs text-blue-200">GPA</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          type="card"
          size="large"
          items={tabItems}
          className="modern-tabs"
        />
      </div>
    </MainLayout>
  );
}