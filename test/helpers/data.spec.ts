import { transformResponse, transformRequest } from '../../src/helpers/data'
describe('helper:data', () => {
  describe('transformRequest', () => {
    test('should transform request data to string if data is a PlainObject', () => {
      const person = { name: 'xuerong' }
      expect(transformRequest(person)).toBe('{"name":"xuerong"}')
    })
    test('should do nothing if data is not a PlainObject', () => {
      const a = new URLSearchParams('a=b')
      expect(transformRequest(a)).toBe(a)
    })
  })
  describe('transformResponse', () => {
    test('should transform response data to Object if data is a JSON string', () => {
      const a = '{"name": "xuerong"}'
      expect(transformResponse(a)).toEqual({ name: 'xuerong' })
    })
    test('should do nothing if data is a string but not a JSON string', () => {
      const a = '{a: 2}'
      expect(transformResponse(a)).toBe('{a: 2}')
    })
    test('should do nothing if data is not a string', () => {
      const a = { a: 2 }
      expect(transformResponse(a)).toBe(a)
    })
  })
})
