import { AxiosRequestConfig } from './types/index';
/**
 * 我们希望ts-axios能有些默认的配置，用户传递的配置可以和默认配置做一层合并；
 * 其中对于 headers 的默认配置支持 common 和一些请求 method 字段；
 * common 表示对于任何类型的请求都要添加该属性，而 method 表示只有该类型请求方法才会添加对应的属性；
 */
const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
    }
  }
}
const methodsNoData = ['delete','head','options','get']
methodsNoData.forEach((method) =>{
  defaults.headers[method] = {}
})

const methodsWithData = ['delete','head','options','get']
methodsWithData.forEach((method) =>{
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
