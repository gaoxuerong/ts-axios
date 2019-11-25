import axios, { AxiosResponse, AxiosError } from '../src/index'
import { getAjaxRequest } from './helper'
describe('request', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })
  afterEach(() => {
    jasmine.Ajax.uninstall()
  })
})
