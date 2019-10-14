import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import xhr from './xhr'
import { buildUrl } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders, flattenHeaders } from '../helpers/headers'
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res) // 处理响应data
  })
}
// 处理xhr的url
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
  config.headers = flattenHeaders(config.headers, config.method!)
}
// 对于get请求
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  // url!是类型断言，确保 url存在
  return buildUrl(url!, params)
}
// 对于post请求,转换请求 body 的数据
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}
// 对于headers
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
// 在我们不去设置 responseType 的情况下，当服务端返回给我们的数据是字符串类型，我们可以尝试去把它转换成一个 JSON 对象
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
