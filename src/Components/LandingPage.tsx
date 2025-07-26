import React from 'react';
import { Button, Layout, Typography, Space, Divider, Flex, Card, Row, Col } from 'antd';
import { RocketOutlined, SettingOutlined, DeploymentUnitOutlined, EyeOutlined, DatabaseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Header, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <>
    <Layout style={{ 
      minHeight: '100vh', 
      background: '#0F091A'
    }}>
      {/* Header */}
      <Header style={{
        background: '#0F091A',
        borderBottom: 'none',
        padding: '0 50px',
        height: '80px',
        position: 'fixed',
        width: '100%',
        zIndex: 1000,
        top: 0
      }}>
        <Flex align="center" justify="space-between" style={{ height: '100%' }}>
          {/* Logo and Brand */}
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
              fontSize: '20px', 
              fontWeight: '600',
              margin: 0
            }}>
              Enterprise Visualizer
            </Text>
          </Flex>

          {/* Navigation - Centered */}
          <Flex align="center" gap="large" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <Text 
              style={{ color: 'white', cursor: 'pointer', fontSize: '16px', transition: 'color 0.2s ease' }}
              onClick={() => scrollToSection('welcome')}
              onMouseEnter={(e) => e.currentTarget.style.color = '#90F'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
            >
              Welcome
            </Text>
            <Text 
              style={{ color: 'white', cursor: 'pointer', fontSize: '16px', transition: 'color 0.2s ease' }}
              onClick={() => scrollToSection('features')}
              onMouseEnter={(e) => e.currentTarget.style.color = '#90F'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
            >
              Features
            </Text>
            <Text 
              style={{ color: 'white', cursor: 'pointer', fontSize: '16px', transition: 'color 0.2s ease' }}
              onClick={() => scrollToSection('how-it-works')}
              onMouseEnter={(e) => e.currentTarget.style.color = '#90F'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
            >
              How It Works
            </Text>
          </Flex>

          {/* Login Button */}
          <Button 
            type="primary" 
            size="middle"
            onClick={handleLogin}
            style={{
              width: '131px',
              height: '30.721px',
              flexShrink: '0',
              borderRadius: '7px',
              background: '#90F',
              color: 'white',
              fontSize: '18px',
              fontWeight: '500',
              border: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#a020f0';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#90F';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Login
          </Button>
          
        </Flex>
      </Header>

      {/* Welcome Section - Fixed Height */}
      <Content 
        id="welcome"
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '0 50px',
          textAlign: 'center',
          height: '100vh',
          paddingTop: '80px'
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%', maxWidth: '800px' }}>
          {/* Subtitle */}
          <Text style={{ 
            color: 'rgba(255, 255, 255, 0.50)', 
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
            color: 'rgba(255, 255, 255, 0.50)',
            textAlign: 'center',
            fontSize: '16px',
            fontStyle: 'normal',
            lineHeight: 'normal',
            margin: 0,
            opacity: 0.9
          }}>
            Join the 20,000+ Users that use our software to make their Enterprise deployment, setup, and management easier. With our software, you can cut the ArcGIS enterprise deployment time in half. ArcGIS Enterprise Visualizer not only streamlines your process, but shows you your mistakes and how to fix them using our groundbreaking AI system.
          </Paragraph>

          {/* CTA Button */}
          <div style={{ marginTop: '32px' }}>
            <Button 
              type="primary" 
              size="large"
              onClick={handleGetStarted}
              style={{
                background: '#90F',
                borderColor: '#90F',
                borderRadius: '8px',
                height: '56px',
                padding: '0 48px',
                fontSize: '18px',
                fontWeight: '600',
                width: '367px',
                flexShrink: '0',
                border: 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#a020f0';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#90F';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Get Started
            </Button>
          </div>

          {/* Disclaimer */}
          <Text style={{ 
            color: 'rgba(255, 255, 255, 0.35)', 
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

    {/* Features Section - Fixed Height */}
    <Layout 
      id="features"
      style={{ 
        minHeight: '80vh',
        background: '#F5F5F5',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '100px',
        paddingBottom: '80px'
      }}
    >
      <Content style={{ padding: '0 50px', width: '100%' }}>
        <Flex vertical align="center" gap="large">
          {/* Section Title */}
          <Flex vertical align="center" gap="small">
            <Title level={2} style={{
              color: '#261744',
              fontSize: '36px',
              fontWeight: '700',
              margin: 0,
              textAlign: 'center'
            }}>
              Our Features
            </Title>
            <Divider style={{
              width: '60px',
              height: '2px',
              background: '#90F',
              margin: '0 auto 40px auto',
              border: 'none'
            }} />
          </Flex>

          {/* Section Description */}
          <Paragraph style={{
            color: '#261744',
            fontSize: '16px',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto 60px auto'
          }}>
            Discover powerful tools designed to streamline your ArcGIS Enterprise experience and boost productivity.
          </Paragraph>

          {/* Feature Cards Grid */}
          <div style={{ width: '100%', maxWidth: '1000px' }}>
            <Row gutter={[24, 24]} justify="center">
              {/* Server Maintenance Card */}
              <Col xs={24} lg={12}>
                <Card 
                  style={{
                    background: '#E8E8E8',
                    border: 'none',
                    borderRadius: '12px',
                    height: '160px',
                    padding: '0'
                  }}
                  bodyStyle={{ padding: '0', height: '100%' }}
                >
                  <Flex style={{ height: '100%' }}>
                    {/* Icon Section */}
                    <div style={{
                      width: '120px',
                      background: '#90F',
                      borderRadius: '12px 0 0 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <SettingOutlined style={{ color: 'white', fontSize: '32px' }} />
                    </div>
                    {/* Content Section */}
                    <div style={{ 
                      padding: '20px 24px',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}>
                      <Title level={4} style={{ 
                        color: '#333', 
                        margin: '0 0 8px 0', 
                        fontSize: '18px',
                        fontWeight: '600'
                      }}>
                        Server Maintenance
                      </Title>
                      <Paragraph style={{ 
                        color: '#666', 
                        margin: 0, 
                        fontSize: '14px',
                        lineHeight: '1.5'
                      }}>
                        Automated server monitoring and maintenance tools to keep your systems running smoothly.
                      </Paragraph>
                    </div>
                  </Flex>
                </Card>
              </Col>

              {/* Enterprise Deployment Card */}
              <Col xs={24} lg={12}>
                <Card 
                  style={{
                    background: '#E8E8E8',
                    border: 'none',
                    borderRadius: '12px',
                    height: '160px',
                    padding: '0'
                  }}
                  bodyStyle={{ padding: '0', height: '100%' }}
                >
                  <Flex style={{ height: '100%' }}>
                    {/* Icon Section */}
                    <div style={{
                      width: '120px',
                      background: '#90F',
                      borderRadius: '12px 0 0 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <DeploymentUnitOutlined style={{ color: 'white', fontSize: '32px' }} />
                    </div>
                    {/* Content Section */}
                    <div style={{ 
                      padding: '20px 24px',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}>
                      <Title level={4} style={{ 
                        color: '#333', 
                        margin: '0 0 8px 0', 
                        fontSize: '18px',
                        fontWeight: '600'
                      }}>
                        Enterprise Deployment
                      </Title>
                      <Paragraph style={{ 
                        color: '#666', 
                        margin: 0, 
                        fontSize: '14px',
                        lineHeight: '1.5'
                      }}>
                        Streamlined deployment process that cuts setup time in half with guided configurations.
                      </Paragraph>
                    </div>
                  </Flex>
                </Card>
              </Col>

              {/* Layout Visualizer Card */}
              <Col xs={24} lg={12}>
                <Card 
                  style={{
                    background: '#E8E8E8',
                    border: 'none',
                    borderRadius: '12px',
                    height: '160px',
                    padding: '0'
                  }}
                  bodyStyle={{ padding: '0', height: '100%' }}
                >
                  <Flex style={{ height: '100%' }}>
                    {/* Icon Section */}
                    <div style={{
                      width: '120px',
                      background: '#90F',
                      borderRadius: '12px 0 0 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <EyeOutlined style={{ color: 'white', fontSize: '32px' }} />
                    </div>
                    {/* Content Section */}
                    <div style={{ 
                      padding: '20px 24px',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}>
                      <Title level={4} style={{ 
                        color: '#333', 
                        margin: '0 0 8px 0', 
                        fontSize: '18px',
                        fontWeight: '600'
                      }}>
                        Layout Visualizer
                      </Title>
                      <Paragraph style={{ 
                        color: '#666', 
                        margin: 0, 
                        fontSize: '14px',
                        lineHeight: '1.5'
                      }}>
                        Visual representation of your Enterprise architecture with real-time status updates.
                      </Paragraph>
                    </div>
                  </Flex>
                </Card>
              </Col>

              {/* Storage Monitoring Card */}
              <Col xs={24} lg={12}>
                <Card 
                  style={{
                    background: '#E8E8E8',
                    border: 'none',
                    borderRadius: '12px',
                    height: '160px',
                    padding: '0'
                  }}
                  bodyStyle={{ padding: '0', height: '100%' }}
                >
                  <Flex style={{ height: '100%' }}>
                    {/* Icon Section */}
                    <div style={{
                      width: '120px',
                      background: '#90F',
                      borderRadius: '12px 0 0 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <DatabaseOutlined style={{ color: 'white', fontSize: '32px' }} />
                    </div>
                    {/* Content Section */}
                    <div style={{ 
                      padding: '20px 24px',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}>
                      <Title level={4} style={{ 
                        color: '#333', 
                        margin: '0 0 8px 0', 
                        fontSize: '18px',
                        fontWeight: '600'
                      }}>
                        Storage Monitoring
                      </Title>
                      <Paragraph style={{ 
                        color: '#666', 
                        margin: 0, 
                        fontSize: '14px',
                        lineHeight: '1.5'
                      }}>
                        Advanced analytics and monitoring for storage usage and performance optimization.
                      </Paragraph>
                    </div>
                  </Flex>
                </Card>
              </Col>
            </Row>
          </div>
        </Flex>
      </Content>
    </Layout>

    {/* How It Works Section - Fixed Height */}
    <Layout 
      id="how-it-works"
      style={{ 
        minHeight: '80vh',
        background: '#1A1A2E',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '100px',
        paddingBottom: '80px'
      }}
    >
      <Content style={{ padding: '0 50px', width: '100%' }}>
        <Flex vertical align="center" gap="large">
          {/* Section Title */}
          <Flex vertical align="center" gap="small">
            <Title level={2} style={{
              color: 'white',
              fontSize: '36px',
              fontWeight: '700',
              margin: 0,
              textAlign: 'center'
            }}>
              How It Works
            </Title>
            <Divider style={{
              width: '60px',
              height: '2px',
              background: '#90F',
              margin: '0 auto 40px auto',
              border: 'none'
            }} />
          </Flex>

          {/* Section Description */}
          <Paragraph style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '16px',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto 60px auto'
          }}>
            Simple steps to get your ArcGIS Enterprise up and running with our intelligent deployment system.
          </Paragraph>

          {/* Steps Grid */}
          <Row gutter={[32, 32]} justify="center" style={{ width: '100%', maxWidth: '1000px' }}>
            <Col xs={24} md={8}>
              <Flex vertical align="center" gap="middle" style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: '#90F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  1
                </div>
                <Title level={4} style={{ color: 'white', margin: 0 }}>
                  Connect Your Environment
                </Title>
                <Paragraph style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0, fontSize: '14px' }}>
                  Link your existing infrastructure and let our system analyze your current setup and requirements.
                </Paragraph>
              </Flex>
            </Col>

            <Col xs={24} md={8}>
              <Flex vertical align="center" gap="middle" style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: '#90F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  2
                </div>
                <Title level={4} style={{ color: 'white', margin: 0 }}>
                  AI-Powered Configuration
                </Title>
                <Paragraph style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0, fontSize: '14px' }}>
                  Our AI analyzes your setup and provides optimized configuration recommendations tailored to your needs.
                </Paragraph>
              </Flex>
            </Col>

            <Col xs={24} md={8}>
              <Flex vertical align="center" gap="middle" style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: '#90F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  3
                </div>
                <Title level={4} style={{ color: 'white', margin: 0 }}>
                  Deploy & Monitor
                </Title>
                <Paragraph style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0, fontSize: '14px' }}>
                  Deploy with confidence and monitor your Enterprise with real-time insights and automated maintenance.
                </Paragraph>
              </Flex>
            </Col>
          </Row>
        </Flex>
      </Content>
    </Layout>
    </>
  );
};

export default LandingPage; 