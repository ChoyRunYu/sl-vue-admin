import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, constantRoutes, asyncRoutesMap } from '@/router'
import md5 from 'md5'

function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

const getDefaultState = () => {
  return {
    token: getToken(),
    username: '',
    avatar: '',
    nickname: '',
    role: '',
    routers: '',
    addRoutes: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_ROUTERS: (state, routes) => {
    state.addRoutes = routes
    state.routers = constantRoutes.concat(routes)
  }
}

const actions = {
  // route 权限检测
  GenerateRoutes({ commit }, data) {
    return new Promise(resolve => {
      const { roles } = data
      const accessedRouters = asyncRoutesMap.filter(v => {
        if (roles.indexOf('admin') >= 0) return true
        if (hasPermission([roles], v)) {
          if (v.children && v.children.length > 0) {
            v.children = v.children.filter(child => {
              if (hasPermission([roles], child)) {
                return child
              }
              return false
            })
            return v
          } else {
            return v
          }
        }
        return false
      })
      commit('SET_ROUTERS', accessedRouters)
      // console.log(this.state.getters.routes)
      resolve()
    })
  },
  // user login
  login({ commit }, userInfo) {
    const { username, password, captcha } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: md5(password), captcha }).then(response => {
        const data = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { username, nickname, role } = data[0]
        commit('SET_USERNAME', username)
        commit('SET_NICKNAME', nickname)
        commit('SET_ROLE', role)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout().then(() => {
      //   removeToken() // must remove  token  first
      //   resetRouter()
      //   commit('RESET_STATE')
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
      removeToken()
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

