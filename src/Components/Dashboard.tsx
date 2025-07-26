import React, { useState } from 'react';
import { 
  Layout, 
  Typography, 
  Flex, 
  Card, 
  Row, 
  Col, 
  Collapse, 
  Button, 
  Badge, 
  Switch, 
  Dropdown, 
  Avatar, 
  Progress,
  Table,
  Divider
} from 'antd';
import { 
  RocketOutlined, 
  BellOutlined, 
  UserOutlined, 
  SettingOutlined, 
  LogoutOutlined, 
  EyeOutlined,
  ExportOutlined,
  ExpandAltOutlined,
  BulbOutlined,
  KeyOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Text } = Typography;
const { Panel } = Collapse;

interface ComponentItem {
  id: string;
  name: string;
  status: 'running' | 'stopped';
  logs: string[];
}

const Dashboard: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Mock data for components
  const components: ComponentItem[] = [
    {
      id: '1',
      name: 'Portal',
      status: 'running',
      logs: [
        '[2024-01-15 10:30:12] Portal service started successfully',
        '[2024-01-15 10:30:15] Connection established to database',
        '[2024-01-15 10:30:18] Portal is ready to accept requests'
      ]
    },
    {
      id: '2',
      name: 'Server',
      status: 'running',
      logs: [
        '[2024-01-15 10:28:45] Server initialization complete',
        '[2024-01-15 10:28:50] Loading configuration files',
        '[2024-01-15 10:29:02] Server listening on port 6443'
      ]
    },
    {
      id: '3',
      name: 'Data Store',
      status: 'stopped',
      logs: [
        '[2024-01-15 10:25:32] Data Store service stopped',
        '[2024-01-15 10:25:33] Cleaning up temporary files',
        '[2024-01-15 10:25:35] Service shutdown complete'
      ]
    },
    {
      id: '4',
      name: 'Portal Web Adaptor',
      status: 'running',
      logs: [
        '[2024-01-15 10:31:20] Web Adaptor started',
        '[2024-01-15 10:31:25] Proxy configuration loaded',
        '[2024-01-15 10:31:30] Ready to serve requests'
      ]
    },
    {
      id: '5',
      name: 'Server Web Adaptor',
      status: 'running',
      logs: [
        '[2024-01-15 10:32:10] Server Web Adaptor online',
        '[2024-01-15 10:32:15] SSL certificates validated',
        '[2024-01-15 10:32:20] Service operational'
      ]
    }
  ];

  // Mock data for system logs
  const systemLogs = [
    { type: 'INFO', timestamp: '10:35:42', source: 'Portal', machine: 'AGS-01', user: 'admin', code: '200', message: 'User authentication successful' },
    { type: 'WARN', timestamp: '10:35:38', source: 'Server', machine: 'AGS-02', user: 'system', code: '404', message: 'Resource not found: /arcgis/rest/services/test' },
    { type: 'ERROR', timestamp: '10:35:35', source: 'DataStore', machine: 'AGS-03', user: 'dbuser', code: '500', message: 'Database connection timeout' },
    { type: 'INFO', timestamp: '10:35:30', source: 'Portal', machine: 'AGS-01', user: 'admin', code: '200', message: 'Service started successfully' },
    { type: 'DEBUG', timestamp: '10:35:25', source: 'Server', machine: 'AGS-02', user: 'system', code: '100', message: 'Processing request batch #1247' },
  ];

  // Mock data for licenses
  const licenseData = [
    { key: '1', product: 'ArcGIS Server', license: 'Standard', expiry: '2024-12-31', status: 'Active' },
    { key: '2', product: 'Portal for ArcGIS', license: 'Advanced', expiry: '2024-12-31', status: 'Active' },
    { key: '3', product: 'Data Store', license: 'Standard', expiry: '2024-12-31', status: 'Active' },
    { key: '4', product: 'Web Adaptor', license: 'Standard', expiry: '2024-06-15', status: 'Expiring' },
  ];

  const licenseColumns = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (text: string) => <Text style={{ color: '#ffffff', fontSize: '12px' }}>{text}</Text>,
    },
    {
      title: 'License',
      dataIndex: 'license',
      key: 'license',
      render: (text: string) => <Text style={{ color: '#90F', fontSize: '12px' }}>{text}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge 
          status={status === 'Active' ? 'success' : 'warning'} 
          text={<Text style={{ color: status === 'Active' ? '#52c41a' : '#faad14', fontSize: '12px' }}>{status}</Text>} 
        />
      ),
    },
  ];

  const profileMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
    },
  ];

  const getLogTypeColor = (type: string) => {
    switch (type) {
      case 'ERROR': return '#ff4d4f';
      case 'WARN': return '#faad14';
      case 'INFO': return '#52c41a';
      case 'DEBUG': return '#1890ff';
      default: return '#ffffff';
    }
  };

  const renderComponentAccordion = (component: ComponentItem) => (
    <Panel
      header={
        <Flex justify="space-between" align="center" style={{ width: '100%' }}>
          <Flex align="center" gap="small">
            <Text style={{ color: '#ffffff', fontWeight: '500' }}>{component.name}</Text>
          </Flex>
          <Flex align="center" gap="small">
            {component.status === 'running' ? (
              <Badge status="success" text={<Text style={{ color: '#52c41a' }}>Running</Text>} />
            ) : (
              <Badge status="error" text={<Text style={{ color: '#ff4d4f' }}>Stopped</Text>} />
            )}
            <Button 
              type="text" 
              size="small" 
              icon={<ExportOutlined />}
              style={{ color: '#90F' }}
              onClick={(e) => {
                e.stopPropagation();
                // Handle redirect to component page
                console.log(`Redirect to ${component.name} page`);
              }}
            />
          </Flex>
        </Flex>
      }
      key={component.id}
      style={{ 
        background: '#2A1B3D',
        border: '1px solid #4A2E5C',
        marginBottom: '8px'
      }}
    >
      <div style={{ background: '#1A1A2E', padding: '12px', borderRadius: '6px' }}>
        <Text style={{ color: '#ffffff', fontFamily: 'monospace', fontSize: '12px' }}>
          {component.logs.map((log, index) => (
            <div key={index} style={{ marginBottom: '4px' }}>
              {log}
            </div>
          ))}
        </Text>
      </div>
    </Panel>
  );

  return (
    <Layout style={{ minHeight: '100vh', background: '#0F091A' }}>
      {/* Header */}
      <Header style={{
        background: '#0F091A',
        borderBottom: '1px solid #2A1B3D',
        padding: '0 24px',
        height: '64px'
      }}>
        <Flex align="center" justify="space-between" style={{ height: '100%' }}>
          {/* Logo and Brand */}
          <Flex align="center" gap="medium">
            <Flex align="center" gap="small">
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#90F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <RocketOutlined style={{ color: 'white', fontSize: '16px' }} />
              </div>
              <Text style={{ 
                color: 'white', 
                fontSize: '18px', 
                fontWeight: '600',
                margin: 0
              }}>
                Enterprise Visualizer
              </Text>
            </Flex>
            <Divider type="vertical" style={{ borderColor: '#4A2E5C', height: '24px' }} />
            <Text style={{ color: '#90F', fontSize: '16px', fontWeight: '500' }}>
              Dashboard
            </Text>
          </Flex>

          {/* Center - Visualizer Button */}
          <Button 
            type="primary"
            icon={<EyeOutlined />}
            style={{
              background: '#90F',
              borderColor: '#90F',
              borderRadius: '6px',
              fontWeight: '500'
            }}
          >
            Visualizer
          </Button>

          {/* Right - Controls */}
          <Flex align="center" gap="medium">
            {/* Theme Toggle */}
            <Flex align="center" gap="small">
              <BulbOutlined style={{ color: isDarkMode ? '#666' : '#90F' }} />
              <Switch 
                checked={isDarkMode}
                onChange={setIsDarkMode}
                size="small"
                style={{
                  backgroundColor: isDarkMode ? '#90F' : '#d9d9d9'
                }}
              />
            </Flex>

            {/* Notifications */}
            <Badge count={3} size="small">
              <Button 
                type="text" 
                shape="circle" 
                icon={<BellOutlined />}
                style={{ color: '#ffffff' }}
              />
            </Badge>

            {/* Profile Dropdown */}
            <Dropdown 
              menu={{ items: profileMenuItems }}
              placement="bottomRight"
              trigger={['click']}
            >
              <Button type="text" shape="circle">
                <Avatar 
                  size="small" 
                  style={{ backgroundColor: '#90F' }}
                  icon={<UserOutlined />}
                />
              </Button>
            </Dropdown>
          </Flex>
        </Flex>
      </Header>

      {/* Main Content */}
      <Content style={{ padding: '24px' }}>
        <Row gutter={[16, 16]} style={{ height: 'calc(100vh - 112px)' }}>
          {/* Top Row - Increased height */}
          <Col span={24}>
            <Row gutter={[16, 0]} style={{ height: '65%' }}>
              {/* Components Section - 45% - Fixed height with scrolling */}
              <Col span={11}>
                <Card 
                  title={<Text style={{ color: '#ffffff', fontSize: '18px', fontWeight: '600' }}>Components</Text>}
                  style={{ 
                    background: '#1A1A2E', 
                    border: '1px solid #2A1B3D',
                    height: '100%'
                  }}
                  bodyStyle={{ 
                    padding: '0',
                    height: 'calc(100% - 57px)',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ 
                    height: '100%',
                    overflow: 'auto',
                    padding: '16px',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      right: '16px',
                      bottom: '16px',
                      overflow: 'auto'
                    }}>
                      <Collapse 
                        ghost
                        expandIcon={({ isActive }) => 
                          <ExpandAltOutlined 
                            rotate={isActive ? 90 : 0} 
                            style={{ color: '#90F' }}
                          />
                        }
                      >
                        {components.map(renderComponentAccordion)}
                      </Collapse>
                    </div>
                  </div>
                </Card>
              </Col>

              {/* Right Column - 55% - Split between System Usage and Licenses */}
              <Col span={13}>
                <Flex vertical gap="middle" style={{ height: '100%' }}>
                  {/* System Usage Section - 60% of right column height */}
                  <Card 
                    title={<Text style={{ color: '#ffffff', fontSize: '18px', fontWeight: '600' }}>System Usage</Text>}
                    style={{ 
                      background: '#1A1A2E', 
                      border: '1px solid #2A1B3D',
                      // height: '60%'
                    }}
                    bodyStyle={{ padding: '16px', height: 'calc(100% - 57px)' }}
                  >
                    <Row gutter={[10, 0]} style={{ height: '100%' }}>
                      <Col span={12}>
                        <Card 
                          title={<Text style={{ color: '#ffffff', fontSize: '14px' }}>System Memory</Text>}
                          style={{ 
                            background: '#2A1B3D', 
                            border: 'none',
                            // height: '100%'
                          }}
                          bodyStyle={{ 
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <Progress
                            type="circle"
                            percent={75}
                            size={100}
                            strokeColor="#90F"
                            trailColor="#4A2E5C"
                            format={() => (
                              <div style={{ textAlign: 'center' }}>
                                <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: 'bold' }}>
                                  5.2GB
                                </div>
                                <div style={{ color: '#ffffff', fontSize: '10px' }}>
                                  Used
                                </div>
                              </div>
                            )}
                          />
                        </Card>
                      </Col>
                      <Col span={12}>
                        <Card 
                          title={<Text style={{ color: '#ffffff', fontSize: '14px' }}>System Disk</Text>}
                          style={{ 
                            background: '#2A1B3D', 
                            border: 'none',
                            // height: '100%'
                          }}
                          bodyStyle={{ 
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <Progress
                            type="circle"
                            percent={45}
                            size={100}
                            strokeColor="#90F"
                            trailColor="#4A2E5C"
                            format={() => (
                              <div style={{ textAlign: 'center' }}>
                                <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: 'bold' }}>
                                  90MB
                                </div>
                                <div style={{ color: '#ffffff', fontSize: '10px' }}>
                                  Used
                                </div>
                              </div>
                            )}
                          />
                        </Card>
                      </Col>
                    </Row>
                  </Card>

                  {/* Licenses Section - 35% of right column height */}
                  <Card 
                    title={
                      <Flex align="center" gap="small">
                        <KeyOutlined style={{ color: '#90F' }} />
                        <Text style={{ color: '#ffffff', fontSize: '18px', fontWeight: '600' }}>Licenses</Text>
                      </Flex>
                    }
                    style={{ 
                      background: '#1A1A2E', 
                      border: '1px solid #2A1B3D',
                      height: '100%'
                    }}
                    bodyStyle={{ 
                      padding: '16px',
                      height: 'calc(100% - 57px)',
                      overflow: 'auto'
                    }}
                  >
                    <Table
                      dataSource={licenseData}
                      columns={licenseColumns}
                      pagination={false}
                      size="small"
                      style={{
                        background: 'transparent'
                      }}
                      className="custom-dark-table"
                    />
                  </Card>
                </Flex>
              </Col>
            </Row>
          </Col>

          {/* Bottom Row - Reduced height */}
          <Col span={24}>
            <Row gutter={[16, 0]} style={{ height: '31%' }}>
              {/* Empty Section - 45% */}
              <Col span={11}>
                <Card 
                  style={{ 
                    background: '#1A1A2E', 
                    border: '1px solid #2A1B3D',
                    height: '100%'
                  }}
                  bodyStyle={{ 
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{ color: '#666', fontSize: '24px' }}>?</Text>
                </Card>
              </Col>

              {/* Log Messages Section - 55% */}
              <Col span={13}>
                <Card 
                  title={
                    <Flex justify="space-between" align="center">
                      <Text style={{ color: '#ffffff', fontSize: '18px', fontWeight: '600' }}>
                        Log Messages
                      </Text>
                      <Button 
                        type="text" 
                        size="small"
                        style={{ color: '#90F' }}
                      >
                        See All
                      </Button>
                    </Flex>
                  }
                  style={{ 
                    background: '#1A1A2E', 
                    border: '1px solid #2A1B3D',
                    height: '100%'
                  }}
                  bodyStyle={{ 
                    padding: '0',
                    height: 'calc(100% - 57px)',
                    background: '#0F0F23',
                    fontFamily: 'monospace'
                  }}
                >
                  <div style={{ 
                    height: '100%', 
                    overflow: 'auto',
                    padding: '12px'
                  }}>
                    {/* Terminal Header */}
                    <div style={{ 
                      borderBottom: '1px solid #2A1B3D',
                      paddingBottom: '8px',
                      marginBottom: '8px'
                    }}>
                      <Text style={{ 
                        color: '#666', 
                        fontSize: '11px',
                        fontFamily: 'monospace'
                      }}>
                        TYPE  TIMESTAMP  SOURCE    MACHINE  USER    CODE  MESSAGE
                      </Text>
                    </div>
                    
                    {/* Log Entries */}
                    {systemLogs.map((log, index) => (
                      <div 
                        key={index}
                        style={{ 
                          marginBottom: '4px',
                          fontSize: '11px',
                          fontFamily: 'monospace'
                        }}
                      >
                        <Text style={{ color: getLogTypeColor(log.type), width: '60px', display: 'inline-block' }}>
                          {log.type}
                        </Text>
                        <Text style={{ color: '#888', width: '80px', display: 'inline-block' }}>
                          {log.timestamp}
                        </Text>
                        <Text style={{ color: '#90F', width: '80px', display: 'inline-block' }}>
                          {log.source}
                        </Text>
                        <Text style={{ color: '#ccc', width: '70px', display: 'inline-block' }}>
                          {log.machine}
                        </Text>
                        <Text style={{ color: '#888', width: '60px', display: 'inline-block' }}>
                          {log.user}
                        </Text>
                        <Text style={{ color: '#666', width: '50px', display: 'inline-block' }}>
                          {log.code}
                        </Text>
                        <Text style={{ color: '#ffffff' }}>
                          {log.message}
                        </Text>
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>

      {/* Custom styles for dark table */}
      <style>
        {`
          .custom-dark-table .ant-table {
            background: transparent !important;
          }
          .custom-dark-table .ant-table-thead > tr > th {
            background: #2A1B3D !important;
            color: #ffffff !important;
            border-bottom: 1px solid #4A2E5C !important;
            font-size: 12px !important;
          }
          .custom-dark-table .ant-table-tbody > tr > td {
            background: transparent !important;
            border-bottom: 1px solid #2A1B3D !important;
          }
          .custom-dark-table .ant-table-tbody > tr:hover > td {
            background: #2A1B3D !important;
          }
        `}
      </style>
    </Layout>
  );
};

export default Dashboard; 