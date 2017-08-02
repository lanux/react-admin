
const useArrayMenu = true

const arrayMenu = [
  { id: 1, icon: 'laptop', name: '仪表盘', router: '/home' },
  { id: 101, name: '系统管理', icon: 'line-chart', router: '/sys' },
  { id: 102, pid: 101, name: '用户管理', icon: 'mail', router: '/sys/user' },
  { id: 103, pid: 101, name: '角色管理', icon: 'usergroup-add', router: '/sys/role' },
  { id: 104, pid: 101, name: '测试菜单', icon: 'area-chart' },
  { id: 1041, pid: 104, name: '测试菜单', icon: 'api', router: '/test/test' },
  { id: 1042, pid: 104, name: '测试菜单', icon: 'bar-chart', router: '/test/test' },
  { id: 1043, pid: 104, name: '测试菜单', icon: 'dot-chart', router: '/test/test' },
  { id: 106, pid: 101, name: '测试菜单', icon: 'heart-o', router: '/test/test' },
  { id: 201, name: '测试菜单', icon: 'video-camera' },
  { id: 202, pid: 201, name: '测试菜单', icon: 'bar-chart', router: '/test/test' },
  { id: 203, pid: 201, name: '测试菜单', icon: 'solution', router: '/test/test' },
  { id: 204, pid: 201, name: '测试菜单', icon: 'video-camera', router: '/test/test' },
  { id: 205, pid: 201, name: '测试菜单', icon: 'bulb', router: '/test/test' },
  { id: 301, name: '测试菜单', icon: 'database' },
  { id: 302, pid: 301, name: '测试菜单', icon: 'hdd', router: '/test/index' },
]

const treeMenu = [{ id: 1, icon: 'laptop', name: '仪表盘', router: '/dashboard' }, {
  id: 101,
  name: '测试菜单',
  icon: 'line-chart',
  children: [{ id: 102, pid: 101, name: '消息推送', icon: 'mail', router: '/test/test' }, {
    id: 103,
    pid: 101,
    name: '测试菜单',
    icon: 'usergroup-add',
    router: '/bi/active',
  }, {
    id: 104,
    pid: 101,
    name: '测试菜单',
    icon: 'area-chart',
    children: [{ id: 1041, pid: 104, name: '测试菜单', icon: 'api', router: '/test/test' }, {
      id: 1042,
      pid: 104,
      name: '测试菜单',
      icon: 'bar-chart',
      router: '/bi/adClick',
    }, { id: 1043, pid: 104, name: '测试菜单', icon: 'dot-chart', router: '/test/test' }],
  }, { id: 106, pid: 101, name: '测试菜单', icon: 'heart-o', router: '/test/test' }],
}, {
  id: 201,
  name: '测试菜单',
  icon: 'video-camera',
  children: [{ id: 202, pid: 201, name: '测试菜单', icon: 'bar-chart', router: '/test/test' }, {
    id: 203,
    pid: 201,
    name: '测试菜单',
    icon: 'solution',
    router: '/live/eachUser',
  }, { id: 204, pid: 201, name: '测试菜单', icon: 'video-camera', router: '/test/test' }, {
    id: 205,
    pid: 201,
    name: '测试菜单',
    icon: 'bulb',
    router: '/live/events',
  }],
}, {
  id: 301,
  name: '测试菜单',
  icon: 'database',
  children: [{ id: 302, pid: 301, name: '测试菜单', icon: 'hdd', router: '/test/index' }],
}]

module.exports = {
  arrayMenu,
  useArrayMenu,
  treeMenu,
}
