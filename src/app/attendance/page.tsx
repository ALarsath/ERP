'use client';
import { useState } from 'react';
import {
  Card,
  Typography,
  Tabs,
  Calendar,
  Badge,
  Table,
  Progress,
  Statistic,
  Row,
  Col,
  Select,
  Tag,
  Space,
  Button,
  Alert,
  Timeline,
  Avatar,  
  Tooltip, 
  DatePicker,
  Modal,
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CalendarOutlined,
  UnorderedListOutlined,
  BarChartOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  WarningOutlined,
  BookOutlined,
  UserOutlined,
  FireOutlined,
  ThunderboltOutlined,
  StarOutlined,
  EyeOutlined,
  DownloadOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

export default function Attendance() {
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [activeTab, setActiveTab] = useState('overview');
  const [warningModalVisible, setWarningModalVisible] = useState(false);

  // Warning data
  const warningData = {
    totalWarnings: 3, // Maximum warnings before block
    currentWarnings: [
      {
        date: '2025-01-10',
        reason: 'Indiscipline activities - Disrupting class',
        issuedBy: 'Dr. Sarah Johnson',
        severity: 'high'
      },
      {
        date: '2025-01-05',
        reason: 'Improper haircut - Not following dress code',
        issuedBy: 'Mr. Robert Smith',
        severity: 'medium'
      },
      {
        date: '2024-12-20',
        reason: 'Late arrival - Multiple instances',
        issuedBy: 'Mrs. Emily Brown',
        severity: 'high'
      }
    ]
  };

  const isAttendanceBlocked = warningData.currentWarnings.length >= warningData.totalWarnings;

  // Enhanced attendance data with more details
  const attendanceData = {
    overall: {
      present: 92,
      absent: 5,
      late: 3,
      totalDays: 120,
      presentDays: 110,
      absentDays: 6,
      lateDays: 4,
      streak: 15, // Current attendance streak
      bestStreak: 45,
      attendanceGoal: 95,
    },
    subjectWise: [
      { 
        subject: 'Advanced Mathematics', 
        teacher: 'Dr. Sarah Johnson',
        present: 94, 
        absent: 4, 
        late: 2, 
        total: 100,
        totalClasses: 48,
        presentClasses: 45,
        absentClasses: 2,
        lateClasses: 1,
        nextClass: '2025-01-15 09:00',
      },
      { 
        subject: 'Physics', 
        teacher: 'Mr. Robert Smith',
        present: 90, 
        absent: 7, 
        late: 3, 
        total: 100,
        totalClasses: 42,
        presentClasses: 38,
        absentClasses: 3,
        lateClasses: 1,
        nextClass: '2025-01-15 10:30',
      },
      { 
        subject: 'Chemistry', 
        teacher: 'Mrs. Emily Brown',
        present: 88, 
        absent: 8, 
        late: 4, 
        total: 100,
        totalClasses: 40,
        presentClasses: 35,
        absentClasses: 3,
        lateClasses: 2,
        nextClass: '2025-01-15 11:45',
      },
      { 
        subject: 'Biology', 
        teacher: 'Dr. Michael Davis',
        present: 95, 
        absent: 3, 
        late: 2, 
        total: 100,
        totalClasses: 38,
        presentClasses: 36,
        absentClasses: 1,
        lateClasses: 1,
        nextClass: '2025-01-15 14:15',
      },
      { 
        subject: 'English Literature', 
        teacher: 'Ms. Patricia Wilson',
        present: 93, 
        absent: 5, 
        late: 2, 
        total: 100,
        totalClasses: 36,
        presentClasses: 33,
        absentClasses: 2,
        lateClasses: 1,
        nextClass: '2025-01-15 13:00',
      },
    ],
    calendarData: {
      '2025-01-01': 'present',
      '2025-01-02': 'present',
      '2025-01-03': 'absent',
      '2025-01-04': 'present',
      '2025-01-05': 'late',
      '2025-01-08': 'present',
      '2025-01-09': 'present',
      '2025-01-10': 'present',
      '2025-01-11': 'present',
      '2025-01-12': 'present',
      '2025-01-13': 'late',
      '2025-01-14': 'present',
    } as Record<string, string>,
    recentActivity: [
      {
        date: '2025-01-14',
        time: '09:00 AM',
        subject: 'Mathematics',
        status: 'present',
        teacher: 'Dr. Sarah Johnson',
        duration: '60 min',
      },
      {
        date: '2025-01-14',
        time: '10:30 AM',
        subject: 'Physics',
        status: 'present',
        teacher: 'Mr. Robert Smith',
        duration: '60 min',
      },
      {
        date: '2025-01-13',
        time: '11:45 AM',
        subject: 'Chemistry',
        status: 'late',
        teacher: 'Mrs. Emily Brown',
        duration: '45 min',
        note: 'Arrived 15 minutes late',
      },
      {
        date: '2025-01-13',
        time: '09:00 AM',
        subject: 'Mathematics',
        status: 'present',
        teacher: 'Dr. Sarah Johnson',
        duration: '60 min',
      },
    ],
    upcomingClasses: [
      {
        subject: 'Mathematics',
        teacher: 'Dr. Sarah Johnson',
        time: '09:00 AM',
        date: '2025-01-15',
        room: 'Room 201',
        type: 'Regular Class',
      },
      {
        subject: 'Physics',
        teacher: 'Mr. Robert Smith',
        time: '10:30 AM',
        date: '2025-01-15',
        room: 'Lab 301',
        type: 'Lab Session',
      },
      {
        subject: 'Chemistry',
        teacher: 'Mrs. Emily Brown',
        time: '11:45 AM',
        date: '2025-01-15',
        room: 'Lab 205',
        type: 'Practical',
      },
    ],
  };

  const getAttendanceStatus = (percentage: number) => {
    if (percentage >= 95) return { status: 'excellent', color: 'success' };
    if (percentage >= 85) return { status: 'good', color: 'processing' };
    if (percentage >= 75) return { status: 'average', color: 'warning' };
    return { status: 'poor', color: 'error' };
  };

  const subjectColumns = [
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (text: string, record: any) => (
        <div className="flex items-center gap-3">
          <Avatar size={40} icon={<BookOutlined />} className="bg-blue-500" />
          <div>
            <Text strong className="text-slate-900 block">{text}</Text>
            <Text className="text-xs text-slate-500">{record.teacher}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Classes',
      key: 'classes',
      render: (   record: any) => (
        <div className="text-center">
          <div className="text-lg font-bold text-slate-900">{record.presentClasses}/{record.totalClasses}</div>
          <Text className="text-xs text-slate-500">Attended</Text>
        </div>
      ),
    },
    {
      title: 'Attendance Rate',
      dataIndex: 'present',
      key: 'present',
      render: (present: number) => {
        const { status, color } = getAttendanceStatus(present);
        return (
          <div className="text-center">
            <div className="text-lg font-bold text-slate-900 mb-1">{present}%</div>
            <Tag color={color} className="capitalize">{status}</Tag>
          </div>
        );
      },
    },
    {
      title: 'Progress',
      key: 'progress',
      render: (   record: any) => (
        <div>
          <div className="flex justify-between mb-1">
            <Text className="text-xs text-slate-600">Present</Text>
            <Text className="text-xs font-medium">{record.present}%</Text>
          </div>
          <Progress
            percent={record.present}
            size="small"
            strokeColor={record.present >= 90 ? '#10b981' : record.present >= 80 ? '#f59e0b' : '#ef4444'}
            className="modern-progress"
          />
          <div className="flex justify-between mt-1 text-xs text-slate-500">
            <span>Absent: {record.absent}%</span>
            <span>Late: {record.late}%</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Next Class',
      key: 'nextClass',
      render: (   record: any) => (
        <div className="text-center">
          <div className="flex items-center gap-1 justify-center mb-1">
            <ClockCircleOutlined className="text-blue-500" />
            <Text className="text-sm font-medium">{dayjs(record.nextClass).format('MMM DD')}</Text>
          </div>
          <Text className="text-xs text-slate-500">{dayjs(record.nextClass).format('HH:mm A')}</Text>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Tooltip title="View Details">
            <Button type="text" icon={<EyeOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Download Report">
            <Button type="text" icon={<DownloadOutlined />} size="small" />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const dateCellRender = (date: Dayjs) => {
    const dateStr = date.format('YYYY-MM-DD');
    const status = attendanceData.calendarData[dateStr];
    
    if (!status) return null;

    const statusConfig = {
      present: { color: '#10b981', icon: CheckCircleOutlined },
      absent: { color: '#ef4444', icon: CloseCircleOutlined },
      late: { color: '#f59e0b', icon: ExclamationCircleOutlined },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    if (!config) return null;

    const IconComponent = config.icon;

    return (
      <div className="flex justify-center">
        <div 
          className="w-6 h-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: config.color + '20' }}
        >
          <IconComponent style={{ color: config.color, fontSize: '12px' }} />
        </div>
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
          {/* Attendance Alert */}
          <Alert
            message={
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FireOutlined className={isAttendanceBlocked ? "text-red-500" : "text-green-500"} />
                  <Text strong>{isAttendanceBlocked ? "Attendance Blocked!" : "Excellent Attendance Record!"}</Text>
                </div>
                {isAttendanceBlocked && (
                  <Tag 
                    color="error" 
                    icon={<WarningOutlined />} 
                    className="cursor-pointer animate-pulse"
                    onClick={() => setWarningModalVisible(true)}
                  >
                    BLOCKED
                  </Tag>
                )}
              </div>
            }
            description={
              <div className="mt-2">
                <Text>
                  {isAttendanceBlocked 
                    ? "Your attendance has been blocked due to multiple warnings. Click the BLOCKED label to view details."
                    : "You're maintaining great attendance with 92% overall rate. Keep up the good work!"
                  }
                </Text>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Tag color="green" icon={<CheckCircleOutlined />}>Current Streak: {attendanceData.overall.streak} days</Tag>
                  <Tag color="blue" icon={<TrophyOutlined />}>Best Streak: {attendanceData.overall.bestStreak} days</Tag>
                  <Tag color="purple" icon={<StarOutlined />}>Goal: {attendanceData.overall.attendanceGoal}%</Tag>
                  {warningData.currentWarnings.length > 0 && (
                    <Tag 
                      color="warning" 
                      icon={<WarningOutlined />}
                      onClick={() => setWarningModalVisible(true)}
                      className="cursor-pointer"
                    >
                      Warnings: {warningData.currentWarnings.length}/{warningData.totalWarnings}
                    </Tag>
                  )}
                </div>
              </div>
            }
            type={isAttendanceBlocked ? "error" : "success"}
            showIcon={false}
            className="modern-alert"
          />

          {/* Warning Modal */}
          <Modal
            title={
              <div className="flex items-center gap-2">
                <WarningOutlined className="text-red-500" />
                <span>{isAttendanceBlocked ? "Attendance Blocked - Warning Details" : "Warning Details"}</span>
              </div>
            }
            open={warningModalVisible}
            onCancel={() => setWarningModalVisible(false)}
            footer={[
              <Button key="close" onClick={() => setWarningModalVisible(false)}>
                Close
              </Button>
            ]}
          >
            <div className="space-y-4">
              {isAttendanceBlocked && (
                <Alert
                  message="Attendance Blocked"
                  description="Your attendance has been blocked due to accumulating 3 warnings. Please contact your advisor or the administration office for resolution."
                  type="error"
                  showIcon
                  className="mb-4"
                />
              )}
              
              <Timeline
                items={warningData.currentWarnings.map((warning, index) => ({
                  color: warning.severity === 'high' ? 'red' : 'orange',
                  children: (
                    <div>
                      <div className="flex justify-between items-start">
                        <Text strong>{warning.reason}</Text>
                        <Tag color={warning.severity === 'high' ? 'error' : 'warning'}>
                          {warning.severity.toUpperCase()}
                        </Tag>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        <div>Issued by: {warning.issuedBy}</div>
                        <div>Date: {warning.date}</div>
                      </div>
                    </div>
                  ),
                }))}
              />
            </div>
          </Modal>

          {/* Quick Stats */}
          <Row gutter={[16, 16]}>
            <Col xs={12} sm={6}>
              <Card className="stat-card modern-card text-center">
                <Statistic
                  title="Overall Rate"
                  value={attendanceData.overall.present}
                  suffix="%"
                  prefix={<CheckCircleOutlined className="text-green-500" />}
                  valueStyle={{ color: '#10b981', fontWeight: 'bold' }}
                />
                <Progress
                  percent={attendanceData.overall.present}
                  size="small"
                  showInfo={false}
                  strokeColor="#10b981"
                  className="mt-2 modern-progress"
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="stat-card modern-card text-center">
                <Statistic
                  title="Present Days"
                  value={attendanceData.overall.presentDays}
                  suffix={`/${attendanceData.overall.totalDays}`}
                  prefix={<CalendarOutlined className="text-blue-500" />}
                  valueStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="stat-card modern-card text-center">
                <Statistic
                  title="Current Streak"
                  value={attendanceData.overall.streak}
                  suffix="days"
                  prefix={<FireOutlined className="text-orange-500" />}
                  valueStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="stat-card modern-card text-center">
                <Statistic
                  title="Best Streak"
                  value={attendanceData.overall.bestStreak}
                  suffix="days"
                  prefix={<TrophyOutlined className="text-purple-500" />}
                  valueStyle={{ color: '#8b5cf6', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Attendance Breakdown */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <BarChartOutlined className="text-blue-500" />
                    <span>Attendance Breakdown</span>
                  </div>
                }
                className="modern-card h-full"
              >
                <Row gutter={[16, 16]} className="mb-6">
                  <Col xs={24} sm={8}>
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <CheckCircleOutlined className="text-3xl text-green-500 mb-2" />
                      <div className="text-2xl font-bold text-green-700">{attendanceData.overall.presentDays}</div>
                      <Text className="text-green-600">Present Days</Text>
                      <div className="text-sm text-green-500 mt-1">{attendanceData.overall.present}%</div>
                    </div>
                  </Col>
                  <Col xs={24} sm={8}>
                    <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                      <CloseCircleOutlined className="text-3xl text-red-500 mb-2" />
                      <div className="text-2xl font-bold text-red-700">{attendanceData.overall.absentDays}</div>
                      <Text className="text-red-600">Absent Days</Text>
                      <div className="text-sm text-red-500 mt-1">{attendanceData.overall.absent}%</div>
                    </div>
                  </Col>
                  <Col xs={24} sm={8}>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <ExclamationCircleOutlined className="text-3xl text-yellow-500 mb-2" />
                      <div className="text-2xl font-bold text-yellow-700">{attendanceData.overall.lateDays}</div>
                      <Text className="text-yellow-600">Late Days</Text>
                      <div className="text-sm text-yellow-500 mt-1">{attendanceData.overall.late}%</div>
                    </div>
                  </Col>
                </Row>

                <div className="text-center">
                  <Progress
                    type="dashboard"
                    percent={attendanceData.overall.present}
                    size={200}
                    strokeColor={{
                      '0%': '#10b981',
                      '100%': '#059669',
                    }}
                    format={(percent) => (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">{percent}%</div>
                        <div className="text-sm text-slate-600">Overall</div>
                      </div>
                    )}
                  />
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <ClockCircleOutlined className="text-green-500" />
                    <span>Recent Activity</span>
                  </div>
                }
                className="modern-card h-full"
              >
                <Timeline
                  className="modern-timeline"
                  items={attendanceData.recentActivity.slice(0, 4).map((activity, index) => ({
                    color: activity.status === 'present' ? 'green' : activity.status === 'late' ? 'orange' : 'red',
                    dot: activity.status === 'present' ? <CheckCircleOutlined /> : 
                         activity.status === 'late' ? <ExclamationCircleOutlined /> : <CloseCircleOutlined />,
                    children: (
                      <div className="pb-3">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex-1">
                            <Text strong className="text-slate-900 block">{activity.subject}</Text>
                            <Text className="text-xs text-slate-600">{activity.teacher}</Text>
                          </div>
                          <Tag 
                            color={activity.status === 'present' ? 'success' : activity.status === 'late' ? 'warning' : 'error'}
                            className="ml-2 capitalize"
                          >
                            {activity.status}
                          </Tag>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span>{activity.date}</span>
                          <span>{activity.time}</span>
                          <span>{activity.duration}</span>
                        </div>
                        {activity.note && (
                          <Text className="text-xs text-orange-600 block mt-1">{activity.note}</Text>
                        )}
                      </div>
                    ),
                  }))}
                />
              </Card>
            </Col>
          </Row>

          {/* Upcoming Classes */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <ThunderboltOutlined className="text-purple-500" />
                <span>Upcoming Classes</span>
                <Badge count={attendanceData.upcomingClasses.length} color="purple" />
              </div>
            }
            className="modern-card"
          >
            <Row gutter={[16, 16]}>
              {attendanceData.upcomingClasses.map((classItem, index) => (
                <Col xs={24} sm={8} key={index}>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar size={36} icon={<BookOutlined />} className="bg-purple-500" />
                      <div className="flex-1">
                        <Text strong className="text-slate-900 block">{classItem.subject}</Text>
                        <Text className="text-xs text-slate-600">{classItem.teacher}</Text>
                      </div>
                      <Tag color="purple" >{classItem.type}</Tag>
                    </div>
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <CalendarOutlined className="text-blue-500" />
                        <span>{dayjs(classItem.date).format('MMM DD, YYYY')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClockCircleOutlined className="text-green-500" />
                        <span>{classItem.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserOutlined className="text-purple-500" />
                        <span>{classItem.room}</span>
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
      key: 'subject-wise',
      label: (
        <div className="flex items-center gap-2">
          <UnorderedListOutlined />
          <span>Subject-wise</span>
          <Badge count={attendanceData.subjectWise.length} color="blue" />
        </div>
      ),
      children: (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <Title level={4} className="!mb-1">Subject-wise Attendance</Title>
              <Text className="text-slate-600">Detailed attendance breakdown by subject</Text>
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

          <Card className="modern-card">
            <div className="overflow-x-auto">
              <Table
                columns={subjectColumns}
                dataSource={attendanceData.subjectWise}
                pagination={false}
                className="modern-table"
                rowKey="subject"
                scroll={{ x: 1000 }}
              />
            </div>
          </Card>
        </div>
      ),
    },
    {
      key: 'calendar',
      label: (
        <div className="flex items-center gap-2">
          <CalendarOutlined />
          <span>Calendar View</span>
        </div>
      ),
      children: (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <Title level={4} className="!mb-1">Attendance Calendar</Title>
              <Text className="text-slate-600">Visual representation of your daily attendance</Text>
            </div>
            <Space>
              <RangePicker />
              <Button icon={<DownloadOutlined />}>Export</Button>
            </Space>
          </div>

          <Card className="modern-card">
            <div className="mb-4">
              <Space size="large">
                <Badge color="#10b981" text="Present" />
                <Badge color="#ef4444" text="Absent" />
                <Badge color="#f59e0b" text="Late" />
              </Space>
            </div>
            <Calendar
              cellRender={dateCellRender}
              value={selectedMonth}
              onChange={setSelectedMonth}
              className="modern-calendar"
            />
          </Card>
        </div>
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
                Attendance Record 📅
              </Title>
              <Paragraph className="!text-green-100 !mb-0 text-sm sm:text-base">
                Track your class attendance and maintain consistency
              </Paragraph>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{attendanceData.overall.present}%</div>
                <div className="text-xs text-green-200">Overall Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{attendanceData.overall.streak}</div>
                <div className="text-xs text-green-200">Current Streak</div>
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