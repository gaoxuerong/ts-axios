import { isAbsoluteURL, combineURL, isURLSameOrigin } from '../../src/helpers/url'
describe('helpers:url', () => {
  describe('isURLSameOrigin', () => {
    test('should detect same origin', () => {
      expect(isURLSameOrigin(window.location.href)).toBeTruthy()
    })
    test('should detect different origin', () => {
      expect(isURLSameOrigin('https://github.com/axios/axios')).toBeFalsy()
    })
  })
})
