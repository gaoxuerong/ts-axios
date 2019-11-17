import { transformRequest } from '../../src/helpers/data'
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
    // TODO
  })
})
