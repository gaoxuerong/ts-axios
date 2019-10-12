import { AxiosRequestConfig } from './../types/index';
const strats = Object.create(null)// 合并策略map
const stratKeysFromVal2=['url','params','data']
stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})
// 默认合并策略方法
function defaultStrat(val1:any,val2:any):any {
  return typeof val2 !== 'undefined' ? val2 : val1
}
// 合并策略方法---只取val2
function fromVal2Strat(val1:any,val2:any):any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}
export default function mergeConfig(config1: AxiosRequestConfig,config2?: AxiosRequestConfig):AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }
  const config = Object.create(null) // 定义返回的config
  for(let key in config2) {
    mergeField(key)
  }
  for(let key in config1) {
    if(!config2[key]) {
      mergeField(key)
    }
  }
  function mergeField(key: string):void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key],config2![key])
  }
  return config
}
