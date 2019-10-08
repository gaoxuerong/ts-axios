import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'

function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  /**
   * instance是一个函数，又拥有了axios的所有原型上的属性和实例方法；
   * 这样我们可以通过createInstance工厂函数创建axios，直接调用axios就相当于
   * 执行了Axios 类的 request方法发送的请求；当然我们还可以调用 axios.get、axios.post等方法
   */
  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
