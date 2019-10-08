import { isPlainObject,isDate } from './utils'
function encode(val: string): string {
  return encodeURIComponent(val)
  .replace(/%40/g, '@')
  .replace(/%3A/gi, ':')
  .replace(/%24/g, '$')
  .replace(/%2C/gi, ',')
  .replace(/%20/g, '+')
  .replace(/%5B/gi, '[')
  .replace(/%5D/gi, ']')
}
// 上边的是用URL编码形式表示的 ASCII 字符
export function buildUrl(url: string, params?: any): string {
  if(!params) {
    return url
  }
  const parts: string[] = []
  Object.keys(params).forEach((key) => {
    const val = params[key]
    if(val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      key+='[]'
    } else {
      values = [val]
    }
    values.forEach((value) => {
      if (isDate(value)) {
        value = value.toISOString(value)
      } else if (isPlainObject(value)) {
        value = JSON.stringify(value)
      }
      parts.push(`${encode(key)}=${encode(value)}`)
    })
  })
  let serializeParams = parts.join('&')
  if (serializeParams) {
    const hashIndex = serializeParams.indexOf('#')
    if (hashIndex !== -1){
      url = url.slice(0,hashIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializeParams
  }
  return url
}