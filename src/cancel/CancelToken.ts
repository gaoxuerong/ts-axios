import { CancelExecutor, CancelTokenSource, Canceler } from '../types/index'
import Cancel from './Cancel' // Cancel不仅当作类型，还当作值来用
interface ResolvePromise {
  (reason?: Cancel): void
}
export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  constructor(executor: CancelExecutor) {
    /*
     * 在CancelToken构造函数内部实例化一个pending状态的promise对象，然后用resolvePromise变量指向resolve函数
     */
    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })
    /**
     * 执行executor函数，传入一个cancel函数，
     * 在cancel函数内部，会调用resolvePromise，把Promise对象的pending状态变为resolved
     */
    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }
  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }
  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}
