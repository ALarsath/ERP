'use client';
import { useState } from 'react';
import {
  Card,
  Typography,
  Table,
  Tag,
  Space,
  Button,
  Tabs,
  Statistic,
  Row,
  Col,
  Progress,
  Modal,
  Form,
  Input,
  Select,
  Descriptions,
  Alert,
  Timeline,
  Avatar,
  Tooltip,
  Badge,
  DatePicker,
  Divider,
} from 'antd';
import {
  DollarOutlined,
  HistoryOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  PrinterOutlined,
  CreditCardOutlined,
  BankOutlined,
  WalletOutlined,
  DownloadOutlined,
  CalendarOutlined,
  StarOutlined,
  FireOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  WarningOutlined,
  UserOutlined,
  EyeOutlined,
  FilterOutlined,
  PayCircleOutlined,
  BookOutlined,
} from '@ant-design/icons';
import MainLayout from '@/components/layout/MainLayout';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface FeeDetail {
  key: string;
  feeType: string;
  category: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue' | 'partial';
  paidAmount: number;
  remainingAmount: number;
  installments?: number;
  currentInstallment?: number;
  lateFee?: number;
  discount?: number;
}

interface PaymentHistory {
  key: string;
  date: string;
  receiptNo: string;
  amount: number;
  mode: string;
  status: string;
  description: string;
  transactionId: string;
  feeType: string;
}

interface FeeSummary {
  totalFees: number;
  paidAmount: number;
  pendingAmount: number;
  overdueAmount: number;
  nextDueDate: string;
  lastPaymentDate: string;
  lastPaymentAmount: number;
  totalDiscount: number;
  totalLateFee: number;
  paymentStreak: number;
}

