import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Icon, Layout, Menu, Switch } from 'antd'
import '../css/app.less'
import action from '../actions/app'

const { Header, Footer, Sider, Content } = Layout
const { SubMenu, MenuItemGroup } = Menu

const App = ({ children, location, app, dispatch }) => {
  const handleClickMenu = e => e.key === 'logout' && logout()
  const siderFold = false
  const changeTheme = () => {
  }
  return (
    <Layout className="layout">
      <Sider className="layoutSider"
        collapsible
        width={224}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type)
        }}
      >
        <div className="logo" />
        <Menu
          mode={siderFold ? 'vertical' : 'inline'}
          theme={app.theme}
          defaultSelectedKeys={['4']}
        >
          <SubMenu key="sub1"
            title={<span><Icon type="mail" /><span className={siderFold ? '' : ''}>Navigation One</span></span>}
          >
            <MenuItemGroup title="Item 1">
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
            </MenuItemGroup>
            <MenuItemGroup title="Iteom 2">
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </MenuItemGroup>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" title={<span><icon type="setting" /><span>Navigation Three</span></span>}>
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </Menu>
        {!siderFold ? <div className="switchtheme">
          <span><Icon type="bulb" />Switch Theme</span>
          <Switch onChange={changeTheme} checkedChildren="Dark" unCheckedChildren="Light" />
        </div> : ''}
      </Sider>
      <Layout>
        <Header className="header">
          <div className="button">
            <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
          </div>
          <div className="rightWarpper">
            <div className="button">
              <Icon type="mail" />
            </div>
            <Menu mode="horizontal" onClick={handleClickMenu}>
              <SubMenu style={{ float: 'right' }}
                title={<span > <Icon type="user" /> username</span>}
              >
                <Menu.Item key="logout">
                  Sign out
                </Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </Header>
        <Content>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>
          react-admin ©2017 Created by Lanux
        </Footer>
      </Layout>
    </Layout>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  app: PropTypes.object,
  dispatch: PropTypes.function,
}

export default connect(({ app }) => ({ app }))(App)
