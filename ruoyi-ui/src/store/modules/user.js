import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  actions: {
    // 登录
    async Login({ commit }, {username, password, code, uuid}) {
      username = username.trim()
      let result = await login(username, password, code, uuid)
      if(result.code === 200) {
        commit('SET_TOKEN', result.token)
        setToken(result.token)
        return '登录成功'
      }else {
        return Promise.reject(new Error('登录失败，请重试'))
      }
    },

    // 获取用户信息
    async GetInfo({ commit, state }) {
      const result = await getInfo()
      if(result.code == 200) {
          const user = result.user
          const avatar = user.avatar == "" ? require("@/assets/images/profile.jpg") : process.env.VUE_APP_BASE_API + user.avatar
          if (result.roles && result.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', result.roles)
            commit('SET_PERMISSIONS', result.permissions)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          commit('SET_NAME', user.userName)
          commit('SET_AVATAR', avatar)
          return "获取用户信息成功"
      }else {
        return Promise.reject(new Error('获取用户信息失败'))
      }
    },

    // 退出系统
    async LogOut({ commit, state }) {
      const result = await logout(state.token)
      if(result.code == 200) {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_PERMISSIONS', [])
        removeToken()
        return '退出登录成功'
      }else {
        return Promise.reject(new Error('退出登录失败'))
      }
    },

    // 前端 登出
    async FedLogOut({ commit }) {
      commit('SET_TOKEN', '')
      removeToken()
      return "前端登出成功"
    }
  }
}

export default user
