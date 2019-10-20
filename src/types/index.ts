export type Method =
  | 'get'
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
  | 'patch'
  | 'PATCH'
// 响应数据支持泛型；通常情况下，我们会把后端返回数据格式单独放入一个接口中；
// 定义Axios接口类型
// 添加范型参数<T>，T=any 表示泛型的类型参数默认值为 any
export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}
// 首先定义一个 Axios 类型接口，它描述了 Axios 类中的公共方法，接着定义了 AxiosInstance 接口继承 Axios，它就是一个混合类型的接口
export interface AxiosInstance extends Axios {
  interceptors: any
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  // 我们增加了一种函数的定义,它支持两个参数，url是必选，config是可选参数；
  // 使 axios 函数支持两个参数
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}
export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance
}
export interface AxiosRequestConfig {
  url?: string // 请求的url
  method?: Method // 请求方法
  params?: any // 请求参数
  headers?: any // 请求头内容
  data?: any // 请求传给服务端的数据
  responseType?: XMLHttpRequestResponseType // 对于一个 AJAX 请求的 response，可以指定它响应的数据类型，它的定义是 "" | "arraybuffer" | "blob" | "document" | "json" | "text" 字符串字面量类型
  timeout?: number // 设置某个请求的超时时间
  [propName: string]: any // 字符串索引签名，对应core文件夹下mergeConfig.ts文件下的mergeField函数， strat(config1[key],config2![key])中config1[key]的key不知道类型，所以用字符串索引签名
  transformRequest?: AxiosTransformer | AxiosTransformer[] // transformRequest允许你在将请求数据发送到服务器之前对其进行修改；这只适用于请求方法 put、post 和 patch
  transformResponse?: AxiosTransformer | AxiosTransformer[] // transformResponse 允许你在把响应数据传递给 then 或者 catch 之前对它们进行修改
  cancelToken?: CancelToken
}
// 实例类型的接口定义
export interface CancelToken {
  promise: Promise<String>
  reason?: string
}
// 取消方法的接口定义
export interface Canceler {
  (message?: string): void
}
// CancelExecutor 是 CancelToken 类构造函数参数的接口定义
export interface CancelExecutor {
  (cancel: Canceler): void
}
export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}
export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken
  source(): CancelTokenSource
}
export interface AxiosTransformer {
  (data: any, headers?: any): any
}
// 响应接口类型，
// 添加范型参数<T>，T=any 表示泛型的类型参数默认值为 any
export interface AxiosResponse<T = any> {
  data: T // 服务端返回的数据
  status: number // http状态码
  statusText: string // 状态消息
  headers: any // 响应头
  config: AxiosRequestConfig // 请求配置对象config
  request: any // 请求的 XMLHttpRequest 对象实例 request
}
// axios 返回的是 AxiosPromise 类型
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}
// axios的error,用于外部使用
export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}
// 拦截器泛型接口定义，因为对于 resolve 函数的参数，请求拦截器和响应拦截器是不同的
export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number
  eject(id: number): void
}
// resolve请求拦截器类型是AxiosRequestConfig，响应拦截器类型是AxiosResponse，所以用范型
export interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>
}
// reject函数参数类型是any
export interface RejectedFn {
  (error: any): any
}
