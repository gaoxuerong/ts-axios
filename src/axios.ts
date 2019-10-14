import { AxiosInstance, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'
import defaults from './defaults'
function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  /**
   * 在 createInstance 工厂函数的内部，我们首先实例化了 Axios 实例 context，
   * 接着创建instance 指向 Axios.prototype.request 方法，并绑定了上下文 context；
   * 接着通过 extend 方法把 context 中的原型方法和实例方法全部拷贝到 instance 上，
   * 这样就实现了一个混合对象：instance 本身是一个函数，又拥有了 Axios 类的所有原型和实例属性，
   * 最终把这个 instance 返回。由于这里 TypeScript 不能正确推断 instance 的类型，
   * 我们把它断言成 AxiosInstance 类型。
   */
  /*
   * instance是一个函数，又拥有了axios的所有原型上的属性和实例方法；
   * 这样我们可以通过createInstance工厂函数创建axios，直接调用axios就相当于
   * 执行了Axios 类的 request方法发送的请求；当然我们还可以调用 axios.get、axios.post等方法
   */
  return instance as AxiosInstance
}

const axios = createInstance(defaults)

export default axios
