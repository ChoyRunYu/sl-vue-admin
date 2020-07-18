const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  nickname: state => state.user.nickname,
  role: state => state.user.role,
  addRoutes: state => state.user.addRoutes,
  routers: state => state.user.routers
}
export default getters
