import request from '@/utils/request'
import baseUrl from '@/api/baseUrl'

// 获取网站配置属性信息api
export function getWebsetInfo() {
  return request({
    url: baseUrl + 'admin/info',
    method: 'get'
  })
}

// 修改网站配置信息中的主页关于我们版块api
export function updateAboutusInfo(data) {
  return request({
    url: baseUrl + 'admin/info/aboutus',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 修改网站配置信息中页脚信息api
export function updateFooterInfo(data) {
  return request({
    url: baseUrl + 'admin/info/footer',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
