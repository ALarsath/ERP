'use client';
import { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Typography, Divider, Badge, Button } from 'antd';
import {
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
  DollarOutlined,
  ProjectOutlined,
  CommentOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  SettingOutlined,
  TeamOutlined,
  FileTextOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Sider } = Layout;
const { Text, Title } = Typography;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      if (isMobileView) {
        setCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle layout class for collapsed state
  useEffect(() => {
    const layout = document.querySelector('.site-layout');
    if (layout) {
      layout.classList.toggle('collapsed', collapsed);
    }
  }, [collapsed]);

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Personal Info',
      children: [
        {
          key: 'profile-view',
          label: <Link href="/profile">View Profile</Link>,
        },
        {
          key: 'profile-edit',
          label: <Link href="/profile/edit">Edit Profile</Link>,
        },
      ],
    },
    {
      key: 'academics',
      icon: <BookOutlined />,
      label: 'Academics',
      children: [
        {
          key: 'courses',
          label: <Link href="/academics/courses">Courses</Link>,
        },
        {
          key: 'ranks',
          label: <Link href="/academics/ranks">Class Rankings</Link>,
        },
        {
          key: 'performance',
          label: <Link href="/academics/performance">Performance Analytics</Link>,
        },
      ],
    },
    {
      key: 'attendance',
      icon: <CalendarOutlined />,
      label: <Link href="/attendance">Attendance</Link>,
    },
    {
      key: 'fees',
      icon: <DollarOutlined />,
      label: <Link href="/fees">Fee Management</Link>,
    },
    {
      key: 'exams',
      icon: <FileTextOutlined />,
      label: 'Examinations',
      children: [
        {
          key: 'exam-schedule',
          label: <Link href="/exams/schedule">Exam Schedule</Link>,
        },
        {
          key: 'exam-results',
          label: <Link href="/exams/results">Results</Link>,
        },
      ],
    },
    {
      key: 'projects',
      icon: <ProjectOutlined />,
      label: <Link href="/projects">Projects</Link>,
    },
    {
      key: 'remarks',
      icon: <CommentOutlined />,
      label: <Link href="/remarks">Remarks</Link>,
    },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={200}
      className="bg-white border-r border-gray-200 shadow-sm fixed h-screen z-20"
      style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0 }}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Avatar size={32} icon={<UserOutlined />} />
            {!collapsed && <Text className="font-medium">Student Portal</Text>}
          </div>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center"
          />
        </div>

        <Menu
          mode="inline"
          selectedKeys={[pathname.split('/')[1] || 'dashboard']}
          items={menuItems}
          className="flex-1 border-none"
        />

        {!collapsed && (
          <div className="sticky bottom-0 p-4 bg-white border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Badge count={3}>
                <Button type="text" icon={<BellOutlined />} />
              </Badge>
              <Button type="text" icon={<SettingOutlined />} />
              <Button type="text" icon={<TeamOutlined />} />
            </div>
          </div>
        )}
      </div>
    </Sider>
  );
};

export default Sidebar;
