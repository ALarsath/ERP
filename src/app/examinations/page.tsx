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
  Statistic,
  Calendar,
  Badge,
  Button,
  Modal,
  Descriptions,
  Alert,
  Timeline,
  Avatar,
  Tooltip,
  DatePicker,
  Select,
  Divider,
} from 'antd';
import MainLayout from '@/components/layout/MainLayout';
import {
  CalendarOutlined,
  TrophyOutlined,
  BarChartOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  DownloadOutlined,
  BookOutlined,
  StarOutlined,
  FireOutlined,
  ThunderboltOutlined,
  RiseOutlined,
  FallOutlined,
  EyeOutlined,
  PrinterOutlined,
  FilterOutlined,
  UserOutlined,
  EnvironmentOutlined,
  FieldTimeOutlined,
  LineChartOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface Exam {
  key: string;
  subject: string;
  examType: string;
  date: string;
  time: string;
  venue: string;
  status: 'upcoming' | 'completed' | 'ongoing' | 'cancelled';
  duration: string;
  instructor: string;
  totalMarks: number;
  instructions?: string;
  priority: 'high' | 'medium' | 'low';
}

interface ExamResult {
  key: string;
  subject: string;
  examType: string;
  date: string;
  totalMarks: number;
  obtainedMarks: number;
  grade: string;
  status: 'pass' | 'fail' | 'pending';
  percentage: number;
  rank?: number;
  totalStudents?: number;
  instructor: string;
  feedback?: string;
}

interface SubjectPerformance {
  subject: string;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  improvement: number;
  examCount: number;
  grade: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface ExamStats {
  totalExams: number;
  upcomingExams: number;
  completedExams: number;
  averageScore: number;
  highestScore: number;
  currentRank: number;
  totalStudents: number;
  passRate: number;
  improvementRate: number;
}

export default function Examinations() {
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [selectedExam, setSelectedExam] = useState<ExamResult | null>(null);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  // Enhanced exam data
  const exams: Exam[] = [
    {
      key: '1',
      subject: 'Advanced Mathematics',
      examType: 'Final Exam',
      date: '2025-01-20',
      time: '09:00 AM',
      venue: 'Main Hall A-101',
      status: 'upcoming',
      duration: '3 hours',
      instructor: 'Dr. Sarah Johnson',
      totalMarks: 100,
      instructions: 'Bring calculator and drawing instruments',
      priority: 'high',
    },
    {
      key: '2',
      subject: 'Physics',
      examType: 'Midterm',
      date: '2025-01-18',
      time: '10:30 AM',
      venue: 'Science Block B-202',
      status: 'upcoming',
      duration: '2.5 hours',
      instructor: 'Mr. Robert Smith',
      totalMarks: 80,
      priority: 'high',
    },
    {
      key: '3',
      subject: 'Chemistry',
      examType: 'Unit Test',
      date: '2025-01-15',
      time: '02:00 PM',
      venue: 'Lab Complex C-301',
      status: 'upcoming',
      duration: '2 hours',
      instructor: 'Mrs. Emily Brown',
      totalMarks: 50,
      priority: 'medium',
    },
    {
      key: '4',
      subject: 'Biology',
      examType: 'Final Exam',
      date: '2025-01-10',
      time: '09:00 AM',
      venue: 'Main Hall A-102',
      status: 'completed',
      duration: '3 hours',
      instructor: 'Dr. Michael Davis',
      totalMarks: 100,
      priority: 'high',
    },
    {
      key: '5',
      subject: 'English Literature',
      examType: 'Midterm',
      date: '2025-01-08',
      time: '11:00 AM',
      venue: 'Arts Block D-150',
      status: 'completed',
      duration: '2 hours',
      instructor: 'Ms. Patricia Wilson',
      totalMarks: 75,
      priority: 'medium',
    },
  ];

  // Enhanced exam results
  const examResults: ExamResult[] = [
    {
      key: '1',
      subject: 'Biology',
      examType: 'Final Exam',
      date: '2025-01-10',
      totalMarks: 100,
      obtainedMarks: 92,
      grade: 'A+',
      status: 'pass',
      percentage: 92,
      rank: 3,
      totalStudents: 60,
      instructor: 'Dr. Michael Davis',
      feedback: 'Excellent understanding of concepts. Keep up the good work!',
    },
    {
      key: '2',
      subject: 'English Literature',
      examType: 'Midterm',
      date: '2025-01-08',
      totalMarks: 75,
      obtainedMarks: 68,
      grade: 'A',
      status: 'pass',
      percentage: 91,
      rank: 5,
      totalStudents: 60,
      instructor: 'Ms. Patricia Wilson',
      feedback: 'Good analytical skills. Work on essay structure.',
    },
    {
      key: '3',
      subject: 'Chemistry',
      examType: 'Unit Test',
      date: '2024-12-20',
      totalMarks: 50,
      obtainedMarks: 43,
      grade: 'A',
      status: 'pass',
      percentage: 86,
      rank: 8,
      totalStudents: 60,
      instructor: 'Mrs. Emily Brown',
      feedback: 'Strong performance in organic chemistry section.',
    },
    {
      key: '4',
      subject: 'Physics',
      examType: 'Midterm',
      date: '2024-12-15',
      totalMarks: 80,
      obtainedMarks: 71,
      grade: 'A',
      status: 'pass',
      percentage: 89,
      rank: 6,
      totalStudents: 60,
      instructor: 'Mr. Robert Smith',
      feedback: 'Excellent problem-solving approach. Minor calculation errors.',
    },
  ];

  // Enhanced subject performance
  const subjectPerformance: SubjectPerformance[] = [
    {
      subject: 'Mathematics',
      averageScore: 88,
      highestScore: 95,
      lowestScore: 82,
      improvement: 5,
      examCount: 4,
      grade: 'A',
      trend: 'up',
      color: 'blue',
    },
    {
      subject: 'Physics',
      averageScore: 85,
      highestScore: 92,
      lowestScore: 78,
      improvement: 3,
      examCount: 4,
      grade: 'A',
      trend: 'up',
      color: 'green',
    },
    {
      subject: 'Chemistry',
      averageScore: 82,
      highestScore: 88,
      lowestScore: 75,
      improvement: -2,
      examCount: 3,
      grade: 'B+',
      trend: 'down',
      color: 'orange',
    },
    {
      subject: 'Biology',
      averageScore: 90,
      highestScore: 95,
      lowestScore: 85,
      improvement: 4,
      examCount: 3,
      grade: 'A+',
      trend: 'up',
      color: 'purple',
    },
    {
      subject: 'English',
      averageScore: 87,
      highestScore: 92,
      lowestScore: 82,
      improvement: 2,
      examCount: 4,
      grade: 'A',
      trend: 'stable',
      color: 'pink',
    },
  ];

  // Exam statistics
  const examStats: ExamStats = {
    totalExams: 15,
    upcomingExams: 3,
    completedExams: 12,
    averageScore: 88.5,
    highestScore: 95,
    currentRank: 5,
    totalStudents: 60,
    passRate: 100,
    improvementRate: 12,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'warning';
      case 'completed': return 'success';
      case 'ongoing': return 'processing';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'blue';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'success';
    if (grade.startsWith('B')) return 'processing';
    if (grade.startsWith('C')) return 'warning';
    return 'error';
  };

  const examColumns = [
    {
      title: 'Exam Details',
      key: 'examDetails',
      render: (  record: Exam) => (
        <div className="flex items-center gap-3">
          <Avatar size={40} icon={<BookOutlined />} className="bg-blue-500" />
          <div>
            <Text strong className="text-slate-900 block">{record.subject}</Text>
            <div className="flex items-center gap-2">
              <Tag color="blue" >{record.examType}</Tag>
              <Tag color={getPriorityColor(record.priority)} >
                {record.priority.toUpperCase()}
              </Tag>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Schedule',
      key: 'schedule',
      render: (  record: Exam) => (
        <div>
          <div className="flex items-center gap-1 mb-1">
            <CalendarOutlined className="text-blue-500" />
            <Text strong className="text-slate-900">{dayjs(record.date).format('MMM DD, YYYY')}</Text>
          </div>
          <div className="flex items-center gap-1 mb-1">
            <ClockCircleOutlined className="text-green-500" />
            <Text className="text-slate-600">{record.time}</Text>
          </div>
          <div className="flex items-center gap-1">
            <FieldTimeOutlined className="text-purple-500" />
            <Text className="text-slate-600">{record.duration}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Venue & Instructor',
      key: 'venue',
      render: (  record: Exam) => (
        <div>
          <div className="flex items-center gap-1 mb-1">
            <EnvironmentOutlined className="text-red-500" />
            <Text className="text-slate-700">{record.venue}</Text>
          </div>
          <div className="flex items-center gap-1">
            <UserOutlined className="text-blue-500" />
            <Text className="text-slate-600 text-sm">{record.instructor}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Total Marks',
      dataIndex: 'totalMarks',
      key: 'totalMarks',
      render: (marks: number) => (
        <div className="text-center">
          <div className="text-lg font-bold text-slate-900">{marks}</div>
          <Text className="text-xs text-slate-500">marks</Text>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <div className="text-center">
          <Tag color={getStatusColor(status)} className="capitalize font-medium">
            {status.toUpperCase()}
          </Tag>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (  record: Exam) => (
        <Space direction="vertical" size="small">
          <Space size="small">
            <Tooltip title="View Details">
              <Button type="text" icon={<EyeOutlined />} size="small" />
            </Tooltip>
            <Tooltip title="Download Admit Card">
              <Button type="text" icon={<DownloadOutlined />} size="small" />
            </Tooltip>
          </Space>
        </Space>
      ),
    },
  ];

  const resultColumns = [
    {
      title: 'Subject Details',
      key: 'subjectDetails',
      render: (  record: ExamResult) => (
        <div className="flex items-center gap-3">
          <Avatar size={40} icon={<FileTextOutlined />} className="bg-green-500" />
          <div>
            <Text strong className="text-slate-900 block">{record.subject}</Text>
            <Text className="text-xs text-slate-600">{record.examType}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => (
        <div>
          <div className="font-medium text-slate-900">{dayjs(date).format('MMM DD, YYYY')}</div>
          <div className="text-xs text-slate-500">{dayjs(date).format('dddd')}</div>
        </div>
      ),
    },
    {
      title: 'Score',
      key: 'score',
      render: (  record: ExamResult) => (
        <div className="text-center">
          <div className="text-lg font-bold text-slate-900">
            {record.obtainedMarks}/{record.totalMarks}
          </div>
          <div className="text-sm text-green-600 font-medium">{record.percentage}%</div>
        </div>
      ),
    },
    {
      title: 'Grade & Rank',
      key: 'gradeRank',
      render: (  record: ExamResult) => (
        <div className="text-center">
          <Tag color={getGradeColor(record.grade)} className="mb-1 font-medium">
            {record.grade}
          </Tag>
          {record.rank && (
            <div className="text-xs text-slate-600">
              Rank: {record.rank}/{record.totalStudents}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Progress',
      key: 'progress',
      render: (  record: ExamResult) => (
        <div>
          <Progress
            percent={record.percentage}
            size="small"
            strokeColor={record.percentage >= 90 ? '#10b981' : record.percentage >= 80 ? '#f59e0b' : '#ef4444'}
            className="modern-progress"
          />
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (  record: ExamResult) => (
        <Space>
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => {
                setSelectedExam(record);
                setIsResultModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Download Result">
            <Button type="text" icon={<DownloadOutlined />} size="small" />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const dateCellRender = (date: Dayjs) => {
    const dateStr = date.format('YYYY-MM-DD');
    const exam = exams.find(e => e.date === dateStr);

    if (!exam) return null;

    const statusColors = {
      upcoming: '#f59e0b',
      completed: '#10b981',
      ongoing: '#3b82f6',
      cancelled: '#ef4444',
    };

    return (
      <div className="flex justify-center">
        <div 
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: statusColors[exam.status] }}
        />
      </div>
    );
  };

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
          {/* Exam Alert */}
          <Alert
            message={
              <div className="flex items-center gap-2">
                <WarningOutlined className="text-blue-500" />
                <Text strong>Upcoming Examinations</Text>
              </div>
            }
            description={
              <div className="mt-2">
                <Text>You have {examStats.upcomingExams} upcoming exams this month. Make sure to prepare well and check the exam schedule.</Text>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Tag color="blue" icon={<CalendarOutlined />}>Next Exam: Jan 15</Tag>
                  <Tag color="green" icon={<TrophyOutlined />}>Average Score: {examStats.averageScore}%</Tag>
                  <Tag color="purple" icon={<StarOutlined />}>Current Rank: {examStats.currentRank}</Tag>
                </div>
              </div>
            }
            type="info"
            showIcon={false}
            className="modern-alert"
          />

          {/* Quick Stats */}
          <Row gutter={[16, 16]}>
            <Col xs={12} sm={6}>
              <Card className="stat-card modern-card text-center">
                <Statistic
                  title="Average Score"
                  value={examStats.averageScore}
                  precision={1}
                  suffix="%"
                  prefix={<TrophyOutlined className="text-yellow-500" />}
                  valueStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="stat-card modern-card text-center">
                <Statistic
                  title="Current Rank"
                  value={examStats.currentRank}
                  suffix={`/${examStats.totalStudents}`}
                  prefix={<StarOutlined className="text-blue-500" />}
                  valueStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="stat-card modern-card text-center">
                <Statistic
                  title="Upcoming Exams"
                  value={examStats.upcomingExams}
                  prefix={<ClockCircleOutlined className="text-orange-500" />}
                  valueStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="stat-card modern-card text-center">
                <Statistic
                  title="Pass Rate"
                  value={examStats.passRate}
                  suffix="%"
                  prefix={<CheckCircleOutlined className="text-green-500" />}
                  valueStyle={{ color: '#10b981', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Performance Overview */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={14}>
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <LineChartOutlined className="text-blue-500" />
                    <span>Subject Performance</span>
                    <Badge count={subjectPerformance.length} color="blue" />
                  </div>
                }
                className="modern-card h-full"
              >
                <div className="space-y-4">
                  {subjectPerformance.map((subject, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar size={36} icon={<BookOutlined />} className={`bg-${subject.color}-500`} />
                          <div>
                            <Text strong className="text-slate-900">{subject.subject}</Text>
                            <div className="flex items-center gap-2 mt-1">
                              <Tag color={getGradeColor(subject.grade)}>{subject.grade}</Tag>
                              <span className={`text-sm flex items-center gap-1 ${
                                subject.improvement > 0 ? 'text-green-600' : 
                                subject.improvement < 0 ? 'text-red-600' : 'text-slate-600'
                              }`}>
                                {subject.improvement > 0 ? <RiseOutlined /> : 
                                 subject.improvement < 0 ? <FallOutlined /> : null}
                                {subject.improvement !== 0 && `${Math.abs(subject.improvement)}%`}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-900">{subject.averageScore}%</div>
                          <Text className="text-xs text-slate-500">{subject.examCount} exams</Text>
                        </div>
                      </div>
                      <Progress
                        percent={subject.averageScore}
                        strokeColor={subject.averageScore >= 90 ? '#10b981' : subject.averageScore >= 80 ? '#f59e0b' : '#ef4444'}
                        className="modern-progress"
                      />
                      <div className="flex justify-between mt-2 text-xs text-slate-500">
                        <span>Highest: {subject.highestScore}%</span>
                        <span>Lowest: {subject.lowestScore}%</span>
                      </div>
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
                    <span>Recent Results</span>
                  </div>
                }
                className="modern-card h-full"
              >
                <Timeline
                  className="modern-timeline"
                  items={examResults.slice(0, 4).map((result, index) => ({
                    color: result.percentage >= 90 ? 'green' : result.percentage >= 80 ? 'blue' : 'orange',
                    dot: result.percentage >= 90 ? <TrophyOutlined /> : <CheckCircleOutlined />,
                    children: (
                      <div className="pb-3">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex-1">
                            <Text strong className="text-slate-900 block">{result.subject}</Text>
                            <Text className="text-xs text-slate-600">{result.examType}</Text>
                          </div>
                          <div className="text-right">
                            <Tag color={getGradeColor(result.grade)}>{result.grade}</Tag>
                            <div className="text-sm font-bold text-slate-900">{result.percentage}%</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span>{dayjs(result.date).format('MMM DD, YYYY')}</span>
                          {result.rank && <span>Rank: {result.rank}/{result.totalStudents}</span>}
                        </div>
                      </div>
                    ),
                  }))}
                />
              </Card>
            </Col>
          </Row>

          {/* Upcoming Exams */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <ThunderboltOutlined className="text-purple-500" />
                <span>Upcoming Exams</span>
                <Badge count={examStats.upcomingExams} color="purple" />
              </div>
            }
            className="modern-card"
          >
            <Row gutter={[16, 16]}>
              {exams.filter(exam => exam.status === 'upcoming').map((exam, index) => (
                <Col xs={24} sm={8} key={index}>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar size={36} icon={<BookOutlined />} className="bg-blue-500" />
                      <div className="flex-1">
                        <Text strong className="text-slate-900 block">{exam.subject}</Text>
                        <Text className="text-xs text-slate-600">{exam.examType}</Text>
                      </div>
                      <Tag color={getPriorityColor(exam.priority)} >
                        {exam.priority.toUpperCase()}
                      </Tag>
                    </div>
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <CalendarOutlined className="text-blue-500" />
                        <span>{dayjs(exam.date).format('MMM DD, YYYY')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClockCircleOutlined className="text-green-500" />
                        <span>{exam.time} ({exam.duration})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <EnvironmentOutlined className="text-red-500" />
                        <span>{exam.venue}</span>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </div>
      ),
    },
    {
      key: 'schedule',
      label: (
        <div className="flex items-center gap-2">
          <CalendarOutlined />
          <span>Exam Schedule</span>
          <Badge count={examStats.upcomingExams} color="blue" />
        </div>
      ),
      children: (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <Title level={4} className="!mb-1">Examination Schedule</Title>
              <Text className="text-slate-600">View all upcoming and completed exams</Text>
            </div>
            <Space>
              <Select
                defaultValue="current"
                style={{ width: 150 }}
                value={selectedPeriod}
                onChange={setSelectedPeriod}
              >
                <Option value="current">Current Semester</Option>
                <Option value="previous">Previous Semester</Option>
                <Option value="yearly">Full Year</Option>
              </Select>
              <Button icon={<FilterOutlined />}>Filter</Button>
            </Space>
          </div>

          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Card className="modern-card">
                <div className="overflow-x-auto">
                  <Table
                    columns={examColumns}
                    dataSource={exams}
                    pagination={false}
                    className="modern-table"
                    rowKey="key"
                    scroll={{ x: 1200 }}
                  />
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <CalendarOutlined className="text-blue-500" />
                    <span>Calendar View</span>
                  </div>
                }
                className="modern-card"
              >
                <div className="mb-4">
                  <Space size="large">
                    <Badge color="#f59e0b" text="Upcoming" />
                    <Badge color="#10b981" text="Completed" />
                    <Badge color="#3b82f6" text="Ongoing" />
                  </Space>
                </div>
                <Calendar
                  cellRender={dateCellRender}
                  value={selectedMonth}
                  onChange={setSelectedMonth}
                  fullscreen={false}
                  className="modern-calendar"
                />
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: 'results',
      label: (
        <div className="flex items-center gap-2">
          <FileTextOutlined />
          <span>Results</span>
          <Badge count={examResults.length} color="green" />
        </div>
      ),
      children: (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <Title level={4} className="!mb-1">Examination Results</Title>
              <Text className="text-slate-600">View your exam results and performance</Text>
            </div>
            <Space>
              <RangePicker />
              <Button icon={<DownloadOutlined />}>Export Results</Button>
            </Space>
          </div>

          <Card className="modern-card">
            <div className="overflow-x-auto">
              <Table
                columns={resultColumns}
                dataSource={examResults}
                pagination={{ pageSize: 10 }}
                className="modern-table"
                rowKey="key"
                scroll={{ x: 1000 }}
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
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <Title level={1} className="!text-white !mb-2 !text-2xl sm:!text-3xl">
                Examinations 📝
              </Title>
              <Paragraph className="!text-purple-100 !mb-0 text-sm sm:text-base">
                Track your exam schedule, results, and academic performance
              </Paragraph>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{examStats.averageScore}%</div>
                <div className="text-xs text-purple-200">Average Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{examStats.currentRank}</div>
                <div className="text-xs text-purple-200">Current Rank</div>
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

        {/* Result Details Modal */}
        <Modal
          title={
            <div className="flex items-center gap-2">
              <FileTextOutlined className="text-green-500" />
              <span>Exam Result Details</span>
            </div>
          }
          open={isResultModalVisible}
          onCancel={() => setIsResultModalVisible(false)}
          footer={[
            <Button key="download" icon={<DownloadOutlined />} className="modern-btn">
              Download Result
            </Button>,
            <Button key="print" icon={<PrinterOutlined />} className="modern-btn">
              Print Result
            </Button>,
            <Button 
              key="close" 
              type="primary"
              onClick={() => setIsResultModalVisible(false)}
              className="modern-btn modern-btn-primary"
            >
              Close
            </Button>,
          ]}
          width={700}
          className="modern-modal"
        >
          {selectedExam && (
            <div className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                <Progress
                  type="dashboard"
                  percent={selectedExam.percentage}
                  size={150}
                  strokeColor={{
                    '0%': '#10b981',
                    '100%': '#059669',
                  }}
                  format={(percent) => (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">{percent}%</div>
                      <div className="text-sm text-slate-600">Score</div>
                    </div>
                  )}
                />
              </div>

              <Descriptions column={2} bordered className="modern-descriptions">
                <Descriptions.Item label="Subject" span={2}>
                  <Text strong className="text-lg">{selectedExam.subject}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Exam Type">
                  {selectedExam.examType}
                </Descriptions.Item>
                <Descriptions.Item label="Date">
                  {dayjs(selectedExam.date).format('MMMM DD, YYYY')}
                </Descriptions.Item>
                <Descriptions.Item label="Marks Obtained">
                  <Text strong className="text-green-600">
                    {selectedExam.obtainedMarks}/{selectedExam.totalMarks}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="Percentage">
                  <Text strong className="text-blue-600">{selectedExam.percentage}%</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Grade">
                  <Tag color={getGradeColor(selectedExam.grade)} className="font-medium">
                    {selectedExam.grade}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Class Rank">
                  {selectedExam.rank && (
                    <Text strong>{selectedExam.rank} out of {selectedExam.totalStudents}</Text>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Instructor" span={2}>
                  {selectedExam.instructor}
                </Descriptions.Item>
                {selectedExam.feedback && (
                  <Descriptions.Item label="Instructor Feedback" span={2}>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <Text className="text-blue-800">{selectedExam.feedback}</Text>
                    </div>
                  </Descriptions.Item>
                )}
              </Descriptions>
            </div>
          )}
        </Modal>
      </div>
    </MainLayout>
  );
}