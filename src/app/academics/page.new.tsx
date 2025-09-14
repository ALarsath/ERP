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
  Button,
  Row,
  Col,
  Statistic,
} from 'antd';
import {
  BookOutlined,
  TrophyOutlined,
  LineChartOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface Course {
  key: string;
  subject: string;
  teacher: string;
  schedule: string;
  lastScore: number;
  progress: number;
  status: string;
}

interface Ranking {
  key: string;
  rank: number;
  name: string;
  class: string;
  totalMarks: number;
  percentage: number;
  trend: 'up' | 'down' | 'same';
}

interface SubjectProgress {
  subject: string;
  score: number;
  improvement: number;
}

interface PerformanceMetrics {
  overallScore: number;
  attendance: number;
  rankImprovement: number;
  subjectWiseProgress: SubjectProgress[];
}

export default function Academics() {
  const courses: Course[] = [
    {
      key: '1',
      subject: 'Mathematics',
      teacher: 'Dr. Sarah Johnson',
      schedule: 'Mon, Wed, Fri - 9:00 AM',
      lastScore: 92,
      progress: 85,
      status: 'Excellent',
    },
    {
      key: '2',
      subject: 'Physics',
      teacher: 'Mr. Robert Smith',
      schedule: 'Tue, Thu - 10:30 AM',
      lastScore: 88,
      progress: 78,
      status: 'Good',
    },
    {
      key: '3',
      subject: 'Chemistry',
      teacher: 'Mrs. Emily Brown',
      schedule: 'Mon, Wed - 11:45 AM',
      lastScore: 85,
      progress: 72,
      status: 'Good',
    },
    {
      key: '4',
      subject: 'Biology',
      teacher: 'Dr. Michael Davis',
      schedule: 'Tue, Thu - 2:15 PM',
      lastScore: 90,
      progress: 82,
      status: 'Excellent',
    },
    {
      key: '5',
      subject: 'English',
      teacher: 'Ms. Patricia Wilson',
      schedule: 'Mon, Fri - 1:00 PM',
      lastScore: 87,
      progress: 75,
      status: 'Good',
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
      name: 'Prassana Natarajan',
      class: 'X-A',
      totalMarks: 470,
      percentage: 94.0,
      trend: 'up',
    },
  ];

  const performanceMetrics: PerformanceMetrics = {
    overallScore: 88.5,
    attendance: 95,
    rankImprovement: 2,
    subjectWiseProgress: [
      { subject: 'Mathematics', score: 92, improvement: 3 },
      { subject: 'Physics', score: 88, improvement: 2 },
      { subject: 'Chemistry', score: 85, improvement: -1 },
      { subject: 'Biology', score: 90, improvement: 4 },
      { subject: 'English', score: 87, improvement: 1 },
    ],
  };

  const courseColumns = [
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (text: string) => <strong style={{ color: '#245501' }}>{text}</strong>,
    },
    {
      title: 'Teacher',
      dataIndex: 'teacher',
      key: 'teacher',
    },
    {
      title: 'Schedule',
      dataIndex: 'schedule',
      key: 'schedule',
    },
    {
      title: 'Last Score',
      dataIndex: 'lastScore',
      key: 'lastScore',
      render: (score: number) => (
        <Tag color={score >= 90 ? '#538D22' : '#73A942'}>{score}%</Tag>
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
      render: (status: string) => (
        <Tag color={status === 'Excellent' ? '#538D22' : '#73A942'}>{status}</Tag>
      ),
    },
  ];

  const rankingColumns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      render: (rank: number) => (
        <strong style={{ color: '#245501' }}>#{rank}</strong>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: 'Total Marks',
      dataIndex: 'totalMarks',
      key: 'totalMarks',
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (percentage: number) => (
        <Tag color="#538D22">{percentage}%</Tag>
      ),
    },
    {
      title: 'Trend',
      dataIndex: 'trend',
      key: 'trend',
      render: (trend: 'up' | 'down' | 'same') => (
        <span style={{ color: trend === 'up' ? '#538D22' : trend === 'down' ? '#ff4d4f' : '#8c8c8c' }}>
          {trend === 'up' ? <ArrowUpOutlined /> : trend === 'down' ? <ArrowDownOutlined /> : '-'}
        </span>
      ),
    },
  ];
  const items = [
    {
      key: 'courses',
      label: (
        <span>
          <BookOutlined />
          Courses
        </span>
      ),
      children: (
        <Card className="shadow-sm">
          <Table
            columns={courseColumns}
            dataSource={courses}
            pagination={false}
            className="w-full"
            rowKey="key"
          />
        </Card>
      ),
    },
    {
      key: 'rankings',
      label: (
        <span>
          <TrophyOutlined />
          Class Rankings
        </span>
      ),
      children: (
        <Card className="shadow-sm">
          <Row gutter={[16, 16]} className="mb-6">
            <Col span={8}>
              <Card variant="borderless">
                <Statistic
                  title="Current Rank"
                  value={3}
                  prefix="#"
                  valueStyle={{ color: '#538D22' }}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card variant="borderless">
                <Statistic
                  title="Percentile"
                  value={94.5}
                  suffix="%"
                  valueStyle={{ color: '#538D22' }}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card variant="borderless">
                <Statistic
                  title="Rank Improvement"
                  value={2}
                  prefix={<ArrowUpOutlined />}
                  valueStyle={{ color: '#538D22' }}
                />
              </Card>
            </Col>
          </Row>
          <Table
            columns={rankingColumns}
            dataSource={rankings}
            pagination={false}
            className="w-full"
            rowKey="key"
          />
        </Card>
      ),
    },
    {
      key: 'performance',
      label: (
        <span>
          <LineChartOutlined />
          Performance Analysis
        </span>
      ),
      children: (
        <Card className="shadow-sm">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card variant="borderless">
                <Statistic
                  title="Overall Score"
                  value={performanceMetrics.overallScore}
                  suffix="%"
                  valueStyle={{ color: '#538D22' }}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card variant="borderless">
                <Statistic
                  title="Attendance"
                  value={performanceMetrics.attendance}
                  suffix="%"
                  valueStyle={{ color: '#538D22' }}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card variant="borderless">
                <Statistic
                  title="Rank Improvement"
                  value={performanceMetrics.rankImprovement}
                  prefix={<ArrowUpOutlined />}
                  valueStyle={{ color: '#538D22' }}
                />
              </Card>
            </Col>
          </Row>

          <div className="mt-6">
            <Title level={5} style={{ color: '#245501' }}>Subject-wise Progress</Title>
            {performanceMetrics.subjectWiseProgress.map((subject, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-2">
                  <Text>{subject.subject}</Text>
                  <Space>
                    <Tag color="#538D22">{subject.score}%</Tag>
                    <span style={{ color: subject.improvement > 0 ? '#538D22' : '#ff4d4f' }}>
                      {subject.improvement > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                      {Math.abs(subject.improvement)}%
                    </span>
                  </Space>
                </div>
                <Progress
                  percent={subject.score}
                  strokeColor={{
                    '0%': '#538D22',
                    '100%': '#AAD576',
                  }}
                  size="small"
                />
              </div>
            ))}
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Title level={4} style={{ color: '#245501', margin: 0 }}>Academic Performance</Title>
      <Tabs 
        defaultActiveKey="courses" 
        type="card" 
        items={items}
      />
    </div>
  );
}
