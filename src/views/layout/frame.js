import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Icon, Layout, Menu, Switch, Popover, Badge, Breadcrumb } from 'antd'
import classnames from 'classnames'
import NProgress from 'nprogress'
import ReactScrollbar from 'react-scrollbar'
import pathToRegexp from 'path-to-regexp'
import config from '../../utils/config'


import styles from '../../css/app.less'
import { arrayMenu, treeMenu, useArrayMenu } from '../../menu'
import { arrayToTree, queryArray } from '../../utils'

import appAction from '../../redux/actions/app'

const { Header, Footer, Sider, Content } = Layout
const { SubMenu } = Menu

let lastHref
const menuTree = useArrayMenu ? arrayToTree(arrayMenu) : treeMenu
const getMenuItems = (_menuTree, _siderFold) => {
  return _menuTree.map((item) => {
    if (item.children) {
      return (<SubMenu key={item.id} title={<span>{item.icon && <Icon type={item.icon} />}<span className={styles.subMenuTitle}>{item.name}</span></span>}>
        {getMenuItems(item.children, _siderFold)}
      </SubMenu>
      )
    }
    return (<Menu.Item key={item.id}>
      <Link to={item.router}>
        {item.icon && <Icon type={item.icon} />}
        <span className={styles.menuItemTitle}>{item.name}</span>
      </Link>
    </Menu.Item>)
  })
}

const getPathArray = (array, current, pid, id) => {
  let defaultSelectedKeys = [String(current[id])]
  const currentMenuArray = [current]
  const getPath = (item) => {
    if (item && item[pid]) {
      defaultSelectedKeys.unshift(String(item[pid])) // 数组前端插入
      let parentItem = queryArray(array, item[pid], id)
      currentMenuArray.unshift(parentItem)
      getPath(parentItem)
    }
  }
  getPath(current)
  return { defaultSelectedKeys, currentMenuArray }
}

function getCurrentMenuItem (location) {
  let currentMenu
  for (let item of arrayMenu) {
    if (item.router && pathToRegexp(item.router).exec(location)) {
      currentMenu = item
      break
    }
  }
  if (currentMenu) {
    return getPathArray(arrayMenu, currentMenu, 'pid', 'id')
  }
  return {}
}


const App = ({ children, location, app, ...others }) => {
  const { siderFold, theme, siderVisible, news, user } = app
  const { changeTheme, toggleSider, loadUser, logout } = others

  if (config.top_target_pages && config.top_target_pages.indexOf(location.pathname) > -1) {
    return <div>{children}</div>
  }
  !user.username && loadUser()
  // 路由切换显示进度条
  const href = window.location.href
  if (lastHref !== href) {
    NProgress.start()
    !app.loading && NProgress.done()
    lastHref = href
  }

  const handleClickMenu = e => e.key === 'logout' && logout()


  const menuContents = getMenuItems(menuTree, siderFold)

  // 寻找选中路由

  const { defaultSelectedKeys, currentMenuArray } = getCurrentMenuItem(location.pathname)

  // 寻找选中路由
  const menuProps = {
    onClick: ({ keyPath }) => {
      keyPath.map(id => arrayMenu.find(item => `${item.id}` === id))
    },
    theme,
    inlineIndent: 16,
    mode: 'inline',
    defaultSelectedKeys,
    defaultOpenKeys: !siderFold && defaultSelectedKeys ? defaultSelectedKeys : [],
  }

  // 递归查找父级
  const breads = currentMenuArray ? currentMenuArray.map((item, key) => {
    const content = (
      <span>{item.icon
        ? <Icon type={item.icon} style={{ marginRight: 4 }} />
        : ''}{item.name}</span>
    )
    return (
      <Breadcrumb.Item key={item.id}>
        {((currentMenuArray.length - 1) !== key && item.router)
          ? <Link to={item.router}>
            {content}
          </Link>
          : content}
      </Breadcrumb.Item>
    )
  }) : ''

  return (
    <Layout className={classnames(styles.layout, { [styles.dark]: theme === 'dark' })}>
      {siderVisible ? <Sider className={classnames(styles.layoutsider)} collapsible width={224} trigger={null} collapsedWidth={48} collapsed={siderFold}>
        <div className={styles.logo}>
          <Icon type="github" className={styles.logoicon} />
          {!siderFold ? <span className={styles.logotitle}>react-admin</span> : ''}
        </div>
        {siderFold ? <Menu {...menuProps} mode={'vertical'}>{menuContents}</Menu> :
        <ReactScrollbar speed={0.8} smoothScrolling horizontal={false} className={styles.scrollbar} contentClassName={styles.scrollbarcontent}>
          <Menu {...menuProps}>{menuContents}</Menu>
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
          {!siderVisible
            ?
              <Popover placement="bottomLeft"
                overlayClassName={classnames(styles.popovermenu, { [styles.dark]: theme === 'dark' })}
                trigger="click"
                content={<Menu {...menuProps}>{menuContents}</Menu>}
              >
                <div className={styles.button}>
                  <Icon type="bars" />
                </div>
              </Popover>
            :
              <div className={styles.button}>
                <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} onClick={toggleSider} />
              </div>
          }
          <div className={styles.rightWarpper}>
            <Popover placement="bottomRight" content={<div className={styles.newsPopover}>{news.map(item => <p key={item.id}>{item.content}</p>)}</div>} trigger="click">
              <div className={styles.button}>
                <Badge dot >
                  <Icon type="mail" />
                </Badge>
              </div>
            </Popover>
            <Menu mode="horizontal" onClick={handleClickMenu} theme={theme} style={{ zIndex: 'auto' }}>
              <SubMenu style={{ float: 'right' }}
                title={<span > <Icon type="user" /> username</span>}
              >
                <Menu.Item key="resetPwd">
                  修改密码
                </Menu.Item>
                <Menu.Item key="setting">
                  设置
                </Menu.Item>
                <Menu.Item key="logout">
                  退出
                </Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </Header>
        <ReactScrollbar speed={0.8}
          smoothScrolling
          horizontal={false}
          className={styles.layoutcontentscroll}
          contentClassName={styles.scrollbarcontent}
        >
          <div className={styles.layoutbread}>
            <Breadcrumb>
              {breads}
            </Breadcrumb>
          </div>
          <Content className={styles.layoutcontent}>{children}</Content>
          <Footer style={{ textAlign: 'center', paddingBottom: 12 }}>
            react-admin ©2017 Created by Lanux
          </Footer>
        </ReactScrollbar>
      </Layout>
    </Layout>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  app: PropTypes.object,
}

export default connect(({ app }) => ({ app }), appAction)(App)
