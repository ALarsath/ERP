import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Topbar from './TopBar';
import { usePathname } from 'next/navigation';

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  showBack?: boolean;
  onRefresh?: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  showBack = true,
  onRefresh,
}) => {
  const pathname = usePathname();
  const isDashboard = pathname === '/dashboard';
  const [collapsed, setCollapsed] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {isDashboard && <Sidebar 
        collapsed={collapsed}
        onCollapse={setCollapsed}
        isMobile={isMobile}
      />}
      <div className={`flex-1 overflow-auto p-6 ${!isDashboard ? 'w-full' : ''}`}>
        <Topbar 
          title={title}
          showBack={showBack}
          onRefresh={onRefresh}
        />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;