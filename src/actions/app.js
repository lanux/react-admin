import { keyMirror } from '../utils'

const TYPES = keyMirror({
  GET_SITE_INFO: null,
  GET_SITE_STATS: null,
  GET_ALL_NODES: null,

  // 话题相关
  GET_TOPICS_LATEST: null,
  GET_TOPICS_HOT: null,
  GET_TOPIC_BY_ID: null,
  GET_TOPIC_BY_NODE: null,
  GET_TOPIC_BY_USER: null,

  GET_TOPIC_REPLIES: null,

  GET_USER_INFO: null,
})

export default { ...TYPES }

/**
 * 全局的一些数据
 */

// 获取v2ex网站基本信息
export function getSiteInfo () {
  return {
    type: TYPES.GET_SITE_INFO,
    payload: {
      promise: null,
    },
  }
}

// 获取网站状态
export function getSiteStats () {
  return {
    type: 'GET_SITE_STATS',
    payload: {
      promise: null,
    },
  }
}

export function getAllNodes () {
  return {
    type: 'GET_ALL_NODES',
    payload: {
      promise: null,
    },
  }
}
