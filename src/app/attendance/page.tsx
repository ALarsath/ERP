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
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CalendarOutlined,
  UnorderedListOutlined,
  BarChartOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

export default function Attendance() {
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const currentMonth = dayjs().format('MMMM YYYY');

  // Type definitions for attendance data
  type AttendanceStatus = 'present' | 'absent' | 'late';
  type CalendarData = {
    [key: string]: AttendanceStatus;
  };

  // Mock data for attendance
  const attendanceData: {
    overall: {
      present: number;
      absent: number;
      late: number;
      total_days: number;
      present_days: number;
      absent_days: number;
      late_days: number;
    };
    subjectWise: Array<{
      subject: string;
      present: number;
      absent: number;
      late: number;
      total: number;
    }>;
    calendarData: CalendarData;
  } = {
    overall: {
      present: 85,
      absent: 10,
      late: 5,
      total_days: 100,
      present_days: 85,
      absent_days: 10,
      late_days: 5,
    },
    subjectWise: [
      { subject: 'Mathematics', present: 90, absent: 8, late: 2, total: 100 },
      { subject: 'Physics', present: 88, absent: 10, late: 2, total: 100 },
      { subject: 'Chemistry', present: 85, absent: 12, late: 3, total: 100 },
      { subject: 'Biology', present: 87, absent: 9, late: 4, total: 100 },
      { subject: 'English', present: 89, absent: 8, late: 3, total: 100 },
    ],
    calendarData: {
      // Mock data for calendar view
      '2025-09-01': 'present',
      '2025-09-02': 'present',
      '2025-09-03': 'absent',
      '2025-09-04': 'present',
      '2025-09-05': 'late',
      '2025-09-08': 'present',
      '2025-09-09': 'present',
      '2025-09-10': 'present',
      '2025-09-11': 'present',
      // Add more dates as needed
    },
  };

  const subjectColumns = [
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (text: string) => <strong style={{ color: '#245501' }}>{text}</strong>,
    },
    {
      title: 'Present',
      dataIndex: 'present',
      key: 'present',
      render: (present: number, record: any) => (
        <Tag color="#538D22">{`${present}%`}</Tag>
      ),
    },
    {
      title: 'Absent',
      dataIndex: 'absent',
      key: 'absent',
      render: (absent: number) => (
        <Tag color="#ff4d4f">{`${absent}%`}</Tag>
      ),
    },
    {
      title: 'Late',
      dataIndex: 'late',
      key: 'late',
      render: (late: number) => (
        <Tag color="#faad14">{`${late}%`}</Tag>
      ),
    },
    {
      title: 'Attendance',
      key: 'attendance',
      render: (_: any, record: any) => (
        <Progress
          percent={record.present}
          size="small"
          strokeColor={{
            '0%': '#538D22',
            '100%': '#AAD576',
          }}
        />
      ),
    },
  ];

  const dateCellRender = (date: Dayjs) => {
    const dateStr = date.format('YYYY-MM-DD');
    const status = attendanceData.calendarData[dateStr];
    
    if (!status || !['present', 'absent', 'late'].includes(status)) return null;

    const statusColors = {
      present: '#538D22',
      absent: '#ff4d4f',
      late: '#faad14',
    };

    const statusIcons = {
      present: <CheckCircleOutlined style={{ color: statusColors.present }} />,
      absent: <CloseCircleOutlined style={{ color: statusColors.absent }} />,
      late: <ExclamationCircleOutlined style={{ color: statusColors.late }} />,
    };

    return (
      <div className="text-center">
        {statusIcons[status as keyof typeof statusIcons]}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Title level={4} style={{ color: '#245501', margin: 0 }}>Attendance Record</Title>
        <Space>
          <Select
            defaultValue="current"
            style={{ width: 200 }}
            onChange={(value) => console.log(value)}
          >
            <Option value="current">Current Semester</Option>
            <Option value="previous">Previous Semester</Option>
            <Option value="yearly">Yearly Overview</Option>
          </Select>
        </Space>
      </div>

      <Tabs 
        defaultActiveKey="overall" 
        type="card"
        items={[
          {
            key: 'overall',
            label: (
              <span>
                <BarChartOutlined />
                Overall Attendance
              </span>
            ),
            children: (
              <Card className="shadow-sm">
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={8}>
                    <Card variant="borderless">
                      <Statistic
                        title="Present"
                        value={attendanceData.overall.present}
                        suffix="%"
                        valueStyle={{ color: '#538D22' }}
                        prefix={<CheckCircleOutlined />}
                      />
                      <Text type="secondary">{attendanceData.overall.present_days} days</Text>
                    </Card>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Card variant="borderless">
                      <Statistic
                        title="Absent"
                        value={attendanceData.overall.absent}
                        suffix="%"
                        valueStyle={{ color: '#ff4d4f' }}
                        prefix={<CloseCircleOutlined />}
                      />
                      <Text type="secondary">{attendanceData.overall.absent_days} days</Text>
                    </Card>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Card variant="borderless">
                      <Statistic
                        title="Late"
                        value={attendanceData.overall.late}
                        suffix="%"
                        valueStyle={{ color: '#faad14' }}
                        prefix={<ExclamationCircleOutlined />}
                      />
                      <Text type="secondary">{attendanceData.overall.late_days} days</Text>
                    </Card>
                  </Col>
                </Row>

                <div className="mt-6">
                  <Progress
                    percent={attendanceData.overall.present}
                    success={{ percent: attendanceData.overall.late }}
                    type="dashboard"
                    strokeColor={{
                      '0%': '#538D22',
                      '100%': '#AAD576'
                    }}
                    width={180}
                  />
                  <div className="mt-4">
                    <Space>
                      <Badge color="#538D22" text="Present" />
                      <Badge color="#ff4d4f" text="Absent" />
                      <Badge color="#faad14" text="Late" />
                    </Space>
                  </div>
                </div>
              </Card>
            )
          },
          {
            key: 'subject-wise',
            label: (
              <span>
                <UnorderedListOutlined />
                Subject-wise
              </span>
            ),
            children: (
              <Card className="shadow-sm">
                <Table
                  columns={subjectColumns}
                  dataSource={attendanceData.subjectWise}
                  pagination={false}
                  className="w-full"
                  rowKey="subject"
                />
              </Card>
            )
          },
          {
            key: 'calendar',
            label: (
              <span>
                <CalendarOutlined />
                Calendar View
              </span>
            ),
            children: (
              <Card className="shadow-sm">
                <div className="mb-4">
                  <Space>
                    <Badge color="#538D22" text="Present" />
                    <Badge color="#ff4d4f" text="Absent" />
                    <Badge color="#faad14" text="Late" />
                  </Space>
                </div>
                <Calendar
                  cellRender={(date) => dateCellRender(date)}
                  value={selectedMonth}
                  onChange={setSelectedMonth}
                  className="attendance-calendar"
                />
              </Card>
            )
          }
        ]}
      />
    </div>
  );
}
