import React from 'react';
import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';
import { useRouter } from 'next/navigation';

const { Title } = Typography;

interface TopbarProps {
  title: string;
  showBack?: boolean;
  onRefresh?: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ 
  title, 
  showBack = true, 
  onRefresh 
}) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        {showBack && (
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
            type="text"
            style={{ color: '#245501' }}
          />
        )}
        <Title level={4} style={{ color: '#245501', margin: 0 }}>
          {title}
        </Title>
      </div>
      <Button
        icon={<ReloadOutlined />}
        onClick={handleRefresh}
        type="text"
        style={{ color: '#538D22' }}
      />
    </div>
  );
};

export default Topbar;
