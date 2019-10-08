const toString = Object.prototype.toString

export function isObject(val: any): val is Date {
  return val !== null && typeof val === 'object'
}
export function isDate(val: any): val is Object {
  return toString.call(val) === '[object Date]'
  // Object.prototype.toString.call()用来判断对象类型的，可以查看MDN上 Object.prototype.toString()
}
// 判断是不是普通对象
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
/* extend使用了交叉类型，并且用到了类型断言，extend 方法的实现用到了交叉类型，并且用到了类型断言。
* extend 的最终目的是把 from 里的属性都扩展到 to 中，包括原型上的属性
*/
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    (to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
