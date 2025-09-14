'use client';
import { useState, useEffect } from 'react';
import { Layout, Button, Breadcrumb } from 'antd';
import { MenuOutlined, HomeOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

const { Content, Header } = Layout;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);
      
      // Auto-collapse on mobile, auto-expand on desktop
      if (isMobileView) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate breadcrumb items
  const getBreadcrumbItems = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const items = [
      {
        title: (
          <span className="flex items-center gap-1">
            <HomeOutlined />
            Home
          </span>
        ),
      },
    ];

    pathSegments.forEach((segment, index) => {
      const title = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      items.push({
        title: <span>{title}</span>,
      });
    });

    return items;
  };

  return (
    <Layout className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar 
        collapsed={collapsed} 
        onCollapse={setCollapsed} 
        isMobile={isMobile} 
      />
      
      <Layout 
        className={`site-layout transition-all duration-300 ${
          !isMobile && !collapsed ? 'sidebar-open' : 
          !isMobile && collapsed ? 'sidebar-collapsed' : ''
        }`}
      >
        {/* Mobile Header */}
        {isMobile && (
          <Header className="bg-white shadow-sm border-b border-slate-200 px-4 h-16 flex items-center justify-between sticky top-0 z-40">
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setCollapsed(false)}
              className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              size="large"
            />
            
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900">CULTrix</span>
            </div>
          </Header>
        )}

        <Content className="flex flex-col min-h-screen">
          {/* Breadcrumb */}
          {!isMobile && (
            <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-3 sticky top-0 z-30">
              <Breadcrumb items={getBreadcrumbItems()} className="text-sm" />
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              <div className="animate-fade-in">
                {children}
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200 px-6 py-4 mt-auto">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-600">
                <div>
                  © 2024 CULTrix Student Portal. All rights reserved.
                </div>
                <div className="flex items-center gap-4">
                  <span>Version 2.0.0</span>
                  <span>•</span>
                  <span>Support: help@cultrix.edu</span>
                </div>
              </div>
            </div>
          </footer>
        </Content>
      </Layout>
    </Layout>
  );
}