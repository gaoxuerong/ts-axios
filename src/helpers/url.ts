import { isObject,isDate } from './utils'
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace('/%40/g', '@')
    .replace('/%3A/ig', ':')
    .replace('/%24/g', '$')
    .replace('/%2C/ig', ',')
    .replace('/%20/g', '+')
    .replace('/%5B/ig', '[')
    .replace('/%5D/ig', ']')
}
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
      } else if (isObject(value)) {
        value = JSON.stringify(value)
      }
      parts.push(`${encode(key)} = ${encode(value)}`)
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
