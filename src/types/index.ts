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
  url: string
  method?: method
  params?: any
  headers?: any
  data?: any
}
