const initState = {
  list: [],
  pagination: {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `共${total}条`,
    current: 1,
    total: 0,
  },
  initLoaded: false,
  loading: false,
}

export default initState
