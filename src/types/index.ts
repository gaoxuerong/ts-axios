export type method =
  'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'options'
  | 'OPTIONS'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'put'
  | 'PUT'
export interface AxiosRequestConfig {
  url: string // 请求的url
  method?: method // 请求方法
  params?: any // 请求参数
  headers?: any // 请求头内容
  data?: any // 请求传给服务端的数据
  responseType?: XMLHttpRequestResponseType // 对于一个 AJAX 请求的 response，可以指定它响应的数据类型，它的定义是 "" | "arraybuffer" | "blob" | "document" | "json" | "text" 字符串字面量类型
}
// 响应接口类型
export interface AxiosResponse {
  data: any // 服务端返回的数据
  status: number // http状态码
  statusText: string // 状态消息
  headers: any // 响应头
  config: AxiosRequestConfig // 请求配置对象config
  request: any // 请求的 XMLHttpRequest 对象实例 request
}
// axios 返回的是 AxiosPromise 类型
export interface AxiosPromise extends Promise<AxiosResponse> {
}

