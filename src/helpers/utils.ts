const toString = Object.prototype.toString

export function isObject(val: any): val is Date {
  return val !== null && typeof val === 'object'
}
export function isDate(val: any): val is Object {
  return toString.call(val) === '[object Date]'
  // Object.prototype.toString.call()用来判断对象类型的，可以查看MDN上 Object.prototype.toString()
}
