'use client';
import { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Typography, Badge, Button, Tooltip } from 'antd';
import {
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
  DollarOutlined,
  ProjectOutlined,
  CommentOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  DashboardOutlined,
  FileTextOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const { Sider } = Layout;
const { Text } = Typography;

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  isMobile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse, isMobile }) => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
      key: 'personal-info',
      icon: <UserOutlined />,
      label: <Link href="/personal-info">Personal Info</Link>,
    },
    {
      key: 'academics',
      icon: <BookOutlined />,
      label: <Link href="/academics">Academics</Link>,
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
      key: 'examinations',
      icon: <FileTextOutlined />,
      label: <Link href="/examinations">Examinations</Link>,
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

  const handleMenuClick = () => {
    if (isMobile) {
      onCollapse(true);
    }
  };

  const handleLogout = () => {
    // Perform any necessary cleanup or API calls here
    // For example, clearing user data from localStorage or making a logout API call
    
    // Redirect to login page
    router.push('/login');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && !collapsed && (
        <div
          className="mobile-overlay animate-fade-in"
          onClick={() => onCollapse(true)}
        />
      )}
      
      <Sider
        className={`modern-sidebar ${
          isMobile
            ? `fixed left-0 h-full z-50 transition-transform duration-300 ${
                collapsed ? '-translate-x-full' : 'translate-x-0'
              }`
            : 'animate-slide-up'
        }`}
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={280}
        collapsedWidth={80}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: isMobile ? 'fixed' : 'sticky',
          top: 0,
          left: 0,
        }}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="sidebar-header">
            <div className="flex items-center justify-between">
              <div className={`sidebar-brand ${collapsed ? 'justify-center' : ''}`}>
                <Avatar 
                  size={collapsed ? 32 : 40} 
                  icon={<HomeOutlined />} 
                  className="bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg"
                />
                {!collapsed && (
                  <div className="animate-fade-in">
                    <Text className="text-white font-semibold text-lg">CULTrix</Text>
                    <br />
                    <Text className="text-blue-200 text-xs">Student Portal</Text>
                  </div>
                )}
              </div>
              
              {!isMobile && (
                <Tooltip title={collapsed ? 'Expand' : 'Collapse'} placement="right">
                  <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => onCollapse(!collapsed)}
                    className="sidebar-toggle"
                    size="small"
                  />
                </Tooltip>
              )}
            </div>
          </div>

          {/* Navigation Menu */}
          <Menu
            mode="inline"
            selectedKeys={[pathname.split('/')[1] || 'dashboard']}
            items={menuItems}
            className="modern-menu"
            onClick={handleMenuClick}
          />

          {/* Sidebar Footer */}
          <div className={`sidebar-footer ${collapsed ? 'px-2' : ''}`}>
            {!collapsed && (
              <div className="mb-3 animate-fade-in">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                  <Avatar size={36} icon={<UserOutlined />} className="bg-gradient-to-br from-green-400 to-blue-500" />
                  <div className="flex-1 min-w-0">
                    <Text className="text-white font-medium text-sm block truncate">Prassana Natarajan R</Text>
                    <Text className="text-blue-200 text-xs block truncate">Student ID: 2024001</Text>
                  </div>
                </div>
              </div>
            )}
            
            <div className={`sidebar-footer-actions ${collapsed ? 'flex-col gap-2' : ''}`}>
              <Tooltip title="Notifications" placement={collapsed ? 'right' : 'top'}>
                <Badge count={3} size="small">
                  <Button 
                    type="text" 
                    icon={<BellOutlined />} 
                    className="sidebar-footer-btn"
                  />
                </Badge>
              </Tooltip>
              
              <Tooltip title="Settings" placement={collapsed ? 'right' : 'top'}>
                <Button 
                  type="text" 
                  icon={<SettingOutlined />} 
                  className="sidebar-footer-btn"
                />
              </Tooltip>
              
              <Tooltip title="Logout" placement={collapsed ? 'right' : 'top'}>
                <Button 
                  type="text" 
                  icon={<LogoutOutlined />} 
                  className="sidebar-footer-btn text-red-300 hover:text-red-200"
                  onClick={handleLogout}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </Sider>
    </>
  );
};

export default Sidebar;