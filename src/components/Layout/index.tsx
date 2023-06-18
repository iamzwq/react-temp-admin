import React, { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { HomeFilled, ShoppingFilled, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Button, Layout, Menu, Row, Col, Typography } from 'antd'
import type { MenuProps } from 'antd'
import HeaderRight from '../HeaderRight'

const { Header, Sider, Content } = Layout

const items: MenuProps['items'] = [
  {
    label: 'home',
    path: '/home',
    icon: HomeFilled,
  },
  {
    label: 'about',
    path: '/about',
    icon: ShoppingFilled,
  },
  {
    label: 'hot news',
    path: '/hotnews',
    icon: ShoppingFilled,
  },
].map((nav) => ({
  key: nav.path,
  icon: React.createElement(nav.icon),
  label: nav.label,
}))

const BasicLayout = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [collapsed, setCollapsed] = useState(false)

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(0, 0, 0, 0.2)',
            zIndex: 200,
          }}
        />
        <Menu
          mode="inline"
          defaultSelectedKeys={[pathname]}
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout style={{ display: 'flex', flexDirection: 'column' }}>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Row justify="space-between" align="middle" style={{ paddingRight: '24px' }}>
            <Col>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            </Col>
            <Col>
              <Typography.Text strong style={{ fontSize: 18 }}>
                react-template-admin
              </Typography.Text>
            </Col>
            <Col style={{ display: 'flex' }}>
              <HeaderRight />
            </Col>
          </Row>
        </Header>
        <Content style={{ padding: '16px', flex: 1, overflowY: 'auto', background: '#fff' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
