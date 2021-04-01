'use strict'

const axios = require('axios')
const { encode } = require('js-base64')

module.exports = class {
  constructor (username, password, environment) {
    this.client = axios.create({
      baseURL: environment === 'PRODUCTION' ? 'https://api.apaylater.com' : 'https://api.apaylater.net',
      headers: { Authorization: 'Basic ' + encode([username, password].join(':')) }
    })
  }

  /**
   * request by POST
   * @param {string} endpoint
   * @param {object} data
   * @param {function} cb
   */
  post (endpoint, data, cb) {
    this.client.post(endpoint, data).then((response) => {
      cb(null, response.data)
    }).catch((err) => {
      cb(err.response.data)
    })
  }

  /**
   * request by GET
   * @param {string} endpoint
   * @param {object} params
   * @param {function} cb
   */
  get (endpoint, params, cb) {
    this.client.get(endpoint, { params: params }).then((response) => {
      cb(null, response.data)
    }).catch((err) => {
      cb(err.response.data)
    })
  }
}
