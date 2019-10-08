import { AxiosRequestConfig,AxiosPromise,AxiosResponse } from '../types/index'
import xhr from './xhr'
import { buildUrl } from '../helpers/url'
import { transformRequest,transformResponse } from "../helpers/data"
import { processHeaders } from '../helpers/headers'
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise  {
  processConfig(config)
  return xhr(config).then((res) => {
    return transformResponseData(res)
  })
}
// 处理xhr的url
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}
// 对于get请求
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  // url!是类型断言，确保 url存在
  return buildUrl(url!,params)
}
// 对于post请求
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}
// 对于headers
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers,data)
}
// 对于post请求，我们传给它们data对象，返回的时候，JSON.stringify会做处理，变成字符串，现在再做处理，使返回的字符串变成对象
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
