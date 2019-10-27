import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers = {},
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress
    } = config
    const request = new XMLHttpRequest()
    if (withCredentials) {
      request.withCredentials = true
    }
    if (timeout) {
      request.timeout = timeout
    }
    // 超时处理
    request.ontimeout = function handleTimeout() {
      reject(
        createError(`Timeout of ${config.timeout} ms exceeded`, config, 'ECONNABORTED', request)
      )
    }
    if (responseType) {
      request.responseType = responseType
    }
    // url!是类型断言，确保 url存在
    request.open(method.toUpperCase(), url!, true)
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) {
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }
    // 在200-300之间的http状态码看作是正常的，超出这个范围，也当作错误来处理
    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
    // netWork异常
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }
    if (onDownloadProgress) {
      request.onprogress = onDownloadProgress
    }
    if (onUploadProgress) {
      request.upload.onprogress = onUploadProgress
    }
    if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
      const xsrfValue = cookie.read(xsrfCookieName)
      if (xsrfValue) {
        headers[xsrfHeaderName!] = xsrfValue
      }
    }
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name] // 当我们传入的 data 为空的时候，请求 header 配置 Content-Type 是没有意义的，于是我们把它删除。
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    if (cancelToken) {
      // 取消功能的实现，第二种使用方式
      // tslint:disable-next-line: no-floating-promises
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }
    request.send(data)
  })
}
