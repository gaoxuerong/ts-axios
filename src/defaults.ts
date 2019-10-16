import { AxiosRequestConfig } from './types/index'
import { processHeaders } from './helpers/headers'
import { transformRequest, transformResponse } from './helpers/data'
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
      Accept: 'application/json, text/plain, */*'
    }
  },
  // 把之前对请求数据和响应数据的处理逻辑，放到了默认配置中，也就是默认处理逻辑。
  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ]
}
const methodsNoData = ['delete', 'head', 'options', 'get']
methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']
methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
