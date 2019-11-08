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
  describe('isAbsoluteURL', () => {
    test('should return true if URL begins with valid scheme name', () => {
      expect(isAbsoluteURL('https://api.github.com/users')).toBeTruthy()
      expect(isAbsoluteURL('custom-scheme-v1.0://example.com/')).toBeTruthy()
      expect(isAbsoluteURL('HTTP://example.com/')).toBeTruthy()
    })
  })
})
