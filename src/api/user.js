import request from '@/utils/request'
import baseUrl from '@/api/baseUrl'

export function login(data) {
  return request({
    url: baseUrl + 'admin/authorization',
    method: 'post',
    withCredentials: true,
    data
  })
}

export function getInfo() {
  return request({
    url: baseUrl + 'admin/user/info',
    method: 'get'
  })
}

export function checkOldPwd(data) {
  return request({
    url: baseUrl + 'admin/user/pwd',
    method: 'post',
    data
  })
}

export function updatePwd(data) {
  return request({
    url: baseUrl + 'admin/user/pwd',
    method: 'put',
    data
  })
}

export function getUserList(data) {
  return request({
    url: baseUrl + 'admin/user/page/' + data,
    method: 'get'
  })
}

export function setIsUse(data) {
  return request({
    url: baseUrl + 'admin/user/use',
    method: 'put',
    data: data
  })
}

export function delUser(data) {
  return request({
    url: baseUrl + 'admin/user/' + data,
    method: 'delete'
  })
}

export function updateUser(data, id) {
  return request({
    url: baseUrl + 'admin/user/' + id,
    method: 'put',
    data: data
  })
}

export function insertUser(data) {
  return request({
    url: baseUrl + 'admin/user',
    method: 'post',
    data: data
  })
}

export function resetUserPwd(data, id) {
  return request({
    url: baseUrl + 'admin/user/pwd/' + id,
    method: 'post',
    data: data
  })
}

export function delMoreUser(data) {
  return request({
    url: baseUrl + 'admin/user',
    method: 'delete',
    data: data
  })
}
// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
