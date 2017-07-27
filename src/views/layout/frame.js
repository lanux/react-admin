/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Icon, Layout, Menu, Switch, Popover, Badge } from 'antd'
import classnames from 'classnames'
import NProgress from 'nprogress'
import ReactScrollbar from 'react-scrollbar'

import styles from '../../css/app.less'
import { arrayMenu, treeMenu, useArrayMenu } from '../../menu'
import { arrayToTree } from '../../utils'

import appAction from '../../redux/actions/app'

const { Header, Footer, Sider, Content } = Layout
const { SubMenu, MenuItemGroup } = Menu

let lastHref

const App = ({ children, location, app, dispatch, ...others }) => {
  const href = window.location.href

  if (lastHref !== href) {
    NProgress.start()
    !app.loading && NProgress.done()
    lastHref = href
  }

  const handleClickMenu = e => e.key === 'logout' && logout()
  const { siderFold, theme, siderVisible } = app
  const { changeTheme, toggleSider } = others

  const menuTree = useArrayMenu ? arrayToTree(arrayMenu) : treeMenu

  const getMenuItems = (_menuTree, _siderFold) => {
    return _menuTree.map(item => item.children ? (
      <SubMenu key={item.id} title={<span>{item.icon && <Icon type={item.icon} />}<span className={styles.subMenuTitle}>{item.name}</span></span>}>
        {getMenuItems(item.children, _siderFold)}
      </SubMenu>
    ) : (
      <Menu.Item key={item.id}>
        <Link to={item.router}>
          {item.icon && <Icon type={item.icon} />}
          <span className={styles.menuItemTitle}>{item.name}</span>
        </Link>
      </Menu.Item>
    ))
  }

  const menuContents = getMenuItems(menuTree, siderFold)

  return (
    <Layout className={classnames(styles.layout, { [styles.dark]: theme === 'dark' })}>
      {siderVisible ? <Sider className={classnames(styles.layoutsider)}
        collapsible
        width={224}
        trigger={null}
        breakpoint="md"
        collapsedWidth={48}
        collapsed={siderFold}
      >
        <div className={styles.logo}>
          <Icon type="github" className={styles.logoicon} />
          {!siderFold ? <span className={styles.logotitle}>react-admin</span> : ''}
        </div>
        {siderFold ? <Menu
          mode={siderFold ? 'vertical' : 'inline'}
          theme={theme}
          inlineIndent={16}
        >
          {menuContents}
        </Menu> :
        <ReactScrollbar speed={0.8}
          smoothScrolling
          horizontal={false}
          className={classnames(styles.scrollbar, siderFold ? styles.scrollbarfold : '')}
          contentClassName={styles.scrollbarcontent}
        >
          <Menu
            mode={siderFold ? 'vertical' : 'inline'}
            theme={theme}
            inlineIndent={16}
          >
            {menuContents}
          </Menu>
        </ReactScrollbar>
        }
        <div className={classnames(styles.switchtheme, siderFold ? styles.smallswitchtheme : '')}>
          {!siderFold ? <span><Icon type="bulb" />切换主题</span> : ''}
          <Switch size={siderFold ? 'small' : 'default'} onChange={changeTheme} checkedChildren="D" unCheckedChildren="L" />
        </div>
      </Sider>
          : ''}
      <Layout>
        <Header className={styles.header}>
          {!siderVisible ?
            <Popover placement="bottomLeft"
              // onVisibleChange={switchMenuPopover}
              // visible={menuPopoverVisible}
              overlayClassName={classnames(styles.popovermenu, { [styles.dark]: theme === 'dark' })}
              trigger="click"
              content={<Menu
                mode="inline"
                theme={theme}
                inlineIndent={16}
              >
                {menuContents}
              </Menu>}
            >
              <div className={styles.button}>
                <Icon type="bars" />
              </div>
            </Popover> :
            <div className={styles.button} onClick={toggleSider}>
              <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
            </div>
          }
          <div className={styles.rightWarpper}>
            <div className={styles.button}>
              <Badge dot>
                <Icon type="mail" />
              </Badge>
            </div>
            <Menu mode="horizontal" onClick={handleClickMenu} theme={theme}>
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
        <Footer style={{ textAlign: 'center', paddingBottom: 12 }}>
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

export default connect(({ app }) => ({ app }), appAction)(App)
