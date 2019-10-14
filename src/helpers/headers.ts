import { isPlainObject } from '../helpers/utils'
import { Method } from '../types/index'
import { deepMerge } from './utils'
function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}
// 对post请求的header做处理，没有Content-Type的，默认值为application/json;charset=utf-8，
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
// 解析headers,request.getAllResponseHeaders()得到的headers是一堆字符串，用parseHeaders来解析它们
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}
// 使headers扁平化
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }
  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)
  const methodsToDelete = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'common']
  methodsToDelete.forEach(method => {
    delete headers[method]
  })
  return headers
}
