import Cancel, { isCancel } from '../../src/cancel/Cancel'
describe('test cancel', () => {
  test('tobe truthy', () => {
    expect(isCancel(new Cancel())).toBeTruthy()
  })
  test('tobe truthy', () => {
    expect(isCancel(new Cancel('gggg'))).toBeTruthy()
  })
  test('tobe falsy', () => {
    expect(isCancel({ name: 'xuerong' })).toBeFalsy()
  })
  test('tobe correct result', () => {
    const cancelstring = new Cancel('message string')
    expect(cancelstring.message).toBe('message string')
  })
})
