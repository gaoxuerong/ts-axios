import {
  isDate,
  isPlainObject,
  isFormData,
  isURLSearchParams,
  extend,
  deepMerge
} from '../../src/helpers/utils'
describe('helpers:utils', () => {
  describe('isXX', () => {
    // test('should validate Date, () => {
    //   expect(isDate(new Date())).toBeTruthy()
    //   expect(isDate(Date.now())).toBeFalsy()
    // })
    test('should validate PlainObject', () => {
      expect(isPlainObject({})).toBeTruthy()
      expect(isPlainObject(new Date())).toBeFalsy()
    })
  })
})
