import request from '@/utils/request'
import baseUrl from '@/api/baseUrl'

export function getVisitInfo() {
  return request({
    url: baseUrl + 'admin/visit',
    method: 'get'
  })
}

export function getVisitByDay(days) {
  return request({
    url: baseUrl + 'admin/visit/' + days,
    method: 'get'
  })
}
