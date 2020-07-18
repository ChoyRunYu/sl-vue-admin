import request from '@/utils/request'
import baseUrl from '@/api/baseUrl'

export function getSystemInfo() {
  return request({
    url: baseUrl + 'admin/system/info',
    method: 'get'
  })
}

export function getSystemUsage() {
  return request({
    url: baseUrl + 'admin/system/usage',
    method: 'get'
  })
}

export function getDiskUsage() {
  return request({
    url: baseUrl + 'admin/system/disk',
    method: 'get'
  })
}
