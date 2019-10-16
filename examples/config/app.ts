import axios, { AxiosTransformer } from '../../src/index'
import qs from 'qs'

// tslint:disable-next-line: no-floating-promises
// 合并配置的demo

// axios.defaults.headers.common['test2'] = 123
// axios({
//   url: '/config/post',
//   method: 'post',
//   data: qs.stringify({
//     a: 1
//   }),
//   headers: {
//     test: '321'
//   }
// }).then((res) => {
//   console.log(res.data)
// })

// 请求和响应配置化的demo
// tslint:disable-next-line: no-floating-promises
axios({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = 3
    }
    return data
  }],
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => {
    console.log(res.data)
  })
