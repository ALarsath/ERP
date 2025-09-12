'use client';
import { Layout } from 'antd';
import Sidebar from './Sidebar';

const { Content } = Layout;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <Layout className=" min-h-screen">
      <Sidebar />
      <Layout className=" site-layout">
        <Content className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#e5f9cd] rounded-lg shadow-sm p-6 transition-all duration-200">
              {children}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
