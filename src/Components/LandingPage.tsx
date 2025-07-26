import React from 'react';
import { Button, Layout, Typography, Space, Divider } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
const { Header, Content } = Layout;
const { Title, Paragraph, Text } = Typography;


const LandingPage: React.FC = () => {
  return (
    <Layout style={{ 
      minHeight: '100vh', 
      background: '#0F091A'
    }}>
      {/* Header */}
      <Header style={{
        background: 'transparent',
        borderBottom: 'none',
        padding: '0 50px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo and Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#8b5cf6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <RocketOutlined style={{ color: 'white', fontSize: '16px' }} />
          </div>
          <Text style={{ 
            color: 'white', 
            fontSize: '20px', 
            fontWeight: '600',
            margin: 0
          }}>
            Enterprise Visualizer
          </Text>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <Text style={{ color: 'white', cursor: 'pointer', fontSize: '16px' }}>
            Welcome
          </Text>
          <Text style={{ color: 'white', cursor: 'pointer', fontSize: '16px' }}>
            How It Works
          </Text>
          <Text style={{ color: 'white', cursor: 'pointer', fontSize: '16px' }}>
            Features
          </Text>
        </div>

        {/* Login Button */}
        <Button 
          type="primary" 
          size="middle"
          style={{
            width: '131px',
            height: '30.721px',
            flexShrink: '0',
            borderRadius: '7px',
            background: '#90F',
            color: 'white',
            fontSize: '18px',
            fontWeight: '500',
           
            }}
        >
          Login
        </Button>
      </Header>
      <Divider />

      {/* Main Content */}
      <Content style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '0 50px',
        textAlign: 'center',
        flex: 1
      }}>
        <Space direction="vertical" size="large" style={{ width: '100%', maxWidth: '800px' }}>
          {/* Subtitle */}
          <Text style={{ 
            color: 'white', 
            fontSize: '18px',
            opacity: 0.9
          }}>
            Now welcoming
          </Text>

          {/* Main Title */}
          <Title level={1} style={{
            color: 'white',
            fontSize: '48px',
            fontWeight: '700',
            margin: 0,
            lineHeight: '1.2'
          }}>
            A reimagined way of setting up ArcGIS Enterprise.
          </Title>

          {/* Description */}
          <Paragraph style={{
            color: 'white',
            fontSize: '18px',
            lineHeight: '1.6',
            margin: 0,
            opacity: 0.9
          }}>
            Join the <Text strong style={{ color: 'white' }}>20,000+ Users</Text> that use our software to make their Enterprise deployment, setup, and management easier. With our software, you can cut the ArcGIS enterprise deployment time in half. <Text strong style={{ color: 'white' }}>ArcGIS Enterprise Visualizer</Text> not only streamlines your process, but shows you your mistakes and how to fix them using our groundbreaking AI system.
          </Paragraph>

          {/* CTA Button */}
          <div style={{ marginTop: '32px' }}>
            <Button 
              type="primary" 
              size="large"
              style={{
                background: '#8b5cf6',
                borderColor: '#8b5cf6',
                borderRadius: '8px',
                height: '56px',
                padding: '0 48px',
                fontSize: '18px',
                fontWeight: '600'
              }}
            >
              Get Started
            </Button>
          </div>

          {/* Disclaimer */}
          <Text style={{ 
            color: 'white', 
            fontSize: '14px',
            opacity: 0.7,
            display: 'block',
            marginTop: '16px'
          }}>
            *ArcGIS Enterprise Account Required*
          </Text>
        </Space>
      </Content>
    </Layout>
  );
};

export default LandingPage; 