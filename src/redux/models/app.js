import { Record } from 'immutable'
/*
对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。
还有很多易用的数据类型。像 `Collection`、`List`、`Map`、`Set`、`Record`、`Seq`。有非常全面的`map`、`filter`、`groupBy`、`reduce``find`函数式操作方法。
*/
const initState = {
  siderVisible: true,
  siderFold: false,  // 是否折叠左边栏
  theme: localStorage.getItem('app_theme_name') || 'light', // 'light','dark'
  user: {},
  loading: false,
}

export default initState
