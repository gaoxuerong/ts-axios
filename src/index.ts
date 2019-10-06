import { AxiosRequestConfig } from './types/index'
import xhr from './xhr'
import { buildUrl } from './helpers/url'
import { transformRequest } from "./helpers/data";
function axios(config: AxiosRequestConfig): void  {
  processConfig(config)
  xhr(config)
}
// 处理xhr的url
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transformRequestData(config)
}
// 对于get请求
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url,params)
}
// 对于post请求
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}
export default axios
