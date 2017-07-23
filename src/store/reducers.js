import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'

// import global from './modules/global/globalReducer'
// import reply from './modules/reply/replyReducer'
// import topic from './modules/topic/topicReducer'
// import user from './modules/user/userReducer'

export default combineReducers({
    // global,
    // reply,
    // topic,
    // user,
  router: routeReducer,
})
