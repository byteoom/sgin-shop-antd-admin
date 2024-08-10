import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import PersonalCenter from './PersonalCenter';
import BasicSettings from './BasicSettings';
import SecuritySettings from './SecuritySettings';

const { Sider, Content } = Layout;

const PersonalSettings = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');

  const handleMenuClick = (e) => {
    setSelectedMenuItem(e.key);
  };

  return (
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          selectedKeys={[selectedMenuItem]}
          style={{ height: '100%', borderRight: 0 }}
          onClick={handleMenuClick}
        >
          <Menu.Item key="1">个人信息</Menu.Item>
          <Menu.Item key="2">基本设置</Menu.Item>
          <Menu.Item key="3">安全设置</Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {selectedMenuItem === '1' && <PersonalCenter />}
          {selectedMenuItem === '2' && <BasicSettings />}
          {selectedMenuItem === '3' && <SecuritySettings />}

        </Content>
      </Layout>
    </Layout>
  );
};

export default PersonalSettings;