interface UpcomingPayment {
  feeType: string;
  amount: number;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

export default function Fees() {
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [selectedFee, setSelectedFee] = useState<FeeDetail | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  // Enhanced fee details with more information
  const feeDetails: FeeDetail[] = [
    {
      key: '1',
      feeType: 'Tuition Fee',
      category: 'Academic',
      amount: 120000,
      dueDate: '2025-01-30',
      status: 'partial',
      paidAmount: 60000,
      remainingAmount: 60000,
      installments: 4,
      currentInstallment: 2,
      discount: 5000,
    },
    {
      key: '2',
      feeType: 'Laboratory Fee',
      category: 'Academic',
      amount: 25000,
      dueDate: '2025-01-15',
      status: 'overdue',
      paidAmount: 15000,
      remainingAmount: 10000,
      lateFee: 500,
    },
    {
      key: '3',
      feeType: 'Library Fee',
      category: 'Facility',
      amount: 8000,
      dueDate: '2025-02-01',
      status: 'paid',
      paidAmount: 8000,
      remainingAmount: 0,
    },
    {
      key: '4',
      feeType: 'Sports Fee',
      category: 'Activity',
      amount: 12000,
      dueDate: '2025-01-25',
      status: 'pending',
      paidAmount: 0,
      remainingAmount: 12000,
    },
    {
      key: '5',
      feeType: 'Examination Fee',
      category: 'Academic',
      amount: 15000,
      dueDate: '2025-02-15',
      status: 'pending',
      paidAmount: 0,
      remainingAmount: 15000,
    },
  ];

  // Enhanced payment history
  const paymentHistory: PaymentHistory[] = [
    {
      key: '1',
      date: '2025-01-10',
      receiptNo: 'REC2025001',
      amount: 60000,
      mode: 'Online Banking',
      status: 'success',
      description: 'Tuition Fee - Second Installment',
      transactionId: 'TXN123456789',
      feeType: 'Tuition Fee',
    },
    {
      key: '2',
      date: '2025-01-05',
      receiptNo: 'REC2025002',
      amount: 15000,
      mode: 'Credit Card',
      status: 'success',
      description: 'Laboratory Fee - Partial Payment',
      transactionId: 'TXN987654321',
      feeType: 'Laboratory Fee',
    },
    {
      key: '3',
      date: '2024-12-20',
      receiptNo: 'REC2024089',
      amount: 8000,
      mode: 'UPI',
      status: 'success',
      description: 'Library Fee - Full Payment',
      transactionId: 'TXN456789123',
      feeType: 'Library Fee',
    },
    {
      key: '4',
      date: '2024-12-15',
      receiptNo: 'REC2024088',
      amount: 60000,
      mode: 'Online Banking',
      status: 'success',
      description: 'Tuition Fee - First Installment',
      transactionId: 'TXN789123456',
      feeType: 'Tuition Fee',
    },
  ];

  // Enhanced fee summary
  const feeSummary: FeeSummary = {
    totalFees: 180000,
    paidAmount: 143000,
    pendingAmount: 37000,
    overdueAmount: 10500,
    nextDueDate: '2025-01-15',
    lastPaymentDate: '2025-01-10',
    lastPaymentAmount: 60000,
    totalDiscount: 5000,
    totalLateFee: 500,
    paymentStreak: 8,
  };

  const upcomingPayments: UpcomingPayment[] = [
    {
      feeType: 'Laboratory Fee (Overdue)',
      amount: 10500,
      dueDate: '2025-01-15',
      priority: 'high',
      category: 'Academic',
    },
    {
      feeType: 'Sports Fee',
      amount: 12000,
      dueDate: '2025-01-25',
      priority: 'medium',
      category: 'Activity',
    },
    {
      feeType: 'Tuition Fee (3rd Installment)',
      amount: 60000,
      dueDate: '2025-02-28',
      priority: 'high',
      category: 'Academic',
    },
  ];

  const handlePayment = (record: FeeDetail) => {
    setSelectedFee(record);
    setIsPaymentModalVisible(true);
  };

  const handlePaymentSubmit = (values: any) => {
    console.log('Payment submitted:', values);
    setIsPaymentModalVisible(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'partial': return 'processing';
      case 'pending': return 'warning';
      case 'overdue': return 'error';
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Academic': return <BookOutlined />;
      case 'Facility': return <BankOutlined />;
      case 'Activity': return <TrophyOutlined />;
      default: return <DollarOutlined />;
    }
  };

  const feeColumns = [
    {
      title: 'Fee Details',
      key: 'feeDetails',
      render: (_: FeeDetail, record: FeeDetail) => (
        <div className="flex items-center gap-3">
          <Avatar size={40} icon={getCategoryIcon(record.category)} className="bg-blue-500" />
          <div>
            <Text strong className="text-slate-900 block">{record.feeType}</Text>
            <div className="flex items-center gap-2">
              <Tag color="blue" >{record.category}</Tag>
              {record.installments && (
                <Tag color="purple" >
                  {record.currentInstallment}/{record.installments} Installments
                </Tag>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Amount Details',
      key: 'amounts',
      render: ( record: FeeDetail) => (
        <div className="text-center">
          <div className="text-lg font-bold text-slate-900">₹{record.amount.toLocaleString()}</div>
          <div className="text-sm text-slate-600">
            <div>Paid: ₹{record.paidAmount.toLocaleString()}</div>
            <div className="text-red-600">Due: ₹{record.remainingAmount.toLocaleString()}</div>
          </div>
          {record.discount && (
            <Tag color="green"  >Discount: ₹{record.discount}</Tag>
          )}
          {record.lateFee && (
            <Tag color="red"  >Late Fee: ₹{record.lateFee}</Tag>
          )}
        </div>
      ),
    },
    {
      title: 'Progress',
      key: 'progress',
      render: ( record: FeeDetail) => (
        <div>
          <div className="flex justify-between mb-1">
            <Text className="text-xs text-slate-600">Payment Progress</Text>
            <Text className="text-xs font-medium">
              {Math.round((record.paidAmount / record.amount) * 100)}%
            </Text>
          </div>
          <Progress
            percent={Math.round((record.paidAmount / record.amount) * 100)}
             
            strokeColor={record.status === 'paid' ? '#10b981' : record.status === 'overdue' ? '#ef4444' : '#f59e0b'}
            className="modern-progress"
          />
        </div>
      ),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date: string, record: FeeDetail) => (
        <div className="text-center">
          <div className="flex items-center gap-1 justify-center mb-1">
            <CalendarOutlined className={record.status === 'overdue' ? 'text-red-500' : 'text-blue-500'} />
            <Text className={`text-sm font-medium ${record.status === 'overdue' ? 'text-red-600' : ''}`}>
              {dayjs(date).format('MMM DD, YYYY')}
            </Text>
          </div>
          {record.status === 'overdue' && (
            <Tag color="red"  >
              {dayjs().diff(dayjs(date), 'days')} days overdue
            </Tag>
          )}
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
            {status === 'partial' ? 'Partially Paid' : status.toUpperCase()}
          </Tag>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: ( record: FeeDetail) => (
        <Space direction="vertical"  >
          <Button
            type="primary"
            icon={<PayCircleOutlined />}
            onClick={() => handlePayment(record)}
            disabled={record.status === 'paid'}
            className="modern-btn modern-btn-primary w-full"
             
          >
            {record.status === 'paid' ? 'Paid' : 'Pay Now'}
          </Button>
          <Space  >
            <Tooltip title="View Details">
              <Button type="text" icon={<EyeOutlined />}   />
            </Tooltip>
            <Tooltip title="Download Receipt">
              <Button type="text" icon={<DownloadOutlined />}   />
            </Tooltip>
          </Space>
        </Space>
      ),
    },
  ];

  const historyColumns = [
    {
      title: 'Payment Details',
      key: 'paymentDetails',
      render: ( record: PaymentHistory) => (
        <div className="flex items-center gap-3">
          <Avatar size={36} icon={<PayCircleOutlined />} className="bg-green-500" />
          <div>
            <Text strong className="text-slate-900 block">{record.receiptNo}</Text>
            <Text className="text-xs text-slate-600">{record.feeType}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Date & Time',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => (
        <div>
          <div className="font-medium text-slate-900">{dayjs(date).format('MMM DD, YYYY')}</div>
          <div className="text-xs text-slate-500">{dayjs(date).format('hh:mm A')}</div>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => (
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">₹{amount.toLocaleString()}</div>
        </div>
      ),
    },
    {
      title: 'Payment Method',
      dataIndex: 'mode',
      key: 'mode',
      render: (mode: string) => {
        const getIcon = () => {
          if (mode.includes('Card')) return <CreditCardOutlined />;
          if (mode.includes('Bank')) return <BankOutlined />;
          if (mode.includes('UPI')) return <WalletOutlined />;
          return <DollarOutlined />;
        };
        
        return (
          <div className="flex items-center gap-2">
            {getIcon()}
            <Text className="text-slate-700">{mode}</Text>
          </div>
        );
      },
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
      render: (id: string) => (
        <Text className="text-xs text-slate-600 font-mono">{id}</Text>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color="success" icon={<CheckCircleOutlined />}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Tooltip title="Download Receipt">
            <Button type="text" icon={<DownloadOutlined />}   />
          </Tooltip>
          <Tooltip title="Print Receipt">
            <Button type="text" icon={<PrinterOutlined />}   />
          </Tooltip>
        </Space>
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
          {/* Fee Alert */}
          <Alert
            message={
              <div className="flex items-center gap-2">
                <WarningOutlined className="text-orange-500" />
                <Text strong>Payment Reminder</Text>
              </div>
            }
            description={
              <div className="mt-2">
                <Text>You have ₹{feeSummary.overdueAmount.toLocaleString()} in overdue payments. Please make payment to avoid additional late fees.</Text>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Tag color="red" icon={<ExclamationCircleOutlined />}>Overdue: ₹{feeSummary.overdueAmount.toLocaleString()}</Tag>
                  <Tag color="orange" icon={<ClockCircleOutlined />}>Pending: ₹{feeSummary.pendingAmount.toLocaleString()}</Tag>
                  <Tag color="green" icon={<TrophyOutlined />}>Payment Streak: {feeSummary.paymentStreak} months</Tag>
                </div>
              </div>
            }
            type="warning"
            showIcon={false}
            className="modern-alert"
          />

          {/* Quick Stats */}
          <Row gutter={[16, 16]}>
            <Col xs={12} sm={6}>
              <Card className="stat-card modern-card text-center">
                <Statistic
                  title="Total Fees"
                  value={feeSummary.totalFees}
                  prefix="₹"
                  valueStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="stat-card modern-card text-center">
                <Statistic
                  title="Paid Amount"
                  value={feeSummary.paidAmount}
                  prefix="₹"
                  valueStyle={{ color: '#10b981', fontWeight: 'bold' }}
                />
                <Progress
                  percent={Math.round((feeSummary.paidAmount / feeSummary.totalFees) * 100)}
                   
                  showInfo={false}
                  strokeColor="#10b981"
                  className="mt-2 modern-progress"
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="stat-card modern-card text-center">
                <Statistic
                  title="Pending"
                  value={feeSummary.pendingAmount}
                  prefix="₹"
                  valueStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="stat-card modern-card text-center">
                <Statistic
                  title="Overdue"
                  value={feeSummary.overdueAmount}
                  prefix="₹"
                  valueStyle={{ color: '#ef4444', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Payment Overview */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <DollarOutlined className="text-green-500" />
                    <span>Payment Progress</span>
                  </div>
                }
                className="modern-card h-full"
              >
                <div className="text-center mb-6">
                  <Progress
                    type="dashboard"
                    percent={Math.round((feeSummary.paidAmount / feeSummary.totalFees) * 100)}
                    size={200}
                    strokeColor={{
                      '0%': '#10b981',
                      '100%': '#059669',
                    }}
                    format={(percent) => (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-900">{percent}%</div>
                        <div className="text-sm text-slate-600">Completed</div>
                      </div>
                    )}
                  />
                </div>

                <Row gutter={[16, 16]} className="text-center">
                  <Col xs={24} sm={8}>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <CheckCircleOutlined className="text-2xl text-green-500 mb-2" />
                      <div className="text-lg font-bold text-green-700">₹{feeSummary.paidAmount.toLocaleString()}</div>
                      <Text className="text-green-600">Paid</Text>
                    </div>
                  </Col>
                  <Col xs={24} sm={8}>
                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <ClockCircleOutlined className="text-2xl text-yellow-500 mb-2" />
                      <div className="text-lg font-bold text-yellow-700">₹{feeSummary.pendingAmount.toLocaleString()}</div>
                      <Text className="text-yellow-600">Pending</Text>
                    </div>
                  </Col>
                  <Col xs={24} sm={8}>
                    <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                      <ExclamationCircleOutlined className="text-2xl text-red-500 mb-2" />
                      <div className="text-lg font-bold text-red-700">₹{feeSummary.overdueAmount.toLocaleString()}</div>
                      <Text className="text-red-600">Overdue</Text>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <ThunderboltOutlined className="text-purple-500" />
                    <span>Upcoming Payments</span>
                    <Badge count={upcomingPayments.length} color="purple" />
                  </div>
                }
                className="modern-card h-full"
              >
                <div className="space-y-3">
                  {upcomingPayments.slice(0, 3).map((payment, index) => (
                    <div key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <Text strong className="text-slate-900 text-sm">{payment.feeType}</Text>
                        <Tag color={getPriorityColor(payment.priority)}  >
                          {payment.priority.toUpperCase()}
                        </Tag>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-slate-900">₹{payment.amount.toLocaleString()}</div>
                        <div className="text-xs text-slate-600">
                          Due: {dayjs(payment.dueDate).format('MMM DD')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>

          {/* Recent Payments */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <HistoryOutlined className="text-blue-500" />
                <span>Recent Payments</span>
              </div>
            }
            className="modern-card"
          >
            <Timeline
              className="modern-timeline"
              items={paymentHistory.slice(0, 4).map((payment, index) => ({
                color: 'green',
                dot: <CheckCircleOutlined />,
                children: (
                  <div className="pb-3">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1">
                        <Text strong className="text-slate-900 block">{payment.description}</Text>
                        <Text className="text-xs text-slate-600">{payment.receiptNo} • {payment.mode}</Text>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">₹{payment.amount.toLocaleString()}</div>
                        <Text className="text-xs text-slate-500">{dayjs(payment.date).format('MMM DD, YYYY')}</Text>
                      </div>
                    </div>
                  </div>
                ),
              }))}
            />
          </Card>
        </div>
      ),
    },
    {
      key: 'current',
      label: (
        <div className="flex items-center gap-2">
          <DollarOutlined />
          <span>Current Fees</span>
          <Badge count={feeDetails.filter(f => f.status !== 'paid').length} color="blue" />
        </div>
      ),
      children: (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <Title level={4} className="!mb-1">Fee Management</Title>
              <Text className="text-slate-600">Manage your academic and other fees</Text>
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
                columns={feeColumns}
                dataSource={feeDetails}
                pagination={false}
                className="modern-table"
                rowKey="key"
                scroll={{ x: 1200 }}
              />
            </div>
          </Card>
        </div>
      ),
    },
    {
      key: 'history',
      label: (
        <div className="flex items-center gap-2">
          <HistoryOutlined />
          <span>Payment History</span>
          <Badge count={paymentHistory.length} color="green" />
        </div>
      ),
      children: (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <Title level={4} className="!mb-1">Payment History</Title>
              <Text className="text-slate-600">View all your payment transactions</Text>
            </div>
            <Space>
              <RangePicker />
              <Button icon={<DownloadOutlined />}>Export</Button>
            </Space>
          </div>

          <Card className="modern-card">
            <div className="overflow-x-auto">
              <Table
                columns={historyColumns}
                dataSource={paymentHistory}
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
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <Title level={1} className="!text-white !mb-2 !text-2xl sm:!text-3xl">
                Fee Management 💳
              </Title>
              <Paragraph className="!text-green-100 !mb-0 text-sm sm:text-base">
                Track and manage your academic fees and payments
              </Paragraph>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">���{(feeSummary.pendingAmount / 1000).toFixed(0)}K</div>
                <div className="text-xs text-green-200">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{Math.round((feeSummary.paidAmount / feeSummary.totalFees) * 100)}%</div>
                <div className="text-xs text-green-200">Completed</div>
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

        {/* Payment Modal */}
        <Modal
          title={
            <div className="flex items-center gap-2">
              <PayCircleOutlined className="text-green-500" />
              <span>Make Payment</span>
            </div>
          }
          open={isPaymentModalVisible}
          onCancel={() => setIsPaymentModalVisible(false)}
          footer={null}
          width={600}
          className="modern-modal"
        >
          <Form onFinish={handlePaymentSubmit} layout="vertical" className="modern-form">
            {selectedFee && (
              <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                <Descriptions column={1}  >
                  <Descriptions.Item label="Fee Type">
                    <Text strong>{selectedFee.feeType}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Total Amount">
                    ₹{selectedFee.amount.toLocaleString()}
                  </Descriptions.Item>
                  <Descriptions.Item label="Paid Amount">
                    ₹{selectedFee.paidAmount.toLocaleString()}
                  </Descriptions.Item>
                  <Descriptions.Item label="Remaining Amount">
                    <Text strong className="text-red-600">₹{selectedFee.remainingAmount.toLocaleString()}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Due Date">
                    <Text className={selectedFee.status === 'overdue' ? 'text-red-600' : ''}>
                      {selectedFee.dueDate}
                    </Text>
                  </Descriptions.Item>
                </Descriptions>
              </div>
            )}

            <Row gutter={[16, 0]}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="amount"
                  label="Payment Amount"
                  rules={[{ required: true, message: 'Please enter payment amount' }]}
                >
                  <Input prefix="₹" type="number" size="large" placeholder="Enter amount" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="paymentMode"
                  label="Payment Method"
                  rules={[{ required: true, message: 'Please select payment method' }]}
                >
                  <Select size="large" placeholder="Select payment method">
                    <Option value="online">
                      <div className="flex items-center gap-2">
                        <BankOutlined />
                        Online Banking
                      </div>
                    </Option>
                    <Option value="card">
                      <div className="flex items-center gap-2">
                        <CreditCardOutlined />
                        Credit/Debit Card
                      </div>
                    </Option>
                    <Option value="upi">
                      <div className="flex items-center gap-2">
                        <WalletOutlined />
                        UPI Payment
                      </div>
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="remarks" label="Remarks (Optional)">
              <Input.TextArea size="large" rows={3} placeholder="Add any remarks..." />
            </Form.Item>

            <Divider />

            <Form.Item className="mb-0">
              <div className="flex justify-end gap-3">
                <Button size="large" onClick={() => setIsPaymentModalVisible(false)}>
                  Cancel
                </Button>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  size="large"
                  icon={<PayCircleOutlined />}
                  className="modern-btn modern-btn-primary"
                >
                  Pay Now
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </MainLayout>
  );
}