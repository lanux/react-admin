
export const useArrayMenu = true

export const arrayMenu = [
  { id: 1, icon: 'laptop', name: '仪表盘', router: '/home' },
  { id: 101, name: '系统管理', icon: 'line-chart', router: '/sys' },
  { id: 102, pid: 101, name: '用户管理', icon: 'mail', router: '/sys/user' },
  { id: 103, pid: 101, name: '活跃用户', icon: 'usergroup-add', router: '/bi/active' },
  { id: 104, pid: 101, name: '广告转化', icon: 'area-chart' },
  { id: 1041, pid: 104, name: '数据模型配置', icon: 'api', router: '/bi/adTemplate' },
  { id: 1042, pid: 104, name: '广告点击', icon: 'bar-chart', router: '/bi/adClick' },
  { id: 1043, pid: 104, name: '广告转化', icon: 'dot-chart', router: '/bi/adTake' },
  { id: 106, pid: 101, name: 'PV/UV', icon: 'heart-o', router: '/bi/pv' },
  { id: 201, name: '直播数据', icon: 'video-camera' },
  { id: 202, pid: 201, name: '直播数据', icon: 'bar-chart', router: '/live/realtime' },
  { id: 203, pid: 201, name: '用户数据', icon: 'solution', router: '/live/eachUser' },
  { id: 204, pid: 201, name: '观看时长统计', icon: 'video-camera', router: '/live/avgPeriod' },
  { id: 205, pid: 201, name: '事件统计', icon: 'bulb', router: '/live/events' },
  { id: 301, name: '缓存管理', icon: 'database' },
  { id: 302, pid: 301, name: 'REDIS', icon: 'hdd', router: '/redis/index' },
]

export const treeMenu = [{ id: 1, icon: 'laptop', name: '仪表盘', router: '/dashboard' }, {
  id: 101,
  name: '行为数据',
  icon: 'line-chart',
  children: [{ id: 102, pid: 101, name: '消息推送', icon: 'mail', router: '/bi/msgPush' }, {
    id: 103,
    pid: 101,
    name: '活跃用户',
    icon: 'usergroup-add',
    router: '/bi/active',
  }, {
    id: 104,
    pid: 101,
    name: '广告转化',
    icon: 'area-chart',
    children: [{ id: 1041, pid: 104, name: '数据模型配置', icon: 'api', router: '/bi/adTemplate' }, {
      id: 1042,
      pid: 104,
      name: '广告点击',
      icon: 'bar-chart',
      router: '/bi/adClick',
    }, { id: 1043, pid: 104, name: '广告转化', icon: 'dot-chart', router: '/bi/adTake' }],
  }, { id: 106, pid: 101, name: 'PV/UV', icon: 'heart-o', router: '/bi/pv' }],
}, {
  id: 201,
  name: '直播数据',
  icon: 'video-camera',
  children: [{ id: 202, pid: 201, name: '直播数据', icon: 'bar-chart', router: '/live/realtime' }, {
    id: 203,
    pid: 201,
    name: '用户数据',
    icon: 'solution',
    router: '/live/eachUser',
  }, { id: 204, pid: 201, name: '观看时长统计', icon: 'video-camera', router: '/live/avgPeriod' }, {
    id: 205,
    pid: 201,
    name: '事件统计',
    icon: 'bulb',
    router: '/live/events',
  }],
}, {
  id: 301,
  name: '缓存管理',
  icon: 'database',
  children: [{ id: 302, pid: 301, name: 'REDIS', icon: 'hdd', router: '/redis/index' }],
}]
